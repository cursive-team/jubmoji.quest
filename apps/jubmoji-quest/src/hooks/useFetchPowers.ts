import { getClientPathToCircuits } from "@/lib/config";
import {
  createJubmojiQuestProof,
  jubmojiPowerToQuestProofConfig,
} from "@/lib/proving";
import { JubmojiPower } from "@/types";
import { Jubmoji, ProvingState } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";

interface PowerMutationProps {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
  onUpdateProvingState?: (provingState: ProvingState) => void;
}

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

export const useFetchPowerById = (id: string | number) => {
  return useQuery(
    ["powers", id],
    async (): Promise<JubmojiPower | null> => {
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
      const config = jubmojiPowerToQuestProofConfig(power);
      let serializedProof;
      try {
        serializedProof = await createJubmojiQuestProof({
          config,
          jubmojis,
          overrideSigNullifierRandomness:
            power.sigNullifierRandomness || undefined,
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
      const config = jubmojiPowerToQuestProofConfig(power);
      let serializedProof;
      try {
        serializedProof = await createJubmojiQuestProof({
          config,
          jubmojis,
          overrideSigNullifierRandomness:
            power.sigNullifierRandomness || undefined,
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
