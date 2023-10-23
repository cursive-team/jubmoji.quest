import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { JubmojiPower } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useJubmojis } from "../../hooks/useJubmojis";
import QRCodePower from "@/components/powers/qrCodePower";

export default function PowerDetailPage() {
  const [power, setPower] = useState<JubmojiPower>();
  const { data: jubmojis } = useJubmojis();

  const router = useRouter();
  const { id: powerId } = router.query;

  useEffect(() => {
    const fetchPower = async () => {
      const response = await fetch(`/api/powers/${powerId}`);

      if (!response.ok) {
        // Todo: error handling
        throw new Error(`Could not fetch power ${powerId}.`);
      }
      const data = await response.json();

      setPower(data);
    };

    fetchPower();
  }, [powerId]);

  if (!power) return null;

  return (
    <div>
      <AppHeader
        title={
          <Link href="/">
            <button>
              <Icons.arrowBack />
            </button>
          </Link>
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
