import { JubmojiQuest } from "@/types";
import { useQuery } from "react-query";
import { useJubmojis } from "./useJubmojis";

export const useGetQuestPowerLockedStatus = (questId?: string | number) => {
  const { data: jubmojis = [] } = useJubmojis();
  const { data: quest } = useFetchQuestById(`${questId}`);

  return useQuery(
    ["questPowerLockedStatus", questId, jubmojis.length],
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

      const collectionTotalItems = quest.collectionCards.length;

      const powerIsLocked = collectedItems < collectionTotalItems;

      return { locked: powerIsLocked };
    },
    {
      refetchOnWindowFocus: false,
      enabled: questId !== undefined,
      retry: questId !== undefined,
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

export const useFetchQuestById = (id: string | number) => {
  return useQuery(
    ["quests", id],
    async (): Promise<JubmojiQuest | null> => {
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
    }
  );
};
