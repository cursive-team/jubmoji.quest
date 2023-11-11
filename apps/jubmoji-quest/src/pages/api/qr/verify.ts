import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiQRCodeData } from "@/types";
import {
  jubmojiPowerToProofConfig,
  verifyJubmojiQuestProof,
} from "@/lib/proving";
import { bigIntToHex } from "babyjubjub-ecdsa";
import { getServerPathToCircuits } from "@/lib/config";

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
    const { qrCodeUuid } = req.body;
    const qrCodeData: JubmojiQRCodeData | null = await prisma.qRCode.findUnique(
      {
        where: { uuid: qrCodeUuid },
        include: {
          power: {
            select: {
              id: true,
              name: true,
              description: true,
              eventTitle: true,
              eventLocation: true,
              startTime: true,
              endTime: true,
              powerType: true,
              powerParams: true,
              proofType: true,
              proofParams: true,
              createdAt: true,
              questId: true,
              prerequisiteCards: {
                select: {
                  index: true,
                },
              },
              collectionCards: {
                select: {
                  index: true,
                },
              },
              quest: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  proofType: true,
                  proofParams: true,
                  imageLink: true,
                  prerequisiteCards: {
                    select: {
                      index: true,
                    },
                  },
                  collectionCards: {
                    select: {
                      index: true,
                    },
                  },
                },
              },
            },
          },
        },
      }
    );

    if (!qrCodeData) {
      return res.status(500).json({ message: "QR Code not found" });
    }

    const powerId = qrCodeData.power.id;
    const config = jubmojiPowerToProofConfig(qrCodeData.power);
    const verificationResult = await verifyJubmojiQuestProof({
      config,
      serializedProof: qrCodeData.serializedProof,
      pathToCircuits: getServerPathToCircuits(),
    });
    if (!verificationResult.verified) {
      return res
        .status(200)
        .json({ verified: false, message: "Proof failed to verify!" });
    }

    // Nullifiers are stored as hex in the database
    const consumedSigNullifiers =
      verificationResult.consumedSigNullifiers?.map(bigIntToHex);
    const sigNullifierQueryResult = await prisma.powerSigNullifier.findMany({
      where: {
        powerId,
      },
      select: {
        nullifier: true,
      },
    });
    const previouslyUsedSigNullifiers = sigNullifierQueryResult.map(
      (result) => result.nullifier
    );

    const doubleSpentNullifiers = consumedSigNullifiers?.filter((nullifier) =>
      previouslyUsedSigNullifiers?.includes(nullifier)
    );
    if (doubleSpentNullifiers?.length) {
      return res.status(200).json({
        verified: false,
        message: "Signatures have already been used for this power.",
      });
    }

    const sigNullifiersToAdd = consumedSigNullifiers?.map((nullifier) => {
      return {
        nullifier,
        powerId,
      };
    });

    if (sigNullifiersToAdd && sigNullifiersToAdd.length > 0) {
      await prisma.powerSigNullifier.createMany({
        data: sigNullifiersToAdd,
      });
    }

    res.status(200).json({ verified: true });
  } catch (error) {
    console.log("Error creating QR code:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the QR code." });
  }
}
