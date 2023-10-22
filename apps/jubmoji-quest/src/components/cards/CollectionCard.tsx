import React, { useState } from "react";
import { Icons } from "../Icons";
import { classed } from "@tw-classed/react";
import { Button } from "../ui/Button";
import Link from "next/link";

interface CollectionCardProps {
  icon: string;
  label: string;
  edition: number;
  owner: string;
  cardBackImage?: string;
  actions?: React.ReactNode;
  quests?: {
    id: number;
    name: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
  }[];
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

const CollectionCard = ({
  label,
  icon,
  edition,
  owner,
  cardBackImage,
  actions,
  quests,
}: CollectionCardProps) => {
  const [flipped, setFlip] = useState(false);
  const [showQuest, setShowQuest] = useState(false);

  const onFlipCard = () => {
    setFlip(!flipped);
  };

  const backCoverImage: React.CSSProperties = cardBackImage
    ? {
        backgroundImage: `url(${cardBackImage})`,
      }
    : {};

  const CollectionContent = () => {
    if (!showQuest) {
      return (
        <>
          <CardText>{`#${edition}`}</CardText>
          <CardText>{owner}</CardText>
        </>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {quests?.map((quest) => {
          return (
            <Link
              key={quest.id}
              href={"/quests/" + quest.id}
              className="underline"
            >
              {quest.name}
            </Link>
          );
        })}
      </div>
    );
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
              <CollectionContent />
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
};

CollectionCard.displayName = "CollectionCard";

export { CollectionCard };
