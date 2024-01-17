import { DerivedComponentType, classed } from "@tw-classed/react";
import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import type * as Classed from "@tw-classed/react";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";

const InputComponent = classed(
  "input",
  "font-dm-sans py-3 px-4 rounded-[4px] font-semibold ring-0 focus:ring-0 focus:outline-none w-full leading-[120%] disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-[11px]",
        md: "text-[13px]",
        lg: "text-base",
      },
      variant: {
        primary: "bg-transparent border border-shark-300",
        secondary: "",
      },
      readOnly: {
        true: "opacity-50 cursor-not-allowed",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
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
      "size" | "ref" | "value" | "onChange" | "readOnly" | "disabled"
    >,
    InputComponentVariants {
  loading?: boolean;
  icon?: React.ReactNode;
  title?: string;
}

type InputWrapperProps = {
  label?: string;
  children?: ReactNode;
};

export const InputWrapper = ({
  label,
  children,
  ...props
}: InputWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-shark-500 text-[13px] font-dm-sans">{label}</span>
      )}
      {children}
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      children,
      icon,
      loading,
      disabled,
      title,
      readOnly,
      ...props
    },
    ref
  ) => {
    const isSearch = props.type === "search";

    return (
      <InputWrapper label={title}>
        <div className="relative flex items-center gap-2 rounded-[4px]">
          {isSearch && (
            <Icons.search className={cn(disabled ? "opacity-50" : "")} />
          )}
          <InputComponent
            ref={ref}
            variant={variant}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
        </div>
      </InputWrapper>
    );
  }
) as DerivedComponentType<typeof InputComponent, InputComponentVariants>;

Input.displayName = "Input";

export { Input };
