import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiQuest } from "@/types";

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
    const quest: JubmojiQuest | null = await prisma.quest.findUnique({
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
        powers: {
          select: {
            id: true,
            name: true,
            description: true,
            powerType: true,
            proofType: true,
            proofParams: true,
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

    if (!quest) {
      return res.status(500).json({ message: "Quest not found" });
    }

    res.status(200).json(quest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
