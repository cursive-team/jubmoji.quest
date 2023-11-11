import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerTypeIconMapping } from "@/components/cards/PowerCard";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { $Enums } from "@prisma/client";
import { useJubmojis } from "../../hooks/useJubmojis";
import { useFetchPowerById } from "@/hooks/useFetchPowers";
import { Placeholder } from "@/components/Placeholder";
import { Card } from "@/components/cards/Card";
import { classed } from "@tw-classed/react";
import { PowerQrCode } from "@/components/powers/PowerQrCode";
import { TelegramPower } from "@/components/powers/TelegramPower";
import { TwitterPower } from "@/components/powers/TwitterPower";
import { JubmojiPower } from "@/types";
import { Jubmoji, cardPubKeys } from "jubmoji-api";
import { Message } from "@/components/Message";
import { cn, getNumCardsToCollect } from "@/lib/utils";
import { useGetPowerLockedStatus } from "@/hooks/useFetchPowers";
import { RedirectPower } from "@/components/powers/RedirectPower";

interface PowerDetailLabelProps {
  label: string;
  value: ReactNode;
}

export interface PowerContentProps {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
}

const PagePlaceholder = () => {
  return (
    <div className="grid grid-cols-1 gap-3 py-4">
      <div className="py-3">
        <Placeholder.Base className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Placeholder.Line />
          <Placeholder.Line size="md" />
        </div>
      </div>
      <Placeholder.Card size="xs" />
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Placeholder.Line />
        </div>
      </div>

      <div className="left-0 fixed-bottom right-0 mt-auto">
        <Placeholder.Card className="!rounded-t-[32px]" size="md" />
      </div>
    </div>
  );
};

const PowerLabel = classed.span(
  "text-shark-300 font-dm-sans text-base font-normal leading-[120%]"
);

const PowerDetailLabel = ({ label, value }: PowerDetailLabelProps) => {
  return (
    <div className="flex gap-2 items-center">
      <PowerLabel className="!font-medium min-w-[80px]">{label}</PowerLabel>
      {value}
    </div>
  );
};

const PowerTypeContentMapping: Record<$Enums.PowerType, any> = {
  QR_CODE: PowerQrCode,
  TELEGRAM: TelegramPower,
  TWITTER: TwitterPower,
  REDIRECT: RedirectPower,
  POAP: () => null,
};

export default function PowerDetailPage() {
  const { data: jubmojis } = useJubmojis();
  const [bookmarked, setBookmarked] = useState(false);

  const router = useRouter();
  const { id: powerId } = router.query;

  const { isLoading: isLoadingPower, data: power = null } = useFetchPowerById(
    powerId as string
  );

  const { data: { locked: powerIsLocked } = { locked: true } } =
    useGetPowerLockedStatus(power?.id);

  if (isLoadingPower) return <PagePlaceholder />;
  if (!power) {
    return (
      <Message centred className="mt-4">
        No power details available.
      </Message>
    );
  }

  const powerIcon = PowerTypeIconMapping[power.powerType];
  const PowerContentByType = PowerTypeContentMapping[power.powerType];

  return (
    <div>
      <AppHeader
        title={
          <button onClick={() => router.back()}>
            <Icons.arrowBack />
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn("h-12", powerIsLocked ? "disabled-element" : "")}
            >
              {powerIcon}
            </div>
            <Card.Title disabled={powerIsLocked} className="!leading-none">
              {power.name}
            </Card.Title>
          </div>
          <div className="flex items-start ml-auto w-6 h-6">
            {/* {powerIsLocked ? (
              <Icons.locked />
            ) : bookmarked ? (
              <Icons.starSolid />
            ) : (
              <Icons.star />
            )} */}
            {powerIsLocked && <Icons.locked />}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-5 px-2">
          <PowerDetailLabel
            label="Quest"
            value={
              <Link
                href={`/quests/${power.quest.id}`}
                className="underline font-dm-sans text-baby-blue-default"
              >
                {power.quest.name}
              </Link>
            }
          />
          <PowerDetailLabel
            label={
              "Collect " +
              getNumCardsToCollect(
                power.proofType,
                power.proofParams
              ).toString()
            }
            value={power.collectionCards?.map(
              (card) => cardPubKeys[card.index].emoji
            )}
          />
          {/* <PowerDetailLabel
            label="Proof"
            value={<PowerLabel>{power.name}</PowerLabel>}
          /> */}
        </div>
        <div className="py-4 px-2">
          <PowerLabel>{power.description}</PowerLabel>
        </div>

        <PowerContentByType power={power} jubmojis={jubmojis || []} />
      </div>
    </div>
  );
}
