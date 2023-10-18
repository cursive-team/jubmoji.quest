import { DerivedComponentType, classed } from "@tw-classed/react";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import type * as Classed from "@tw-classed/react";

const ButtonComponent = classed.button(
  "flex items-center rounded-full font-medium px-4 w-full flex justify-center gap-2 focus:ring-0 focus:outline-none active:scale-95",
  {
    variants: {
      size: {
        sm: "text-[13px] py-2",
        md: "text-[16px] py-3 leading-none",
        lg: "",
      },
      variant: {
        primary: "primary border border-white text-white ",
        secondary: "secondary bg-white text-black border border-shark-400",
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
      "size" | "ref" | "value" | "onChange" | "icon"
    >,
    ButtonComponentVariants {
  loading?: boolean;
  icon?: any;
}

const Button = forwardRef<any, ButtonProps>(
  ({ className, variant, size, children, loading, icon, ...props }, ref) => {
    return (
      <ButtonComponent ref={ref} variant={variant} size={size} {...props}>
        {icon}
        <span className="text-base font-medium">
          {loading ? "Loading..." : children}
        </span>
      </ButtonComponent>
    );
  }
) as DerivedComponentType<typeof ButtonComponent, ButtonComponentVariants>;

Button.displayName = "Button";

export { Button };
