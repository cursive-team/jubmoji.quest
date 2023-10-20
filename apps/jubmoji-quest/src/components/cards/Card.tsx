import React from "react";
import { Icons } from "../Icons";
import { classed } from "@tw-classed/react";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  bookmarked?: boolean;
  percentageProgress?: number;
  showProgress?: boolean;
}

const CardImage = classed.div(
  "bg-cover w-full h-24 rounded-tl rounded-tr bg-shark-600"
);
const Card = ({
  image,
  title,
  description,
  bookmarked = false,
  percentageProgress = 0,
  showProgress = false,
}: CardProps) => {
  return (
    <div className="flex flex-col justify-center items-center rounded border border-shark-900 bg-shark-950">
      <CardImage
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <div className="flex flex-col justify-center items-center gap-2 self-stretch p-6">
        <div className="flex justify-between items-start self-stretch">
          <div className="font-hind-siliguri flex justify-center items-center gap-2 text-shark-50 text-lg font-medium leading-[140%]">
            {title}
          </div>
          <div className="flex items-start gap-2 w-6 h-6">
            {bookmarked ? <Icons.starSolid /> : <Icons.star />}
          </div>
        </div>
        <div className="flex text-shark-400  font-normal items-center gap-2 self-stretch border-shark-400 leading-[140%]">
          {description}
        </div>
        {showProgress && (
          <div className="flex flex-col justify-center items-center gap-2 self-stretch py-2 px-0">
            <div className="flex items-center gap-2 self-stretch border border-shark-400">
              <div
                className={`w-[${percentageProgress}%] h-2 border-shark-400`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Card.displayName = "Card";

export { Card };
