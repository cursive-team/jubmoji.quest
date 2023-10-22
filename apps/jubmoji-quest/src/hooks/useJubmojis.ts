import { Sigmoji } from "../types";
import { useQuery } from "react-query";
import { loadJubmojis } from "../lib/dev_localStorage";
import { Jubmoji } from "jubmoji-api";

export const useJubmojis = () => {
  return useQuery(
    ["jubmojis"],
    async (): Promise<Jubmoji[]> => {
      const jubmojis = await loadJubmojis();
      return jubmojis;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
