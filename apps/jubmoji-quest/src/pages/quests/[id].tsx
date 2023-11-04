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
import { $Enums } from "@prisma/client";
import { useJubmojis } from "@/hooks/useJubmojis";
import {
  useGetTeamLeaderboard,
  useUpdateTeamLeaderboardMutation,
} from "@/hooks/useTeamLeaderboard";
import toast from "react-hot-toast";
import { TeamLeaderboard } from "@/components/ui/TeamLeaderboard";
import { ProvingState, cardPubKeys } from "jubmoji-api";
import { addNullifiedSigs, loadNullifiedSigs } from "@/lib/localStorage";
import { useFetchCollectedCards } from "@/hooks/useFetchCards";
import { cn } from "@/lib/utils";

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
  const [provingState, setProvingState] = useState<ProvingState>();

  const onUpdateProvingState = (provingState: ProvingState) => {
    setProvingState(provingState);
  };

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
        onUpdateProvingState,
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
          setProvingState(undefined);

          return `Added ${scoreAdded} points to your team's score!`;
        },
        error: (err: any) => {
          setProvingState(undefined);
          return err.message;
        },
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

  const proofPercentageProgress = provingState
    ? (provingState.numProofsCompleted / (provingState.numProofsTotal || 1)) *
      100
    : 0;
  let proofProgressDisplayText = "";
  if (provingState) {
    switch (provingState.numProofsCompleted) {
      case 0:
        proofProgressDisplayText =
          "Proving ownership of a team card Jubmoji...";
        break;
      case provingState.numProofsTotal:
        proofProgressDisplayText = "Submitting proof to leaderboard...";
        break;
      default:
        proofProgressDisplayText = `Proving ownership of Jubmoji ${
          provingState.numProofsCompleted
        } of ${
          provingState.numProofsTotal - 1 // -1 because the team proof is already counted
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
                        {quest.proofType ===
                          $Enums.ProofType.TEAM_LEADERBOARD &&
                        !jubmojis?.find(
                          (jubmoji) => jubmoji.pubKeyIndex === card.index
                        )
                          ? "❓" // Hide collection emojis that have not been collected for team leaderboard quests
                          : cardPubKeys[card.index].emoji}
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
          return powerIsLocked === undefined || powerIsLocked ? (
            <PowerCard
              title={power.name}
              description={power.description}
              powerType={power.powerType}
              locked={powerIsLocked}
              disabled={powerIsLocked}
            />
          ) : (
            <Link key={power.id} href={`/powers/${power.id}`}>
              <PowerCard
                title={power.name}
                description={power.description}
                powerType={power.powerType}
                locked={powerIsLocked}
                disabled={powerIsLocked}
                shortDescription
                ellipsis
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
            {provingState && (
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
              onClick={onUpdateTeamLeaderboardScore}
              disabled={provingState !== undefined}
              loading={provingState !== undefined}
            >
              Update team score
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
