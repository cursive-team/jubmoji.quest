import { cn } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { classed } from "@tw-classed/react";
import React, { useState } from "react";

const RadioOptionItem = classed.div(
  "whitespace-nowrap text-base font-dm-sans font-medium rounded-full px-4 py-2 font-helvetica duration-150 ease-in-out cursor-pointer transition-colors leading-none",
  {
    variants: {
      checked: {
        true: "bg-white text-black",
        false: "bg-shark-900 text-white",
      },
    },
  }
);

interface OptionsProps {
  object?: Record<string, string>;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function Options({
  object = {},
  defaultValue,
  onChange,
  disabled,
}: OptionsProps) {
  let [option, setOption] = useState(defaultValue);

  const handleChange = (value: string) => {
    setOption(value);
    if (onChange) onChange(value);
  };

  return (
    <RadioGroup
      className={cn("flex gap-4 overflow-scroll", {
        "opacity-50": disabled,
      })}
      value={option}
      onChange={handleChange}
      disabled={disabled}
    >
      {Object.entries(object).map(([key, label]) => {
        return (
          <RadioGroup.Option key={key} value={key}>
            {({ checked }) => (
              <RadioOptionItem checked={checked}>{label}</RadioOptionItem>
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
