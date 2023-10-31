import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useFetchQuestById,
  useGetQuestPowerLockedStatus,
} from "@/hooks/useFetchQuests";
import { Placeholder } from "@/components/Placeholder";
import { Card } from "@/components/cards/Card";
import { Prisma, $Enums } from "@prisma/client";
import { useJubmojis } from "@/hooks/useJubmojis";
import {
  useGetTeamLeaderboard,
  useUpdateTeamLeaderboardMutation,
} from "@/hooks/useTeamLeaderboard";
import toast from "react-hot-toast";
import { TeamLeaderboard } from "@/components/ui/TeamLeaderboard";
import {
  cardPubKeys,
  getCardPubKeyFromIndex,
  getMembershipProofArgsFromJubmoji,
  getMerkleProofFromCache,
  getRandomNullifierRandomness,
} from "jubmoji-api";
import { addNullifiedSigs, loadNullifiedSigs } from "@/lib/localStorage";
import { useFetchCollectedCards } from "@/hooks/useFetchCards";
import { cn } from "@/lib/utils";
import {
  hexToBigInt,
  proveMembership,
  serializeMembershipProof,
} from "babyjubjub-ecdsa";
import { getClientPathToCircuits } from "@/lib/config";

const PagePlaceholder = () => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="py-3">
        <Placeholder.Base className="w-4 h-4" />
      </div>
      <Placeholder.Card size="md" />
      <Placeholder.Card size="xs" />
      <Placeholder.Card size="xl" />
      <Placeholder.Button />
    </div>
  );
};

