import React from "react";
import { Card } from "../cards/Card";
import { classed } from "@tw-classed/react";
import { Icons } from "../Icons";
import { Message } from "../Message";
import { Placeholder } from "../Placeholder";

type LeaderboardProps = {
  // Items is a mapping from leaderboard public key (which represents a user) to the user's score
  items: Record<string, number>;
  currentUserKey?: string;
  pseudonymMap?: Record<string, string>;
  loading?: boolean;
};

const RankLabel = classed.span(
  "text-base font-normal font-dm-sans last:text-right",
  {
    variants: {
      variant: {
        primary: "text-shark-400",
        secondary: "text-shark-200",
        active: "text-baby-blue-default",
      },
      defaultVariants: {
        variant: "secondary",
      },
    },
  }
);

const LeaderboardContent = classed.div(
  "grid grid-cols-[55px_1fr_100px] gap-2 w-full"
);

const LoadingContent = () => {
  return (
    <LeaderboardContent>
      <Placeholder.Line size="md" />
      <Placeholder.Line size="md" />
      <Placeholder.Line size="md" />
    </LeaderboardContent>
  );
};

/**
 * Component will automatically sort the items by score
 */
const Leaderboard = ({
  items,
  currentUserKey,
  pseudonymMap,
  loading = false,
}: LeaderboardProps) => {
  // Sort the items by score
  let rank = 0;
  let prevScore: Number | undefined;
  let skip = 1;
  // ranking: [userPublicKey, score, rank]
  const ranking: [string, number, number][] = Object.entries(items)
    .sort(([, a], [, b]) => b - a)
    .map(([userPublicKey, score], index) => {
      if (index === 0 || score !== prevScore) {
        prevScore = score;
        rank += skip;
        skip = 1;
      } else {
        skip++;
      }
      return [userPublicKey, score, rank];
    });

  const hasRanking = ranking.length > 0;

  return (
    <Card.Base className="flex flex-col gap-[10px] py-6 px-4">
      <div className="flex w-full justify-between items-center">
        <Card.Title font="giorgio">Leaderboard</Card.Title>
        <Icons.trophy />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <LeaderboardContent>
          <RankLabel variant="primary">Rank</RankLabel>
          <RankLabel variant="primary">Name</RankLabel>
          <RankLabel variant="primary">Score</RankLabel>
        </LeaderboardContent>
        {loading ? (
          <>
            <LoadingContent />
            <LoadingContent />
            <LoadingContent />
            <LoadingContent />
          </>
        ) : hasRanking ? (
          <div className="overflow-scroll max-h-40 pr-1">
            <div className="flex flex-col gap-2 w-full">
              {ranking.map(([userPublicKey, score, rank]) => {
                const variant =
                  currentUserKey === userPublicKey ? "active" : "secondary";

                const userName =
                  pseudonymMap && pseudonymMap[userPublicKey]
                    ? pseudonymMap[userPublicKey]
                    : userPublicKey;
                const userDisplayName =
                  userName.length > 15
                    ? `${userName.slice(0, 15)}...`
                    : userName;

                return (
                  <LeaderboardContent key={userPublicKey}>
                    <RankLabel variant={variant}>{rank}</RankLabel>
                    <RankLabel variant={variant}>
                      <span>{userDisplayName}</span>
                    </RankLabel>
                    <RankLabel variant={variant}>{score}</RankLabel>
                  </LeaderboardContent>
                );
              })}
            </div>
          </div>
        ) : (
          <Message className="mx-auto">No scores yet</Message>
        )}
      </div>
    </Card.Base>
  );
};

Leaderboard.displayName = "Leaderboard";

export { Leaderboard };
