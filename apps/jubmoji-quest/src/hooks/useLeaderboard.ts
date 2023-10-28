import { getClientPathToCircuits } from "@/lib/config";
import { createJubmojiQuestProof } from "@/lib/proving";
import { JubmojiQuest } from "@/types";
import { Prisma } from "@prisma/client";
import { Jubmoji } from "jubmoji-api";
import { useMutation, useQuery } from "react-query";

type UpdateLeaderboardMutationProps = {
  jubmojis?: Jubmoji[];
  quest?: JubmojiQuest | null;
};

// Returns the leaderboard for a given quest
export const useGetLeaderboard = (questId: string | number) => {
  return useQuery({
    queryKey: ["leaderboard", questId],
    queryFn: async (): Promise<
      Record<number, string | number> | { error: string }
    > => {
      // After successful update, re-fetch the leaderboard
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

// Mutation for updating the leaderboard
export const useUpdateLeaderboardMutation = () => {
  return useMutation({
    mutationKey: "updateLeaderboard",
    mutationFn: async ({ jubmojis, quest }: UpdateLeaderboardMutationProps) => {
      if (!jubmojis) {
        throw new Error("You must have jubmojis to participate in this quest!");
      }

      if (!quest) {
        throw new Error("No active quest");
      }

      const teamLeaderboardProof = await createJubmojiQuestProof({
        config: {
          ...quest,
          proofParams: quest.proofParams as Prisma.JsonObject,
        },
        jubmojis,
        pathToCircuits: getClientPathToCircuits(),
      });

      const response = await fetch(`/api/team-leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questId: quest.id,
          serializedProof: teamLeaderboardProof,
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
