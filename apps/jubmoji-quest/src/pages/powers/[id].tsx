import AppHeader from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { Button } from "@/components/ui/Button";
import { JubmojiPower } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useJubmojis } from "@/hooks/useJubmojis";
import {
  Jubmoji,
  NUniqueJubmojisInCollection,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";
import { Prisma } from "@prisma/client";

export type QRCodePowerProps = {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
};

const QRCodePower = ({ power, jubmojis }: QRCodePowerProps) => {
  const onUsePower = async () => {
    alert("Using power...");

    switch (power.quest.proofType) {
      case $Enums.ProofType.IN_COLLECTION:
        alert("This proof is not implemented!");
        break;
      case $Enums.ProofType.IN_COLLECTION_NONCE:
        alert("This proof is not implemented!");
        break;
      case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
        try {
          const proofParams = power.quest.proofParams as Prisma.JsonObject;
          const collectionCardIndices = power.quest.collectionCards.map(
            (card) => card.index
          );
          const collectionPubKeys = collectionCardIndices.map((index) =>
            getCardPubKeyFromIndex(index)
          );
          const sigNullifierRandomness = power.sigNullifierRandomness
            ? power.sigNullifierRandomness
            : (proofParams.sigNullifierRandomness as string);
          const N = proofParams.N as number;
          const proofClass = createProofInstance(NUniqueJubmojisInCollection, {
            collectionPubKeys,
            N,
            sigNullifierRandomness,
          });

          const proofJubmojis = jubmojis.filter((jubmoji) => {
            return collectionCardIndices.includes(jubmoji.pubKeyIndex);
          });
          const proof = await proofClass.prove({ jubmojis: proofJubmojis });
          const { verified } = await proofClass.verify(proof);

          if (verified) {
            alert("Successfully used your power!");
          } else {
            alert("Failed to use your power!");
          }
        } catch (e) {
          console.error(e);
        }
        break;
      default:
        throw new Error("Invalid proof type!");
    }
  };

  return (
    <div>
      <Button variant="secondary" onClick={onUsePower}>
        Use Power
      </Button>
    </div>
  );
};

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
