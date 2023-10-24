import React from "react";
import { Card } from "./Card";
import { PowerIcons } from "../icons/PowerIcons";
import { $Enums } from "@prisma/client";

interface PowerCardProps {
  title: string;
  description?: string;
  powerType: $Enums.PowerType;
  disabled?: boolean;
  shortDescription?: boolean;
}

const PowerTypeIconMapping: Record<$Enums.PowerType, any> = {
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
}: PowerCardProps) => {
  const powerIcon = PowerTypeIconMapping[powerType];

  return (
    <Card.Base disabled={disabled}>
      <Card.Content spacing="sm">
        <div className="flex gap-6 items-center self-stretch">
          <div className="flex items-start gap-2 h-12">{powerIcon}</div>
          <div className="flex gap-2">
            <div>
              <Card.Title>{title}</Card.Title>
              {description && (
                <div className="w-full">
                  <Card.Description truncate={shortDescription}>
                    {description}
                  </Card.Description>
                </div>
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
