import React from "react";
import { Card } from "./cards/Card";
import { classed } from "@tw-classed/react";
import { Icons } from "./Icons";
import { Placeholder } from "./Placeholder";
import { Message } from "./Message";
import { getJubmojiCardByPubIndex, useFetchCards } from "@/hooks/useFetchCards";

type LeaderBoardProps = {
  items: Record<number, string | number>;
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

const LeaderBoardContent = classed.div(
  "grid grid-cols-[55px_1fr_100px] gap-2 w-full"
);

const LoadingContent = () => {
  return (
    <LeaderBoardContent>
      <Placeholder.Line size="md" />
      <Placeholder.Line size="md" />
      <Placeholder.Line size="md" />
    </LeaderBoardContent>
  );
};

/**
 * Component will automatically sort the items by score
 */
const LeaderBoard = ({ items, loading = false }: LeaderBoardProps) => {
  // Sort the items by score
  const ranking = Object.entries(items).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  );

  const { isLoading: isLoadingJubmojis, data: jubmojiCollectionCards = [] } =
    useFetchCards();

  const hasRanking = ranking.length > 0;

  return (
    <Card.Base className="flex flex-col gap-[10px] py-6 px-4">
      <div className="flex w-full justify-between items-center">
        <Card.Title font="giorgio">Leaderboard</Card.Title>
        <Icons.trophy />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <LeaderBoardContent>
          <RankLabel variant="primary">Rank</RankLabel>
          <RankLabel variant="primary">Name</RankLabel>
          <RankLabel variant="primary">Score</RankLabel>
        </LeaderBoardContent>
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
              {ranking?.map(([pubKeyIndex, score], index) => {
                const rank = index + 1;
                const card = getJubmojiCardByPubIndex(
                  jubmojiCollectionCards,
                  Number(pubKeyIndex)
                );

                return (
                  <LeaderBoardContent key={pubKeyIndex}>
                    <RankLabel>{rank}</RankLabel>
                    <RankLabel>
                      <span>
                        {card?.emoji} {card?.name}
                      </span>
                    </RankLabel>
                    <RankLabel>{score}</RankLabel>
                  </LeaderBoardContent>
                );
              })}
            </div>
          </div>
        ) : (
          <Message className="mx-auto"> No scores yet</Message>
        )}
      </div>
    </Card.Base>
  );
};

LeaderBoard.displayName = "LeaderBoard";

export { LeaderBoard };
