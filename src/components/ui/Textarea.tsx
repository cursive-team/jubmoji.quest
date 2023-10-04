import { DerivedComponentType, classed } from "@tw-classed/react";
import React, {
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import type * as Classed from "@tw-classed/react";

const TextareaComponent = classed("textarea", "", {
  variants: {
    size: {
      sm: "sm",
      md: "md",
      lg: "lg",
    },
    variant: {
      primary: "primary",
      secondary: "secondary",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

type TextareaComponentVariants = Classed.VariantProps<typeof TextareaComponent>;

interface TextareaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "ref" | "value" | "onChange"
    >,
    TextareaComponentVariants {
  loading?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, children, loading, ...props }, ref) => {
    return (
      <TextareaComponent ref={ref} variant={variant} size={size} {...props} />
    );
  }
) as DerivedComponentType<typeof TextareaComponent, TextareaComponentVariants>;

Textarea.displayName = "Textarea";

export { Textarea };
