import { classed } from "@tw-classed/react";

const Message = classed.span("font-dm-sans text-base", {
  variants: {
    centred: {
      true: "text-center",
    },
    variant: {
      default: "text-shark-50",
      error: "text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

Message.displayName = "Message";
export { Message };
