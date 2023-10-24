import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { $Enums } from "@prisma/client";
import { useJubmojis } from "../../hooks/useJubmojis";
import QRCodePower from "@/components/powers/qrCodePower";
import { useFetchPowerById } from "@/hooks/useFetchPowers";
import { Placeholder } from "@/components/Placeholder";

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
export default function PowerDetailPage() {
  const { data: jubmojis } = useJubmojis();

  const router = useRouter();
  const { id: powerId } = router.query;

  const { isLoading: isLoadingPower, data: power = null } =
    useFetchPowerById(powerId);

  if (isLoadingPower) return <PagePlaceholder />;
  if (!power) return null;

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
        <PowerCard
          key={power.id}
          title={power.name}
          description={power.description}
          powerType={power.powerType}
        />
        <div>
          <p>{"Power name: " + power.name} </p>
          <p>{"Power description: " + power.description} </p>
          <p>{"Power type: " + power.powerType} </p>
          <p>
            {"Unlocked from quest: "}
            <Link href={"/quests/" + power.quest.id} className="underline">
              {power.quest.name}
            </Link>
          </p>
        </div>

        {power.powerType === $Enums.PowerType.QR_CODE && (
          <QRCodePower power={power} jubmojis={jubmojis || []} />
        )}
      </div>
    </div>
  );
}
