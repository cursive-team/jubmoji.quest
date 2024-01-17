import { DerivedComponentType, classed } from "@tw-classed/react";
import React, { TextareaHTMLAttributes, forwardRef } from "react";
import type * as Classed from "@tw-classed/react";
import { InputWrapper } from "./Input";

const TextareaComponent = classed(
  "textarea",
  "font-dm-sans py-3 px-4 text-base text-shark-300 rounded-[4px] ring-0 outline-none focus:border-baby-blue-default",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      variant: {
        transparent: "bg-transparent border border-shark-300",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "transparent",
    },
  }
);

type TextareaComponentVariants = Classed.VariantProps<typeof TextareaComponent>;

interface TextareaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "ref" | "value" | "onChange"
    >,
    TextareaComponentVariants {
  loading?: boolean;
  title?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, children, loading, title, ...props }, ref) => {
    return (
      <InputWrapper label={title}>
        <TextareaComponent ref={ref} variant={variant} size={size} {...props} />
      </InputWrapper>
    );
  }
) as DerivedComponentType<typeof TextareaComponent, TextareaComponentVariants>;

Textarea.displayName = "Textarea";

export { Textarea };
