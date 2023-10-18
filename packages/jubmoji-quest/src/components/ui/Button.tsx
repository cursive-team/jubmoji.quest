import { DerivedComponentType, classed } from "@tw-classed/react";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import type * as Classed from "@tw-classed/react";

const ButtonComponent = classed(
  "button",
  "bg-woodsmoke-900 text-white text-base rounded-xl font-normal py-2 px-4",
  {
    variants: {
      size: {
        sm: "sm",
        md: "md",
        lg: "lg",
      },
      variant: {
        primary: "primary",
        secondary: "secondary",
        transparent: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

type ButtonComponentVariants = Classed.VariantProps<typeof ButtonComponent>;

interface ButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "size" | "ref" | "value" | "onChange"
    >,
    ButtonComponentVariants {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loading, ...props }, ref) => {
    return (
      <ButtonComponent ref={ref} variant={variant} size={size} {...props}>
        <span>{loading ? "Loading..." : children}</span>
      </ButtonComponent>
    );
  }
) as DerivedComponentType<typeof ButtonComponent, ButtonComponentVariants>;

Button.displayName = "Button";

export { Button };
