import React, { useState } from "react";
import { classed } from "@tw-classed/react";
import { cn } from "../../lib/utils";

export interface SimpleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  description: string;
  size?: "sm" | "md";
}

const IconContainer = classed.div(
  "w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto"
);
const CardText = classed.span(
  "text-shark-50 text-[13px] font-normal font-dm-sans"
);
const Card = classed.div(
  "absolute inset-0 flex flex-col rounded-lg p-5 w-full h-full backface-hidden gap-4 self-stretch bg-shark-950"
);
const CardContainer = classed.div("perspective justify-center text-center", {
  variants: {
    size: {
      sm: "h-[200px]",
      md: "h-[240px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const SimpleCard = ({
  icon,
  title,
  description,
  size = "md",
}: SimpleCardProps) => {
  return (
    <CardContainer size={size}>
      <div className="relative w-full h-full transform-all duration-500 ease-linear">
        <Card>
          <div className="flex justify-between items-start">
            <IconContainer>
              <span
                className={cn(
                  "text-[40px] mt-[9px] inline-block text-space-mono font-bold leading-[40px]"
                )}
              >
                {icon}
              </span>
            </IconContainer>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-shark-50 text-[22px] font-bold leading-1">
              {title}
            </div>
            <div className="flex flex-col gap-3">
              <CardText>{description}</CardText>
            </div>
          </div>
        </Card>
      </div>
    </CardContainer>
  );
};

SimpleCard.displayName = "SimpleCard";

export { SimpleCard };
