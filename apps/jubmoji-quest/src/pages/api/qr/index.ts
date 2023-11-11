import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiPower } from "@/types";
import {
  jubmojiPowerToProofConfig,
  verifyJubmojiQuestProof,
} from "@/lib/proving";
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
    const { powerId, serializedProof } = req.body;

    const power: JubmojiPower | null = await prisma.power.findUnique({
      where: { id: Number(powerId) },
      include: {
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
    });

    if (!power) {
      res.status(500).json({ error: "Power not found." });
      return;
    }

    const config = jubmojiPowerToProofConfig(power);
    const { verified } = await verifyJubmojiQuestProof({
      config,
      serializedProof,
      pathToCircuits: getServerPathToCircuits(),
    });
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
    console.log("Error creating QR code:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the QR code." });
  }
}
