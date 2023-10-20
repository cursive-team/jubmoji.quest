import AppHeader from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import { powers, quests } from "@/lib/dev_demo";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const getQuestDetailsByIdMock = (id: string): any => {
  return quests.find((quest) => quest.id === id);
};

const getPowersByIdMock = (id: string): any => {
  return powers[0];
};

export default function QuestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const quest = getQuestDetailsByIdMock(id as string);
  const power = getPowersByIdMock("POWER_ID");

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
        {quest && <QuestCard {...quest} />}
        <PowerCard
          title={power.name}
          description={power.description}
          disabled={power.disabled}
          {...power}
        />
        <Button variant="secondary">Update team score</Button>
      </div>
    </div>
  );
}
