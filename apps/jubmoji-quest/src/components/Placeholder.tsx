import { classed } from "@tw-classed/react";
import { Card } from "./cards/Card";

const PlaceholderBase = classed.div("bg-slate-300 animate-pulse");

const PlaceholderLine = classed.div(PlaceholderBase, "w-full", {
  variants: {
    size: {
      sm: "h-[8px]",
      md: "h-[16px]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const PlaceholderCard = classed.div(PlaceholderBase, Card.Base, {
  variants: {
    size: {
      xs: "h-[80px]",
      sm: "h-[120px]",
      md: "h-[180px]",
      xl: "h-[240px]",
      "2xl": "h-[320px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const PlaceholderButton = classed.button(PlaceholderBase, "w-full", {
  variants: {
    size: {
      sm: "h-[32px]",
      md: "h-[48px]",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-[4px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Placeholder = {
  Base: PlaceholderBase,
  Card: PlaceholderCard,
  Button: PlaceholderButton,
  Line: PlaceholderLine,
};
