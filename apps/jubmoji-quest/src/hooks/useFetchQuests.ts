import { JubmojiQuest } from "@/types";
import { useQuery } from "react-query";
import { useJubmojis } from "./useJubmojis";

export const useGetQuestPowerLockedStatus = (questId?: string | number) => {
  const { data: jubmojis = [] } = useJubmojis();
  const { data: quest } = useFetchQuestById(questId);

  return useQuery(
    ["questPowerLockedStatus", quest?.id, jubmojis.length],
    async (): Promise<{ locked: boolean }> => {
      if (!quest) {
        return {
          locked: true,
        };
      }

      const collectionCardIndices = quest.collectionCards.map(
        (card) => card.index
      );

      const collectedItems =
        jubmojis?.filter((jubmoji) =>
          collectionCardIndices.includes(jubmoji.pubKeyIndex)
        ).length ?? 0;

      const powerIsLocked =
        collectionCardIndices.length > 0 && collectedItems === 0;

      return { locked: powerIsLocked };
    },
    {
      refetchOnWindowFocus: false,
      enabled: quest?.id !== undefined,
      retry: quest?.id !== undefined,
    }
  );
};

export const useFetchQuests = () => {
  return useQuery(
    ["quests"],
    async (): Promise<JubmojiQuest[]> => {
      const response = await fetch("/api/quests");

      if (!response.ok) {
        console.error("Could not fetch Jubmoji cards.");
        return []; //
      }

      const quests = await response.json();

      return quests;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useFetchQuestById = (id?: string | number) => {
  return useQuery(
    ["quests", id],
    async (): Promise<JubmojiQuest | null> => {
      if (id == undefined) return null;
      const response = await fetch(`/api/quests/${id}`);

      if (!response.ok) {
        console.error("Could not fetch quest ${questId}.");
        return null;
      }

      const quest = await response.json();

      return quest;
    },
    {
      refetchOnWindowFocus: false,
      retry: id == undefined,
    }
  );
};
