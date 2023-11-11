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

  try {
    const quests: JubmojiQuest[] = await prisma.quest.findMany({
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

    res.status(200).json(quests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch quests." });
  }
}
