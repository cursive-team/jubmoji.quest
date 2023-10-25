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
    const proofParams = quest.proofParams as Prisma.JsonObject;
    const teamPubKeys = quest.prerequisiteCards.map((card) =>
      getCardPubKeyFromIndex(card.index)
    );
    const collectionPubKeys = quest.collectionCards.map((card) =>
      getCardPubKeyFromIndex(card.index)
    );
    const sigNullifierRandomness = proofParams.sigNullifierRandomness as string;
    const pathToCircuits = __dirname + "circuits/";
    const teamLeaderboardProofClass = createProofInstance(TeamLeaderboard, {
      teamPubKeys,
      collectionPubKeys,
      sigNullifierRandomness,
      pathToCircuits,
    });

    const teamJubmojiList = jubmojis?.filter((jubmoji) => {
      return teamPubKeys.includes(getCardPubKeyFromIndex(jubmoji.pubKeyIndex));
    });
    if (!teamJubmojiList || teamJubmojiList.length === 0) {
      alert(
        "Please collect a Jubmoji from one of the team cards to participate in this quest!"
      );
      return;
    }
    const teamJubmoji = teamJubmojiList[0]; // In the future, we can allow users to choose which team they represent
    const collectionJubmojis = jubmojis?.filter((jubmoji) => {
      return collectionPubKeys.includes(
        getCardPubKeyFromIndex(jubmoji.pubKeyIndex)
      );
    });
    if (!collectionJubmojis || collectionJubmojis.length === 0) {
      alert(
        "Please collect a Jubmoji from one of this quest's cards to update your team's score!"
      );
      return;
    }

    const teamLeaderboardProof = await teamLeaderboardProofClass.prove({
      teamJubmoji,
      collectionJubmojis,
    });

    const response = await fetch(`/api/team-leaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serializedProof: JSON.stringify(teamLeaderboardProof),
      }),
    });

    if (!response.ok) {
      alert("Failed to update team leaderboard score!");
      return;
    }

    const { scoreAdded } = await response.json();
    alert(`Added ${scoreAdded} points to your team's score!`);
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
