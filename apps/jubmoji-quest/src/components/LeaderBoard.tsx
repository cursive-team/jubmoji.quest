import React from "react";
import { Card } from "./cards/Card";
import { classed } from "@tw-classed/react";
import { Icons } from "./Icons";

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
  "grid grid-cols-[100px_1fr_100px] gap-2 w-full"
);

export default function LeaderBoard() {
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
        <LeaderBoardContent>
          <RankLabel>Rank</RankLabel>
          <RankLabel>Name</RankLabel>
          <RankLabel>Score</RankLabel>
        </LeaderBoardContent>
        <LeaderBoardContent>
          <RankLabel>Rank</RankLabel>
          <RankLabel>Name</RankLabel>
          <RankLabel>Score</RankLabel>
        </LeaderBoardContent>
        <LeaderBoardContent>
          <RankLabel variant="active">Rank</RankLabel>
          <RankLabel variant="active">Name</RankLabel>
          <RankLabel variant="active">Score</RankLabel>
        </LeaderBoardContent>
        <LeaderBoardContent>
          <RankLabel>Rank</RankLabel>
          <RankLabel>Name</RankLabel>
          <RankLabel>Score</RankLabel>
        </LeaderBoardContent>
        <LeaderBoardContent>
          <RankLabel>Rank</RankLabel>
          <RankLabel>Name</RankLabel>
          <RankLabel>Score</RankLabel>
        </LeaderBoardContent>
        <LeaderBoardContent>
          <RankLabel>Rank</RankLabel>
          <RankLabel>Name</RankLabel>
          <RankLabel>Score</RankLabel>
        </LeaderBoardContent>
      </div>
    </Card.Base>
  );
}
