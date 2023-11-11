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

  try {
    const powers: JubmojiPower[] = await prisma.power.findMany({
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

    res.status(200).json(powers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch powers." });
  }
}
