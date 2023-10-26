import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center disabled:opacity-50 font-dm-sans font-medium w-full flex justify-center focus:ring-0 focus:outline-none active:scale-95",
  {
    variants: {
      size: {
        tiny: "text-[11px] py-1 px-2 gap-1",
        sm: "text-[13px] leading-none gap-1 py-2 px-4",
        md: "text-[16px] py-3 leading-none gap-2 px-4",
        lg: "text-[16px] py-3 leading-none gap-2 px-4",
      },
      variant: {
        primary: "primary border border-white text-white ",
        secondary: "secondary bg-white text-black border border-shark-400",
        blue: "bg-baby-blue-default text-shark-970",
        transparent: "bg-transparent",
        dark: "bg-black text-white border border-[#A6A6A6]",
        shark: "bg-shark-970 border border-shark-50 text-white",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-[4px]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      rounded: false,
    },
  }
);

const iconVariants = cva("", {
  variants: {
    size: {
      tiny: "text-[9px] ",
      sm: "text-[9px]",
      md: "text-base",
      lg: "text-base",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: any;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      loading,
      icon,
      rounded,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className, rounded }), {
          "flex-row-reverse": iconPosition === "right",
        })}
        {...props}
      >
        <div className={cn(iconVariants({ size }))}>{icon}</div>
        <span>{loading ? "Loading..." : children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
