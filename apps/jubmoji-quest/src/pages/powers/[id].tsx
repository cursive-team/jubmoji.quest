import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard, PowerTypeIconMapping } from "@/components/cards/PowerCard";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { $Enums } from "@prisma/client";
import { useJubmojis } from "../../hooks/useJubmojis";
import { useFetchPowerById } from "@/hooks/useFetchPowers";
import { Placeholder } from "@/components/Placeholder";
import { Card } from "@/components/cards/Card";
import { classed } from "@tw-classed/react";
import { PowerQrCode } from "@/components/powers/PowerQrCode";

interface PowerDetailLabelProps {
  label: string;
  value: ReactNode;
}

const PagePlaceholder = () => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="py-3">
        <Placeholder.Base className="w-4 h-4" />
      </div>
      <Placeholder.Card size="md" />
      <Placeholder.Card size="xs" />
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

export default function PowerDetailPage() {
  const { data: jubmojis } = useJubmojis();
  const [bookmarked, setBookmarked] = React.useState(false);

  const router = useRouter();
  const { id: powerId } = router.query;

  const { isLoading: isLoadingPower, data: power = null } = useFetchPowerById(
    powerId as string
  );

  if (isLoadingPower) return <PagePlaceholder />;
  if (!power) return null;

  const powerIcon = PowerTypeIconMapping[power.powerType];

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
            <div className="h-12">{powerIcon}</div>
            <Card.Title className="!leading-none">{power.name}</Card.Title>
          </div>
          <div className="flex items-start ml-auto w-6 h-6">
            {bookmarked ? <Icons.starSolid /> : <Icons.star />}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-5">
          <PowerDetailLabel
            label="Quest"
            value={
              <Link
                href={`/quests/${power.quest.id}`}
                className="underline text-baby-blue-default"
              >
                {power.quest.name}
              </Link>
            }
          />
          <PowerDetailLabel
            label="Proof"
            value={<PowerLabel>{power.name}</PowerLabel>}
          />
        </div>
        <div className="py-4">
          <PowerLabel>{power.description}</PowerLabel>
        </div>

        {power.powerType === $Enums.PowerType.QR_CODE && (
          <PowerQrCode power={power} jubmojis={jubmojis || []} />
        )}
      </div>
    </div>
  );
}
