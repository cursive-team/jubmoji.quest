import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFetchQuestById } from "@/hooks/useFetchQuests";
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
import { cardPubKeys } from "jubmoji-api";
import { addNullifiedSigs, loadNullifiedSigs } from "@/lib/localStorage";

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
  const [powerIsLocked, setPowerIsLocked] = useState(true);

  const { isLoading: isLoadingQuest, data: quest = null } = useFetchQuestById(
    questId as string
  );

  const updateTeamLeaderboardMutation = useUpdateTeamLeaderboardMutation();
  const {
    isLoading: isLoadingLeaderboard,
    data: scoreMapping = {},
    refetch: refetchLeaderboard,
  } = useGetTeamLeaderboard(questId as string);

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

    if (!jubmojis || jubmojis.length === 0) {
      return toast.error(
        "Please collect some Jubmojis to update your team's score!"
      );
    }

    const { quests: questNullifiedSigMap } = await loadNullifiedSigs();
    const nullifiedSigs = questNullifiedSigMap[quest.id] || [];

    const unnullifiedJubmojis = jubmojis.filter(
      (jubmoji) => !nullifiedSigs.includes(jubmoji.sig)
    );
    if (unnullifiedJubmojis.length === 0) {
      return toast.error(
        "All of your Jubmojis have already been submitted to the leaderboard!"
      );
    }

    await toast.promise(
      updateTeamLeaderboardMutation.mutateAsync({
        jubmojis: unnullifiedJubmojis,
        quest,
      }),
      {
        loading: "Updating team score...",
        success: (scoreAdded: any) => {
          const collectionCardIndices = quest.collectionCards.map(
            (card) => card.index
          );
          // Need to filter Jubmojis since we do not want to nullify team card signatures
          const nullifiedSigs = unnullifiedJubmojis
            .filter((jubmoji) =>
              collectionCardIndices.includes(jubmoji.pubKeyIndex)
            )
            .map((jubmoji) => jubmoji.sig);
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

  const collectionEmojis = quest.collectionCards
    .map((card) => cardPubKeys[card.index].emoji)
    .join(" ");

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
          image={quest.imageLink || ""}
          spacing="sm"
        >
          <div className="flex flex-col gap-2 mt-6">
            <div className="flex flex-col">
              <Card.Title className="!text-base text-left">Collect</Card.Title>
              <div className="flex gap-2"></div>
            </div>
            <div className="mr-auto">{collectionEmojis}</div>
            <div className="ml-auto">
              <span className=" text-shark-400 text-[13px] font-dm-sans">
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
                disabled={powerIsLocked} // Todo: Logic for enabling powers
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
            <Button
              variant="secondary"
              onClick={onUpdateTeamLeaderboardScore}
              disabled={updateTeamLeaderboardMutation.isLoading}
              loading={updateTeamLeaderboardMutation.isLoading}
            >
              Update team score
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
