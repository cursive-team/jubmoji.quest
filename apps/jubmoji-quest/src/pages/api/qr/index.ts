import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiPower } from "@/types";
import { Prisma, $Enums } from "@prisma/client";
import {
  JubmojiInCollection,
  JubmojiInCollectionWithNonce,
  NUniqueJubmojisInCollection,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { powerId, serializedProof } = req.body;

    const power: JubmojiPower | null = await prisma.power.findUnique({
      where: { id: Number(powerId) },
      include: {
        quest: {
          select: {
            id: true,
            name: true,
            description: true,
            proofType: true,
            proofParams: true,
            collectionCards: {
              select: {
                index: true,
              },
            },
          },
        },
      },
    });

    if (!power) {
      res.status(500).json({ error: "Power not found." });
      return;
    }

    const proof = JSON.parse(serializedProof);
    const pathToCircuits = "public/circuits/";

    let verified = false;
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
            pathToCircuits,
          });

          const verificationResult = await proofClass.verify(proof);
          verified = verificationResult.verified;
        } catch (error) {
          console.error("Error verifying proof:", error);
          return res.status(500).json({ error: "Error verifying proof." });
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
            pathToCircuits,
          });

          const verificationResult = await proofClass.verify(proof);
          verified = verificationResult.verified;
        } catch (error) {
          console.error("Error verifying proof:", error);
          return res.status(500).json({ error: "Error verifying proof." });
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
            pathToCircuits,
          });

          const verificationResult = await proofClass.verify(proof);
          verified = verificationResult.verified;
        } catch (error) {
          console.error("Error verifying proof:", error);
          return res.status(500).json({ error: "Error verifying proof." });
        }
        break;
      default:
        return res.status(500).json({ error: "Invalid proof type." });
    }

    if (!verified) {
      return res.status(500).json({ error: "Proof not verified." });
    }

    const newQRCode = await prisma.qRCode.create({
      data: {
        serializedProof,
        powerId,
      },
    });

    res.status(200).json({ qrCodeUuid: newQRCode.uuid });
  } catch (error) {
    console.error("Error creating QR code:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the QR code." });
  }
}
