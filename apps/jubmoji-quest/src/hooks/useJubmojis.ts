import { Sigmoji } from "../types";
import { useQuery } from "react-query";
import { loadJubmojis } from "../lib/dev_localStorage";

export const useJubmojis = () => {
  return useQuery(
    ["jubmojis"],
    async (): Promise<any[]> => {
      const jubmojis = await loadJubmojis();
      return jubmojis;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