export default function QuestDetailPage() {
  const router = useRouter();
  const { id: questId } = router.query;
  const { data: jubmojis } = useJubmojis();
  const { isLoading: isLoadingCollectedCards, data: collectedCards = [] } =
    useFetchCollectedCards();
  const { isLoading: isLoadingQuest, data: quest = null } = useFetchQuestById(
    questId as string
  );
  const { data: { locked: powerIsLocked } = { locked: true } } =
    useGetQuestPowerLockedStatus(quest?.id);
  const updateTeamLeaderboardMutation = useUpdateTeamLeaderboardMutation();
  const {
    isLoading: isLoadingLeaderboard,
    data: scoreMapping = {},
    refetch: refetchLeaderboard,
  } = useGetTeamLeaderboard(questId as string);
  const [numProofsCompleted, setNumProofsCompleted] = useState<number>();
  const [numProofsTotal, setNumProofsTotal] = useState<number>();

  useEffect(() => {
    // refetch the leaderboard when the mutation is successful
    if (updateTeamLeaderboardMutation.isSuccess) {
      refetchLeaderboard();
    }
  }, [refetchLeaderboard, updateTeamLeaderboardMutation.isSuccess]);

  const endDateLabel = quest?.endTime
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      }).format(new Date(quest.endTime))
    : undefined;

  const onSequentialUpdateTeamLeaderboardScore = async () => {
    if (!quest) return;

    // User has no Jubmojis at all
    if (!jubmojis || jubmojis.length === 0) {
      return toast.error(
        "Please collect some Jubmojis to participate in this leaderboard!"
      );
    }

    // Quest has ended
    const currentTime = new Date();
    if (quest.endTime && currentTime > new Date(quest.endTime)) {
      return toast.error("Quest has ended!");
    }

    const teamCardIndices = quest.prerequisiteCards.map((card) => card.index);
    const collectionCardIndices = quest.collectionCards.map(
      (card) => card.index
    );
    const collectionPubKeys = collectionCardIndices.map((index) =>
      getCardPubKeyFromIndex(index)
    );

    // User has no team card Jubmojis
    const teamJubmojis = jubmojis.filter((jubmoji) =>
      teamCardIndices.includes(jubmoji.pubKeyIndex)
    );
    if (teamJubmojis.length === 0) {
      return toast.error(
        "You must collect a team card Jubmoji to participate in this leaderboard!"
      );
    }

    // User has no unnullified collection card Jubmojis
    const { quests: questNullifiedSigMap } = await loadNullifiedSigs();
    const nullifiedSigs = questNullifiedSigMap[quest.id] || [];
    const unnullifiedCollectionJubmojis = jubmojis.filter(
      (jubmoji) =>
        collectionCardIndices.includes(jubmoji.pubKeyIndex) &&
        !nullifiedSigs.includes(jubmoji.sig)
    );
    if (unnullifiedCollectionJubmojis.length === 0) {
      return toast.error(
        "All of your Jubmojis have already been submitted to the leaderboard!"
      );
    }

    // Start proving
    setNumProofsCompleted(0);
    setNumProofsTotal(unnullifiedCollectionJubmojis.length + 1); // This includes the team proof

    // Prove each individual team and collection jubmoji sequentially
    try {
      const proofParams = quest.proofParams as Prisma.JsonObject;
      const sigNullifierRandomness =
        proofParams.sigNullifierRandomness as string;
      const pubKeyNullifierRandomness = hexToBigInt(
        getRandomNullifierRandomness()
      );
      const pathToCircuits = getClientPathToCircuits();

      // Team proof
      const teamJubmoji = teamJubmojis[0];
      const { sig, msgHash, pubKey, R, T, U } =
        getMembershipProofArgsFromJubmoji(teamJubmoji);
      const teamMerkleProof = await getMerkleProofFromCache([pubKey], 0);
      const teamMembershipProof = await proveMembership({
        sig,
        msgHash,
        publicInputs: {
          R,
          T,
          U,
        },
        merkleProof: teamMerkleProof,
        sigNullifierRandomness: hexToBigInt(sigNullifierRandomness),
        pubKeyNullifierRandomness,
        pathToCircuits,
      });
      setNumProofsCompleted((prev) => prev! + 1);

      // Collection proofs
      let collectionMembershipProofs = [];
      for (const jubmoji of unnullifiedCollectionJubmojis) {
        const { sig, msgHash, pubKey, R, T, U } =
          getMembershipProofArgsFromJubmoji(jubmoji);
        const collectionMerkleProof = await getMerkleProofFromCache(
          collectionPubKeys,
          collectionPubKeys.indexOf(pubKey)
        );
        const collectionMembershipProof = await proveMembership({
          sig,
          msgHash,
          publicInputs: {
            R,
            T,
            U,
          },
          merkleProof: collectionMerkleProof,
          sigNullifierRandomness: hexToBigInt(sigNullifierRandomness),
          pubKeyNullifierRandomness,
          pathToCircuits,
        });
        collectionMembershipProofs.push(collectionMembershipProof);
        setNumProofsCompleted((prev) => prev! + 1);
      }

      // Serialize proof
      const serializedProof = JSON.stringify({
        teamPubKeyIndex: teamJubmoji.pubKeyIndex,
        serializedTeamMembershipProof:
          serializeMembershipProof(teamMembershipProof),
        serializedCollectionMembershipProofs: collectionMembershipProofs.map(
          serializeMembershipProof
        ),
      });

      // Send proof to server for submission
      const response = await fetch(`/api/team-leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questId: quest.id,
          serializedProof,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team leaderboard score!");
      }
      const { scoreAdded } = await response.json();

      const nullifiedSigs = unnullifiedCollectionJubmojis.map(
        (jubmoji) => jubmoji.sig
      );
      addNullifiedSigs({
        quests: {
          [quest.id]: nullifiedSigs,
        },
        powers: {},
      });

      setNumProofsCompleted(undefined);
      setNumProofsTotal(undefined);
      toast.success(`Added ${scoreAdded} points to your team's score!`);
      refetchLeaderboard();
    } catch (e) {
      console.error(e);
      setNumProofsCompleted(undefined);
      setNumProofsTotal(undefined);
      toast.error("Failed to update team leaderboard score.");
    }
  };

  const onUpdateTeamLeaderboardScore = async () => {
    if (!quest) return;

    // User has no Jubmojis at all
    if (!jubmojis || jubmojis.length === 0) {
      return toast.error(
        "Please collect some Jubmojis to participate in this leaderboard!"
      );
    }

    // Quest has ended
    const currentTime = new Date();
    if (quest.endTime && currentTime > new Date(quest.endTime)) {
      return toast.error("Quest has ended!");
    }

    const teamCardIndices = quest.prerequisiteCards.map((card) => card.index);
    const collectionCardIndices = quest.collectionCards.map(
      (card) => card.index
    );

    // User has no team card Jubmojis
    const teamJubmojis = jubmojis.filter((jubmoji) =>
      teamCardIndices.includes(jubmoji.pubKeyIndex)
    );
    if (teamJubmojis.length === 0) {
      return toast.error(
        "You must collect a team card Jubmoji to participate in this leaderboard!"
      );
    }

    // User has no unnullified collection card Jubmojis
    const { quests: questNullifiedSigMap } = await loadNullifiedSigs();
    const nullifiedSigs = questNullifiedSigMap[quest.id] || [];
    const unnullifiedCollectionJubmojis = jubmojis.filter(
      (jubmoji) =>
        collectionCardIndices.includes(jubmoji.pubKeyIndex) &&
        !nullifiedSigs.includes(jubmoji.sig)
    );
    if (unnullifiedCollectionJubmojis.length === 0) {
      return toast.error(
        "All of your Jubmojis have already been submitted to the leaderboard!"
      );
    }

    // Proof Jubmojis consists of team card Jubmojis and unnullified collection card Jubmojis
    const proofJubmojis = [...teamJubmojis, ...unnullifiedCollectionJubmojis];

    await toast.promise(
      updateTeamLeaderboardMutation.mutateAsync({
        jubmojis: proofJubmojis,
        quest,
      }),
      {
        loading: "Updating team score...",
        success: (scoreAdded: any) => {
          // Add all used collection card signatures to nullified sigs
          const nullifiedSigs = unnullifiedCollectionJubmojis.map(
            (jubmoji) => jubmoji.sig
          );
          addNullifiedSigs({
            quests: {
              [quest.id]: nullifiedSigs,
            },
            powers: {},
          });

          return `Added ${scoreAdded} points to your team's score!`;
        },
        error: (err: any) => err.message,
      }
    );
  };

  if (isLoadingQuest) return <PagePlaceholder />;
  if (!quest) return <div>Quest not found</div>;

  const showLeaderboard = quest.proofType === $Enums.ProofType.TEAM_LEADERBOARD;

  const collectionCardIndices = quest.collectionCards.map((card) => card.index);

  const collectedItems =
    jubmojis?.filter((jubmoji) =>
      collectionCardIndices.includes(jubmoji.pubKeyIndex)
    ).length ?? 0;

  const collectionTotalItems = quest.collectionCards.length;

  const showProofProgress =
    numProofsCompleted !== undefined && numProofsTotal !== undefined;
  const proofPercentageProgress = showProofProgress
    ? (numProofsCompleted / (numProofsTotal || 1)) * 100
    : 0;
  let proofProgressDisplayText = "";
  if (numProofsTotal !== undefined) {
    switch (numProofsCompleted) {
      case undefined:
        break;
      case 0:
        proofProgressDisplayText =
          "Proving ownership of a team card Jubmoji...";
        break;
      case numProofsTotal:
        proofProgressDisplayText = "Submitting proof to leaderboard...";
        break;
      default:
        proofProgressDisplayText = `Proving ownership of Jubmoji ${numProofsCompleted} of ${
          numProofsTotal! - 1 // -1 because the team proof is already counted
        }...`;
    }
  }

  return (
    <div>
      <AppHeader
        title={
          <Link href="/">
            <button>
              <Icons.arrowBack />
            </button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4">
        <QuestCard
          title={quest.name}
          description={quest.description}
          showProgress
          image={quest.imageLink || ""}
          spacing="sm"
          collected={collectedItems}
          collectionTotalItems={collectionTotalItems}
        >
          <div className="flex flex-col gap-1 mt-2">
            {quest.collectionCards.length > 0 && (
              <>
                <div className="flex flex-col">
                  <Card.Title className="!text-base text-left">
                    Collect
                  </Card.Title>
                  <div className="flex gap-2"></div>
                </div>
                <div className="flex flex-wrap gap-1 mr-auto">
                  {quest.collectionCards.map((card, index) => {
                    const isCollected = collectedCards.find(
                      (collectedCard) =>
                        collectedCard.pubKeyIndex === card.index
                    )?.pubKeyIndex;

                    return isLoadingCollectedCards ? (
                      <Placeholder.Base className="w-4 h-4"></Placeholder.Base>
                    ) : (
                      <span
                        key={index}
                        className={cn(
                          "!text-[20px]",
                          !isCollected && "opacity-30"
                        )}
                      >
                        {cardPubKeys[card.index].emoji}
                      </span>
                    );
                  })}
                </div>
              </>
            )}

            <div className="ml-auto">
              <span className="text-shark-400 text-[13px] font-dm-sans">
                {`Ends on ${endDateLabel}`}
              </span>
            </div>
          </div>
        </QuestCard>

        {quest.powers.map((power) => {
          return (
            <Link key={power.id} href={`/powers/${power.id}`}>
              <PowerCard
                title={power.name}
                description={power.description}
                powerType={power.powerType}
                locked={powerIsLocked}
                disabled={powerIsLocked}
              />
            </Link>
          );
        })}

        {showLeaderboard && (
          <>
            <TeamLeaderboard
              items={scoreMapping}
              loading={isLoadingLeaderboard}
            />
            {showProofProgress && (
              <div className="flex justify-center items-center gap-2 self-stretch">
                <span className="font-bold font-hind-siliguri text-shark-600 text-[13px] leading-[120%]">
                  {proofProgressDisplayText}
                </span>
                <div className="flex items-center self-stretch border border-shark-400 w-full">
                  <div
                    className={`h-full bg-shark-400`}
                    style={{
                      width: `${proofPercentageProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}
            <Button
              variant="secondary"
              onClick={onSequentialUpdateTeamLeaderboardScore}
              disabled={showProofProgress}
              loading={showProofProgress}
            >
              Update team score
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
