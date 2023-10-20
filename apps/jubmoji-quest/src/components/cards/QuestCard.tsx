import React from "react";
import { Icons } from "../Icons";
import type * as Classed from "@tw-classed/react";
import { Card } from "./Card";

interface CardProps extends Classed.VariantProps<typeof Card.Base> {
  title: string;
  description?: string;
  image?: string;
  bookmarked?: boolean;
  percentageProgress?: number;
  showProgress?: boolean;
}

const QuestCard = ({
  image,
  title,
  description,
  bookmarked = false,
  percentageProgress = 0,
  showProgress = false,
  disabled = false,
}: CardProps) => {
  return (
    <Card.Base disabled={disabled}>
      <Card.Image
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <Card.Content>
        <div className="flex justify-between items-start self-stretch">
          <Card.Title>{title}</Card.Title>
          <div className="flex items-start gap-2 w-6 h-6">
            {bookmarked ? <Icons.starSolid /> : <Icons.star />}
          </div>
        </div>
        <Card.Description>{description}</Card.Description>
        {showProgress && (
          <div className="flex flex-col justify-center items-center gap-2 self-stretch py-2 px-0">
            <div className="flex items-center gap-2 self-stretch border border-shark-400">
              <div
                className={`w-[${percentageProgress}%] h-2 border-shark-400`}
              />
            </div>
          </div>
        )}
      </Card.Content>
    </Card.Base>
  );
};

QuestCard.displayName = "QuestCard";
export { QuestCard };
