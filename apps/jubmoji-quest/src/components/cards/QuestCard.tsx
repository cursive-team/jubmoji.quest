import React from "react";
import { Icons } from "../Icons";
import type * as Classed from "@tw-classed/react";
import { Card } from "./Card";

interface CardProps extends Classed.VariantProps<typeof Card.Base> {
  title: string;
  description?: string;
  image?: string;
  bookmarked?: boolean;
  collected?: number;
  collectionTotalItems?: number;
  showProgress?: boolean;
  children?: React.ReactNode;
  spacing?: "sm" | "md";
}

const QuestCard = ({
  image,
  title,
  description,
  bookmarked = false,
  collected = 0,
  collectionTotalItems = 0,
  showProgress = false,
  disabled = false,
  spacing = "md",
  children,
}: CardProps) => {
  const percentageProgress = (collected / (collectionTotalItems || 1)) * 100;

  return (
    <Card.Base disabled={disabled}>
      <Card.Image
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <Card.Content spacing={spacing}>
        <div className="flex justify-between items-start self-stretch">
          <Card.Title>{title}</Card.Title>
          {/* <div className="flex items-start gap-2 w-6 h-6">
            {bookmarked ? <Icons.starSolid /> : <Icons.star />}
          </div> */}
        </div>
        <Card.Description>{description}</Card.Description>
        {showProgress && (
          <div className="flex justify-center items-center gap-2 self-stretch">
            <div className="flex items-center self-stretch border border-shark-400 w-full">
              <div
                className={`h-full bg-shark-400`}
                style={{
                  width: `${percentageProgress}%`,
                }}
              />
            </div>
            <span className="font-bold font-hind-siliguri text-shark-600 text-[13px] leading-[120%]">
              {collected}/{collectionTotalItems}
            </span>
          </div>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Card.Content>
    </Card.Base>
  );
};

QuestCard.displayName = "QuestCard";
export { QuestCard };
