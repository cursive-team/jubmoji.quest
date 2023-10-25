import LeaderBoard from "@/components/LeaderBoard";
import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useFetchQuestById } from "@/hooks/useFetchQuests";
import { Placeholder } from "@/components/Placeholder";
import { Card } from "@/components/cards/Card";

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

  const { isLoading: isLoadingQuest, data: quest = null } = useFetchQuestById(
    questId as string
  );

  const endDateLabel = quest?.endTime
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      }).format(new Date(quest.endTime))
    : undefined;

  if (isLoadingQuest) return <PagePlaceholder />;
  if (!quest) return <div>Quest not found</div>;

  const onUpdateTeamLeaderboardScore = async () => {
    if (!jubmojis) {
      alert("You must have jubmojis to participate in this quest!");
      return;
    }

    const pathToCircuits = __dirname + "circuits/";
    console.log("path to circuits", __dirname, pathToCircuits);
    const teamLeaderboardProof = await createJubmojiQuestProof({
      config: { ...quest, proofParams: quest.proofParams as Prisma.JsonObject },
      jubmojis,
      pathToCircuits,
    });

    const response = await fetch(`/api/team-leaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questId: quest.id,
        serializedProof: JSON.stringify(teamLeaderboardProof),
      }),
    });

    if (!response.ok) {
      alert("Failed to update team leaderboard score!");
      return;
    }

    const { scoreAdded } = await response.json();
    alert(`Added ${scoreAdded} points to your team's score!`);

    // After successful update, re-fetch the leaderboard
    const url = new URL("/api/team-leaderboard", window.location.origin);
    url.searchParams.append("questId", quest.id.toString());
    const leaderboardResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!leaderboardResponse.ok) {
      console.error("Could not fetch new leaderboard");
      return;
    }

    const { scoreMap } = await leaderboardResponse.json();
    console.log(scoreMap);
  };

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
                disabled={true} // Todo: Logic for enabling powers
              />
            </Link>
          );
        })}
        {quest.proofType === $Enums.ProofType.TEAM_LEADERBOARD && (
          <div>
            <LeaderBoard></LeaderBoard>
            <Button variant="secondary" onClick={onUpdateTeamLeaderboardScore}>
              Update team score
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
