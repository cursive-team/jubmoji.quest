import { LeaderBoard } from "@/components/LeaderBoard";
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
  useGetLeaderBoard,
  useUpdateLeaderBoardMutation,
} from "@/hooks/useLeaderboard";
import toast from "react-hot-toast";

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

  const updateLeaderBoardMutation = useUpdateLeaderBoardMutation();
  const {
    isLoading: isLoadingLeaderBoard,
    data: scoreMapping = {},
    refetch: refetchLeaderBoard,
  } = useGetLeaderBoard(questId as string);

  useEffect(() => {
    // refetch the leaderboard when the mutation is successful
    if (updateLeaderBoardMutation.isSuccess) {
      refetchLeaderBoard();
    }
  }, [refetchLeaderBoard, updateLeaderBoardMutation.isSuccess]);

  const endDateLabel = quest?.endTime
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      }).format(new Date(quest.endTime))
    : undefined;

  const onUpdateTeamLeaderBoardScore = async () => {
    await toast.promise(
      updateLeaderBoardMutation.mutateAsync({ jubmojis, quest }),
      {
        loading: "Updating team score...",
        success: (score: any) =>
          `Added ${score} points to your team's score!` ||
          "Team score updated!",
        error: (err: any) => {
          console.log(err.error);
          return err.message;
        },
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
            <LeaderBoard items={scoreMapping} loading={isLoadingLeaderBoard} />
            <Button
              variant="secondary"
              onClick={onUpdateTeamLeaderBoardScore}
              disabled={updateLeaderBoardMutation.isLoading}
              loading={updateLeaderBoardMutation.isLoading}
            >
              Update team score
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
