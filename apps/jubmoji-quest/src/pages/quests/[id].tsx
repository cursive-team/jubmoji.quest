import LeaderBoard from "@/components/LeaderBoard";
import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import { JubmojiQuest } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function QuestDetailPage() {
  const [quest, setQuest] = useState<JubmojiQuest>();

  const router = useRouter();
  const { id: questId } = router.query;

  useEffect(() => {
    const fetchQuest = async () => {
      const response = await fetch(`/api/quests/${questId}`);

      if (!response.ok) {
        // Todo: error handling
        throw new Error(`Could not fetch quest ${questId}.`);
      }
      const data = await response.json();

      setQuest(data);
    };

    fetchQuest();
  }, [questId]);

  if (!quest) return null;

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
        />
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
        <LeaderBoard></LeaderBoard>
        <Button variant="secondary">Update team score</Button>
      </div>
    </div>
  );
}
