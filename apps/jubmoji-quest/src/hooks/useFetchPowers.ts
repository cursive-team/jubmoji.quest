import {
  createJubmojiPowerProof,
  verifyJubmojiPowerProof,
} from "@/lib/proving";
import { JubmojiPower } from "@/types";
import { Jubmoji } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";

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

export const useFetchPowerById = (id: string | string[] | undefined) => {
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

export const usePower = () => {
  const onUsePower = async (
    power: JubmojiPower,
    jubmojis: Jubmoji[]
  ): Promise<string | { error: string }> => {
    let serializedProof;
    try {
      serializedProof = await createJubmojiPowerProof(power, jubmojis);
    } catch (error) {
      return { error: "Failed to use your power!" };
    }

    let { verified } = await verifyJubmojiPowerProof(power, serializedProof);
    if (!verified) {
      return { error: "Failed to use your power!" };
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
      return { error: "Failed to use your power!" };
    }

    const { qrCodeUuid } = await response.json();
    return `${window.location.origin}/qr/${qrCodeUuid}`;
  };

  return useMutation(
    async ({
      power,
      jubmojis,
    }: {
      power: JubmojiPower;
      jubmojis: Jubmoji[];
    }) => {
      const response = await onUsePower(power, jubmojis);
      return response;
    },
    {
      mutationKey: "usePower",
    }
  );
};
