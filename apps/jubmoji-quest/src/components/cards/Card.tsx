import { classed } from "@tw-classed/react";

const CardBase = classed.div(
  "flex flex-col items-center rounded border border-shark-900 bg-shark-950",
  {
    variants: {
      disabled: {
        true: "opacity-50",
      },
      centred: {
        true: "text-center",
      },
      loading: {
        true: "animate-pulse bg-slate-200",
      },
    },
    defaultVariants: {
      centred: false,
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
      centred: {
        true: "text-center",
      },
    },
    defaultVariants: {
      spacing: "md",
    },
  }
);

const CardHeader = classed.div(
  "flex flex-col justify-center items-center gap-2 self-stretch bg-black/20",
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
  "flex gap-2 text-shark-50 font-medium leading-[140%]",
  {
    variants: {
      font: {
        dm: "font-dm-sans",
        hind: "font-hind-siliguri",
        giorgio: "font-giorgio-sans",
      },
      size: {
        sm: "text-lg",
        md: "text-[22px]",
      },
      centred: {
        true: "justify-center",
      },
    },
    defaultVariants: {
      font: "giorgio",
      size: "sm",
    },
  }
);

const CardDescription = classed.span(
  "flex text-shark-400 font-normal items-center gap-2 self-stretch border-shark-400 leading-[140%]",
  {
    variants: {
      font: {
        dm: "font-dm-sans",
        hind: "font-hind-siliguri",
        giorgio: "font-giorgio-sans",
      },
      centred: {
        true: "mx-auto",
      },
    },
    defaultVariants: {
      font: "dm",
    },
  }
);

const Card = {
  displayName: "Card",
  Base: CardBase,
  Content: CardContent,
  Header: CardHeader,
  Image: CardImage,
  Title: CardTitle,
  Description: CardDescription,
};

export { Card };
