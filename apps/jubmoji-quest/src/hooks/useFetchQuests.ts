import { JubmojiQuest } from "@/types";
import { useQuery } from "react-query";
import { useJubmojis } from "./useJubmojis";
import { $Enums, Prisma } from "@prisma/client";
import { useFetchPowerById } from "./useFetchPowers";

export const useGetPowerLockedStatus = (
  powerId: string | number | undefined
) => {
  const { data: jubmojis = [] } = useJubmojis();
  const { data: power } = useFetchPowerById(powerId);

  return useQuery(
    ["questPowerLockedStatus", power?.id, jubmojis.length],
    async (): Promise<{ locked: boolean }> => {
      if (!power) {
        return {
          locked: true,
        };
      }

      const collectionCardIndices = power.collectionCards.map(
        (card) => card.index
      );

      const collectedItems =
        jubmojis?.filter((jubmoji) =>
          collectionCardIndices.includes(jubmoji.pubKeyIndex)
        ).length ?? 0;

      const proofParams = power.proofParams as Prisma.JsonObject;

      if (power.proofType === $Enums.ProofType.N_UNIQUE_IN_COLLECTION) {
        return {
          locked: collectedItems < (proofParams.N as number),
        };
      }

      return {
        locked: collectionCardIndices.length > 0 && collectedItems === 0,
      };
    },
    {
      refetchOnWindowFocus: false,
      enabled: power?.id !== undefined,
      retry: power?.id !== undefined,
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
