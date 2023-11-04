import { getClientPathToCircuits } from "@/lib/config";
import { createJubmojiQuestProof } from "@/lib/proving";
import { JubmojiQuest } from "@/types";
import { Prisma } from "@prisma/client";
import { Jubmoji, ProvingState } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";

type UpdateTeamLeaderboardMutationProps = {
  jubmojis?: Jubmoji[];
  quest?: JubmojiQuest | null;
  onUpdateProvingState: (provingState: ProvingState) => void;
};

// Returns the team leaderboard for a given quest
export const useGetTeamLeaderboard = (questId: string | number) => {
  return useQuery({
    queryKey: ["teamLeaderboard", questId],
    queryFn: async (): Promise<Record<number, number> | { error: string }> => {
      // After successful update, re-fetch the team leaderboard
      const url = new URL("/api/team-leaderboard", window.location.origin);
      url.searchParams.append("questId", `${questId}`);
      const leaderboardResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!leaderboardResponse.ok) {
        return { error: "Could not fetch new leaderboard" };
      }

      const { scoreMap } = await leaderboardResponse.json();
      return scoreMap;
    },
  });
};

// Mutation for updating the team leaderboard
export const useUpdateTeamLeaderboardMutation = () => {
  return useMutation({
    mutationKey: "updateTeamLeaderboard",
    mutationFn: async ({
      jubmojis,
      quest,
      onUpdateProvingState,
    }: UpdateTeamLeaderboardMutationProps) => {
      if (!jubmojis) {
        throw new Error("You must have jubmojis to participate in this quest!");
      }

      if (!quest) {
        throw new Error("No active quest!");
      }

      const startProofTime = performance.now();
      const teamLeaderboardProof = await createJubmojiQuestProof({
        config: {
          ...quest,
          proofParams: quest.proofParams as Prisma.JsonObject,
        },
        jubmojis,
        pathToCircuits: getClientPathToCircuits(),
        onUpdateProvingState,
      });
      const endProofTime = performance.now();
      const proofGenerationTime = endProofTime - startProofTime;

      const response = await fetch(`/api/team-leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questId: quest.id,
          serializedProof: teamLeaderboardProof,
          proofGenerationTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team leaderboard score!");
      }

      const { scoreAdded } = await response.json();
      return Promise.resolve(scoreAdded);
    },
  });
};
