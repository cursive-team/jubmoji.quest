import React from "react";
import { Card } from "./Card";
import { PowerIcons } from "../icons/PowerIcons";
import { $Enums } from "@prisma/client";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";

export interface PowerCardProps {
  title: string;
  description?: string;
  powerType: $Enums.PowerType;
  disabled?: boolean;
  shortDescription?: boolean;
  bookmarked?: boolean;
  numCardsCollected?: number;
  numCardsTotal?: number;
  showProgress?: boolean;
  locked?: boolean;
  ellipsis?: boolean;
}

export const PowerTypeIconMapping: Record<$Enums.PowerType, any> = {
  // "GROUP": <PowerIcons.group />,
  // "ACCESS": <PowerIcons.access />,
  QR_CODE: <PowerIcons.group />, // Todo: QR code icon
  TWITTER: <PowerIcons.twitter />,
  TELEGRAM: <PowerIcons.telegram />,
  REDIRECT: <PowerIcons.access />,
  POAP: <PowerIcons.access />,
};

const PowerCard = ({
  title,
  description,
  powerType,
  disabled = false,
  shortDescription = false,
  bookmarked = false,
  numCardsCollected = 0,
  numCardsTotal = 0,
  showProgress = false,
  locked = false,
  ellipsis = false,
}: PowerCardProps) => {
  const powerIcon = PowerTypeIconMapping[powerType];
  const percentageProgress = (numCardsCollected / (numCardsTotal || 1)) * 100;

  return (
    <Card.Base disabled={disabled}>
      <Card.Content className="relative" spacing="sm">
        <div className="flex gap-2 self-stretch">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-start gap-2 h-12",
                disabled ? "disabled-element" : ""
              )}
            >
              {powerIcon}
            </div>
            <div className="flex flex-col">
              <Card.Title
                disabled={disabled}
                ellipsis={ellipsis}
                style={{
                  width: "calc(100vw - 200px)",
                }}
              >
                {title}
              </Card.Title>
              {description && (
                <Card.Description
                  disabled={disabled}
                  truncate={shortDescription}
                >
                  {shortDescription && description.length > 20
                    ? description.slice(0, 20) + "..."
                    : description}
                </Card.Description>
              )}
            </div>
          </div>
          <button
            type="button"
            className="flex items-start ml-auto w-6 h-6 z-[2] p-1"
          >
            {/* {locked ? (
              <Icons.locked />
            ) : bookmarked ? (
              <Icons.starSolid />
            ) : (
              <Icons.star />
            )} */}
            {locked && <Icons.locked />}
          </button>
        </div>
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
              {numCardsCollected}/{numCardsTotal}
            </span>
          </div>
        )}
      </Card.Content>
    </Card.Base>
  );
};

PowerCard.displayName = "PowerCard";

export { PowerCard };
