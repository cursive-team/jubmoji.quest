import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center disabled:opacity-50 font-dm-sans font-medium w-full flex justify-center focus:ring-0 focus:outline-none active:scale-95",
  {
    variants: {
      size: {
        tiny: "text-[12px] py-1 px-2 gap-1",
        sm: "text-[13px] leading-none gap-1 py-2 px-4",
        md: "text-[16px] py-3 leading-none gap-2 px-4",
        lg: "text-[16px] py-3 leading-none gap-2 px-4",
      },
      variant: {
        primary: "primary border border-white text-white ",
        secondary: "secondary bg-white text-black border border-shark-400",
        blue: "bg-baby-blue-default text-shark-970 border border-baby-blue-default",
        transparent: "bg-transparent",
        dark: "bg-black text-white border border-[#A6A6A6]",
        shark: "bg-shark-970 border border-shark-50 text-white",
        "blue-outline":
          "border border-baby-blue-default text-baby-blue-default bg-transparent",
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

export const LoadingSpinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

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
        <div className={cn(iconVariants({ size }))}>
          {loading ? <LoadingSpinner /> : icon}
        </div>
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
