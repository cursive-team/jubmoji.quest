import { getClientPathToCircuits } from "@/lib/config";
import { createJubmojiQuestProof } from "@/lib/proving";
import { JubmojiQuest } from "@/types";
import { Prisma } from "@prisma/client";
import { Jubmoji, ProvingState } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";

type UpdateLeaderboardMutationProps = {
  pubKeyNullifierRandomness: string;
  jubmojis?: Jubmoji[];
  pseudonym?: string;
  quest?: JubmojiQuest | null;
  onUpdateProvingState: (provingState: ProvingState) => void;
};

// Returns the leaderboard for a given quest
export const useGetLeaderboard = (questId: string | number) => {
  return useQuery({
    queryKey: ["leaderboard", questId],
    queryFn: async (): Promise<{
      scoreMap: Record<string, number>;
      pseudonymMap: Record<string, string>;
    }> => {
      // After successful update, re-fetch the leaderboard
      const url = new URL("/api/leaderboard", window.location.origin);
      url.searchParams.append("questId", `${questId}`);
      const leaderboardResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!leaderboardResponse.ok) {
        console.error("Could not fetch new leaderboard");
        return { scoreMap: {}, pseudonymMap: {} };
      }

      return await leaderboardResponse.json();
    },
  });
};

// Mutation for updating the leaderboard
export const useUpdateLeaderboardMutation = () => {
  return useMutation({
    mutationKey: "updateLeaderboard",
    mutationFn: async ({
      pubKeyNullifierRandomness,
      jubmojis,
      pseudonym,
      quest,
      onUpdateProvingState,
    }: UpdateLeaderboardMutationProps) => {
      if (!jubmojis) {
        throw new Error("You must have jubmojis to participate in this quest!");
      }

      if (!quest) {
        throw new Error("No active quest!");
      }

      const startProofTime = performance.now();
      const leaderboardProof = await createJubmojiQuestProof({
        config: {
          ...quest,
          proofParams: quest.proofParams as Prisma.JsonObject,
        },
        jubmojis,
        pubKeyNullifierRandomness,
        pathToCircuits: getClientPathToCircuits(),
        onUpdateProvingState,
      });
      const endProofTime = performance.now();
      const proofGenerationTime = endProofTime - startProofTime;

      const response = await fetch(`/api/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questId: quest.id,
          serializedProof: leaderboardProof,
          pseudonym,
          proofGenerationTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update leaderboard score!");
      }

      const { scoreAdded } = await response.json();
      return Promise.resolve(scoreAdded);
    },
  });
};
