import { classed } from "@tw-classed/react";

const CardBase = classed.div(
  "flex flex-col justify-center items-center rounded border border-shark-900 bg-shark-950",
  {
    variants: {
      disabled: {
        true: "opacity-50",
      },
    },
  }
);

const CardContent = classed.div(
  "flex flex-col justify-center items-center gap-2 self-stretch",
  {
    variants: {
      spacing: {
        sm: "p-4",
        md: "p-6",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
);

const CardImage = classed.div(
  "bg-cover w-full h-24 rounded-tl rounded-tr bg-shark-600"
);

const CardTitle = classed.span(
  "font-hind-siliguri flex justify-center items-center gap-2 text-shark-50 text-lg font-medium leading-[140%]"
);

const CardDescription = classed.span(
  "flex text-shark-400  font-normal items-center gap-2 self-stretch border-shark-400 leading-[140%]"
);

const Card = {
  displayName: "Card",
  Base: CardBase,
  Content: CardContent,
  Image: CardImage,
  Title: CardTitle,
  Description: CardDescription,
};

export { Card };
