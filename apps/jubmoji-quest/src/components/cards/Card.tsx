import { classed } from "@tw-classed/react";

const CardBase = classed.div(
  "flex flex-col items-center rounded border border-shark-900 bg-shark-950 overflow-hidden",
  {
    variants: {
      disabled: {
        true: "opacity-80",
      },
      centred: {
        true: "text-center",
      },
      loading: {
        true: "animate-pulse bg-slate-200",
      },
      rounded: {
        true: "rounded-[20px]",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      centred: false,
    },
  }
);

const CardContent = classed.div(
  "flex flex-col justify-center gap-2 self-stretch",
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
  "flex gap-2 text-shark-50 font-medium leading-[120%]",
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
      disabled: {
        true: "disabled-element",
      },
      ellipsis: {
        true: "ellipsis line-clamp-1",
      },
    },
    defaultVariants: {
      font: "giorgio",
      size: "sm",
      disabled: false,
    },
  }
);

const CardDescription = classed.span(
  "flex text-shark-400 font-normal items-center gap-2 self-stretch border-shark-400 leading-[120%]",
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
      truncate: {
        true: "!line-clamp-1",
      },
      disabled: {
        true: "disabled-element",
      },
      ellipsis: {
        true: "!line-clamp-3",
      },
    },
    defaultVariants: {
      font: "dm",
      truncate: false,
      disabled: false,
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
