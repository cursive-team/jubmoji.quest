import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiCollectionCard } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const cards: JubmojiCollectionCard[] = await prisma.card.findMany({
      include: {
        prerequisitesFor: {
          select: {
            id: true,
            name: true,
            description: true,
            startTime: true,
            endTime: true,
          },
        },
        collectsFor: {
          select: {
            id: true,
            name: true,
            description: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    return res.status(200).json(cards);
  } catch (error) {
    console.error("Error getting cards:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
