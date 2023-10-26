import { classed } from "@tw-classed/react";

const PowerWrapper = classed.div(
  "fixed-bottom left-0 right-0 bg-shark-950 rounded-tr-[32px] rounded-tl-[32px] round px-6 py-12",
  {
    variants: {
      disabled: {
        true: "opacity-30",
      },
    },
  }
);

PowerWrapper.displayName = "PowerWrapper";

export { PowerWrapper };
