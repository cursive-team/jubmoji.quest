import { classed } from "@tw-classed/react";
import React, { Children } from "react";
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

  const arrayChildren = Children.toArray(children);

  const handleNext = () => {
    if (activeIndex < arrayChildren.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <div onClick={handleNext}>{arrayChildren[activeIndex]}</div>
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
