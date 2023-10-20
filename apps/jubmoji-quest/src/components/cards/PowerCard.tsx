import React from "react";
import { Card } from "./Card";
import { ProofIcons } from "../icons/ProofIcons";

type ProofType = "group" | "access" | "twitter" | "telegram";

interface PowerCardProps {
  title: string;
  description?: string;
  proofType: ProofType;
}

const ProofTypeIconMapping: Record<ProofType, any> = {
  group: <ProofIcons.group />,
  access: <ProofIcons.access />,
  twitter: <ProofIcons.twitter />,
  telegram: <ProofIcons.telegram />,
};

const PowerCard = ({
  title,
  description,
  proofType = "group",
}: PowerCardProps) => {
  const powerIcon = ProofTypeIconMapping[proofType];

  return (
    <Card.Base>
      <Card.Content spacing="sm">
        <div className="flex gap-6 items-start self-stretch">
          <div className="flex items-start gap-2 h-12">{powerIcon}</div>
          <div className="flex gap-2">
            <div>
              <Card.Title>{title}</Card.Title>
              {description && (
                <Card.Description>{description}</Card.Description>
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
