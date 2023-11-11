import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiPower } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { id } = req.query;

  try {
    const power: JubmojiPower | null = await prisma.power.findUnique({
      where: { id: Number(id) },
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
      return res.status(404).json({ message: "Power not found" });
    }

    res.status(200).json(power);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
