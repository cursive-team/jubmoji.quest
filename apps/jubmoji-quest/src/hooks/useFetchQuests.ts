import { JubmojiQuest } from "@/types";
import { useQuery } from "react-query";

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

export const useFetchQuestById = (id: string | string[] | undefined) => {
  return useQuery(
    ["quests", id],
    async (): Promise<JubmojiQuest | null> => {
      const response = await fetch(`/api/quests/${id}`);

      if (!response.ok) {
        console.error("Could not fetch quest ${questId}.");
        return null; //
      }

      const quest = await response.json();

      return quest;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
