import AppHeader from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { Button } from "@/components/ui/Button";
import { JubmojiPower } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Prisma, $Enums } from "@prisma/client";
import { useJubmojis } from "@/hooks/useJubmojis";
import {
  Jubmoji,
  JubmojiInCollection,
  JubmojiInCollectionWithNonce,
  NUniqueJubmojisInCollection,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";
import QRCode from "react-qr-code";

export type QRCodePowerProps = {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
};

const QRCodePower = ({ power, jubmojis }: QRCodePowerProps) => {
  const [url, setUrl] = useState<string>();

  const onUsePower = async () => {
    alert("Using power...");

    let serializedProof;
    switch (power.quest.proofType) {
      case $Enums.ProofType.IN_COLLECTION:
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

          const proofClass = createProofInstance(JubmojiInCollection, {
            collectionPubKeys,
            sigNullifierRandomness,
          });

          const proofJubmojis = jubmojis.filter((jubmoji) => {
            return collectionCardIndices.includes(jubmoji.pubKeyIndex);
          });
          if (proofJubmojis.length === 0) {
            alert("You don't have any Jubmojis in this quest!");
            return;
          }
          const proof = await proofClass.prove({ jubmoji: proofJubmojis[0] });

          const { verified } = await proofClass.verify(proof);
          if (!verified) {
            alert("Failed to use your power!");
            return;
          }

          serializedProof = JSON.stringify(proof);
        } catch (e) {
          console.error(e);
          alert("Failed to use your power!");
          return;
        }
        break;
      case $Enums.ProofType.IN_COLLECTION_NONCE:
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

          const proofClass = createProofInstance(JubmojiInCollectionWithNonce, {
            collectionPubKeys,
            sigNullifierRandomness,
          });

          const proofJubmojis = jubmojis.filter((jubmoji) => {
            return collectionCardIndices.includes(jubmoji.pubKeyIndex);
          });
          if (proofJubmojis.length === 0) {
            alert("You don't have any Jubmojis in this quest!");
            return;
          }
          const proof = await proofClass.prove({ jubmoji: proofJubmojis[0] });

          const { verified } = await proofClass.verify(proof);
          if (!verified) {
            alert("Failed to use your power!");
            return;
          }

          serializedProof = JSON.stringify(proof);
        } catch (e) {
          console.error(e);
          alert("Failed to use your power!");
          return;
        }
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
          if (!verified) {
            alert("Failed to use your power!");
            return;
          }

          serializedProof = JSON.stringify(proof);
        } catch (e) {
          console.error(e);
          alert("Failed to use your power!");
          return;
        }
        break;
      default:
        alert("Invalid proof type!");
        return;
    }

    const response = await fetch(`/api/qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        powerId: power.id,
        serializedProof,
      }),
    });

    if (!response.ok) {
      alert("Failed to use your power!");
      return;
    }

    const { qrCodeUuid } = await response.json();
    setUrl(`${window.location.origin}/qr/${qrCodeUuid}`);
  };

  if (!url) {
    return (
      <div>
        <Button variant="secondary" onClick={onUsePower}>
          Use Power
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}
    >
      <QRCode
        size={512}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 512 512`}
      />
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
