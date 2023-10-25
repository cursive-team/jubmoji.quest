import React, { useState } from "react";
import { PowerWrapper } from "../PowerWrapper";
import { Button } from "../ui/Button";
import {
  useFetchCollectedCards,
  JubmojiCardProps,
} from "@/hooks/useFetchCards";
import { DropdownProps, Dropdown } from "../ui/Dropdown";
import { Textarea } from "../ui/Textarea";

const TwitterPower = () => {
  const { isLoading, data: collectedCards } = useFetchCollectedCards();
  const [selectedJubmoji, setSelectedJubmoji] =
    useState<JubmojiCardProps | null>();

  const jubmojiOptions: DropdownProps["items"] =
    collectedCards?.map((jubmoji) => {
      return {
        content: <span className="mx-auto">{jubmoji?.emoji}</span>,
        onClick: () => {
          setSelectedJubmoji(jubmoji);
        },
      };
    }) ?? [];

  return (
    <PowerWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className=" font-dm-sans text-[13px] font-semibold text-shark-50">
            Message as this Jubmoji
          </span>
          <Dropdown
            disabled={isLoading}
            label={selectedJubmoji?.emoji ?? "Select"}
            items={jubmojiOptions}
          />
        </div>

        <Textarea placeholder="Type your message here!" rows={5} />
        <Button variant="secondary">Post on Twitter</Button>
      </div>
    </PowerWrapper>
  );
};

export { TwitterPower };
