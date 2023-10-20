import { DerivedComponentType, classed } from "@tw-classed/react";
import React, { InputHTMLAttributes, forwardRef } from "react";
import type * as Classed from "@tw-classed/react";

const InputComponent = classed(
  "input",
  "rounded-[4px] p-2 bg-shark-50/10 ring-0 focus:ring-0 focus:outline-none ",
  {
    variants: {
      size: {
        sm: "sm",
        md: "md",
        lg: "lg",
      },
      variant: {
        primary: "",
        secondary: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

type InputComponentVariants = Classed.VariantProps<typeof InputComponent>;

interface InputProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "ref" | "value" | "onChange"
    >,
    InputComponentVariants {
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, children, loading, ...props }, ref) => {
    return (
      <InputComponent ref={ref} variant={variant} size={size} {...props} />
    );
  }
) as DerivedComponentType<typeof InputComponent, InputComponentVariants>;

Input.displayName = "Input";

export { Input };
