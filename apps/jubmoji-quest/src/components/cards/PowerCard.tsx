import React from "react";
import { Card } from "./Card";
import { PowerIcons } from "../icons/PowerIcons";
import { $Enums } from "@prisma/client";
import { Icons } from "../Icons";

export interface PowerCardProps {
  title: string;
  description?: string;
  powerType: $Enums.PowerType;
  disabled?: boolean;
  shortDescription?: boolean;
  bookmarked?: boolean;
}

export const PowerTypeIconMapping: Record<$Enums.PowerType, any> = {
  // "GROUP": <PowerIcons.group />,
  // "ACCESS": <PowerIcons.access />,
  QR_CODE: <PowerIcons.group />, // Todo: QR code icon
  TWITTER: <PowerIcons.twitter />,
  TELEGRAM: <PowerIcons.telegram />,
};

const PowerCard = ({
  title,
  description,
  powerType,
  disabled = false,
  shortDescription = false,
  bookmarked = false,
}: PowerCardProps) => {
  const powerIcon = PowerTypeIconMapping[powerType];

  return (
    <Card.Base disabled={disabled}>
      <Card.Content spacing="sm">
        <div className="flex gap-4 items-center self-stretch">
          <div className="flex items-start gap-2 h-12">{powerIcon}</div>
          <div className="flex gap-2">
            <div>
              <div className="flex justify-between items-start self-stretch gap-2 w-full">
                <Card.Title>{title}</Card.Title>
                <div className="flex items-start ml-auto w-6 h-6">
                  {bookmarked ? <Icons.starSolid /> : <Icons.star />}
                </div>
              </div>
              {description && (
                <Card.Description truncate={shortDescription}>
                  {description}
                </Card.Description>
              )}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card.Base>
  );
};

PowerCard.displayName = "PowerCard";

export { PowerCard };
