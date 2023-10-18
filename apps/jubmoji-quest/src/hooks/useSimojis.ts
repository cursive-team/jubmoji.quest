import { loadSigmojis } from "../lib/localStorage";
import { Sigmoji } from "../types";
import { useQuery } from "react-query";

export const useSigmojis = () => {
  return useQuery(
    ["sigmojis"],
    async (): Promise<Sigmoji[]> => {
      const sigmojis = await loadSigmojis();
      return sigmojis;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
