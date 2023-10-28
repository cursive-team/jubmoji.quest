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
  useGetLeaderboard,
  useUpdateLeaderboardMutation,
} from "@/hooks/useLeaderboard";
import toast from "react-hot-toast";
import { Leaderboard } from "@/components/Leaderboard";

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

  const updateLeaderboardMutation = useUpdateLeaderboardMutation();
  const {
    isLoading: isLoadingLeaderBoard,
    data: scoreMapping = {},
    refetch: refetchLeaderBoard,
  } = useGetLeaderboard(questId as string);

  useEffect(() => {
    // refetch the leaderboard when the mutation is successful
    if (updateLeaderboardMutation.isSuccess) {
      refetchLeaderBoard();
    }
  }, [refetchLeaderBoard, updateLeaderboardMutation.isSuccess]);

  const endDateLabel = quest?.endTime
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      }).format(new Date(quest.endTime))
    : undefined;

  const onUpdateTeamLeaderboardScore = async () => {
    await toast.promise(
      updateLeaderboardMutation.mutateAsync({ jubmojis, quest }),
      {
        loading: "Updating team score...",
        success: (score: any) =>
          `Added ${score} points to your team's score!` ||
          "Team score updated!",
        error: (err: any) => err.message,
      }
    );
  };

  if (isLoadingQuest) return <PagePlaceholder />;
  if (!quest) return <div>Quest not found</div>;

  const showLeaderBoard = quest.proofType === $Enums.ProofType.TEAM_LEADERBOARD;

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
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col">
              <Card.Title className="!text-base text-left">Collect:</Card.Title>
              <div className="flex gap-2"></div>
            </div>
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

        {showLeaderBoard && (
          <>
            <Leaderboard items={scoreMapping} loading={isLoadingLeaderBoard} />
            <Button
              variant="secondary"
              onClick={onUpdateTeamLeaderboardScore}
              disabled={updateLeaderboardMutation.isLoading}
              loading={updateLeaderboardMutation.isLoading}
            >
              Update team score
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
