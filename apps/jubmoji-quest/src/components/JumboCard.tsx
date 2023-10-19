import React, { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { classed } from "@tw-classed/react";
import { Button } from "./ui/Button";

interface Quest {
  label: string;
  url: string;
}

interface JumboCardProps {
  icon: string; // jubmoji icon
  label: string; // meaning of the jubmoji
  cardBackImage?: string;
  edition: number;
  owner: string;
  location?: string;
  questName: string;
  linkToQuest?: string;
  actions?: React.ReactNode;
  quests?: Quest[];
}

const CardText = classed.span("text-shark-50 text-base");
const FlipCard = classed.div("perspective h-[324px] justify-center");
const FlipCardWrapper = classed.div(
  "relative w-full h-full transform-all duration-500 ease-linear",
  {
    variants: {
      flipped: {
        true: "rotate-y-180",
        false: "",
      },
    },
  }
);
const FlipCardContainer = classed.div(
  "absolute flex flex-col rounded-lg p-5 w-full h-full backface-hidden"
);
const FrontCard = classed(FlipCardContainer, "gap-4 self-stretch bg-shark-950");
const BackCard = classed(
  FlipCardContainer,
  "bg-cover bg-center bg-slate-200 transform rotate-y-180"
);

export default function JumboCard({
  icon,
  label,
  edition,
  owner,
  location,
  questName,
  actions,
  linkToQuest = "#",
  cardBackImage,
}: JumboCardProps) {
  const [flipped, setFlip] = useState(false);
  const [showQuest, setShowQuest] = useState(false);

  const onFlipCard = () => {
    setFlip(!flipped);
  };

  const ownerLocationLabel = [owner, location].filter(Boolean).join("/");
  const backCoverImage: React.CSSProperties = cardBackImage
    ? {
        backgroundImage: `url(${cardBackImage})`,
      }
    : {};

  const JumboContent = () => {
    if (!showQuest) {
      return (
        <>
          <CardText>{`#${edition}`}</CardText>
          <CardText>{ownerLocationLabel}</CardText>
        </>
      );
    }

    return <>Quest details</>;
  };

  return (
    <FlipCard>
      <FlipCardWrapper
        flipped={flipped}
        style={{ transformStyle: "preserve-3d" }}
      >
        <FrontCard>
          <div className="flex justify-between items-start">
            <div className="text-[40px] leading-1">{icon}</div>
            <button
              onClick={onFlipCard}
              type="button"
              role="button"
              aria-label="flip card"
              className=""
            >
              <Icons.flipArrow />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-shark-50 text-[22px] font-bold leading-1">
              {showQuest ? "Quests" : label}
            </div>
            <div className="flex flex-col gap-3">
              <JumboContent />
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 mt-auto">
            <div>
              <Button
                size="sm"
                icon={showQuest ? <Icons.arrowBack /> : <Icons.compass />}
                onClick={() => setShowQuest(!showQuest)}
                rounded
              >
                {showQuest ? "Back" : "Quests"}
              </Button>
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </FrontCard>
        <BackCard onClick={onFlipCard} style={backCoverImage} />
      </FlipCardWrapper>
    </FlipCard>
  );
}
