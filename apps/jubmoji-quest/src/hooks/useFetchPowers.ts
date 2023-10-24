import { JubmojiPower } from "@/types";
import { useQuery } from "react-query";

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
