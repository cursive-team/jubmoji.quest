import { classed } from "@tw-classed/react";
import React, { Children, useRef } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useRouter } from "next/router";

interface OnboardingProps {
  children?: React.ReactNode;
}

const OnboardingIndicator = classed.div("h-2 border border-shark-600 grow", {
  variants: {
    active: {
      true: "bg-shark-600",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const Onboarding = ({ children }: OnboardingProps) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(0);
  const endY = useRef(0);

  const arrayChildren = Children.toArray(children);

  const handleSwipe = () => {
    const direction = endX.current - startX.current < 0 ? "right" : "left";

    const swipeIndex =
      direction === "right" ? activeIndex + 1 : activeIndex - 1;

    if (swipeIndex < 0 || swipeIndex > arrayChildren.length - 1) return; // can't go past the first or last slide

    setActiveIndex(swipeIndex);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div
        onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
          startX.current = event.touches[0].clientX;
          startY.current = event.touches[0].clientY;
        }}
        onTouchEnd={(event: React.TouchEvent<HTMLDivElement>) => {
          endX.current = event.changedTouches[0].clientX;
          endY.current = event.changedTouches[0].clientY;
          handleSwipe();
        }}
      >
        {arrayChildren[activeIndex]}
      </div>
      <div className="flex gap-2">
        {arrayChildren.map((child, index) => (
          <OnboardingIndicator
            key={index}
            active={index <= activeIndex}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      {activeIndex === arrayChildren.length - 1 && (
        <Button
          icon={<Icons.arrowRight className="text-black" />}
          iconPosition="right"
          variant="secondary"
          onClick={() => router.push("/")}
        >
          Go to app!
        </Button>
      )}
    </div>
  );
};

Onboarding.displayName = "Onboarding";

export { Onboarding };
