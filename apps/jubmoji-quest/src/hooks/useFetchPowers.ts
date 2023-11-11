import { getClientPathToCircuits } from "@/lib/config";
import {
  createJubmojiQuestProof,
  jubmojiPowerToProofConfig,
} from "@/lib/proving";
import { JubmojiPower } from "@/types";
import { Jubmoji, ProvingState } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";
import { useJubmojis } from "./useJubmojis";
import { $Enums, Prisma } from "@prisma/client";
interface PowerMutationProps {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
  onUpdateProvingState?: (provingState: ProvingState) => void;
}

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

export const useFetchPowers = () => {
  return useQuery(
    ["powers"],
    async (): Promise<JubmojiPower[]> => {
      const response = await fetch("/api/powers");

      if (!response.ok) {
        console.error("Could not fetch powers.");
        return [];
      }

      const powers: JubmojiPower[] = await response.json();

      return powers;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useFetchPowerById = (id: string | number | undefined) => {
  return useQuery(
    ["powers", id],
    async (): Promise<JubmojiPower | null> => {
      if (id === undefined) return null;

      const response = await fetch(`/api/powers/${id}`);

      if (!response.ok) {
        console.error(`Could not fetch power ${id}.`);
        return null;
      }

      const power: JubmojiPower = await response.json();

      return power;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useQRCodePowerMutation = () => {
  return useMutation({
    mutationKey: "useQRCodePower",
    mutationFn: async ({
      power,
      jubmojis,
      onUpdateProvingState,
    }: PowerMutationProps) => {
      const config = jubmojiPowerToProofConfig(power);
      let serializedProof;
      try {
        serializedProof = await createJubmojiQuestProof({
          config,
          jubmojis,
          pathToCircuits: getClientPathToCircuits(),
          onUpdateProvingState,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to use your power!");
      }

      const response = await fetch(`/api/qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          powerId: power.id,
          serializedProof,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to use your power!");
      }

      const { qrCodeUuid } = await response.json();
      return qrCodeUuid;
    },
  });
};

export const useRedirectPowerMutation = () => {
  return useMutation({
    mutationKey: "useRedirectPower",
    mutationFn: async ({
      power,
      jubmojis,
      onUpdateProvingState,
    }: PowerMutationProps) => {
      const config = jubmojiPowerToProofConfig(power);
      let serializedProof;
      try {
        serializedProof = await createJubmojiQuestProof({
          config,
          jubmojis,
          pathToCircuits: getClientPathToCircuits(),
          onUpdateProvingState,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to use your power!");
      }

      return serializedProof;
    },
  });
};
