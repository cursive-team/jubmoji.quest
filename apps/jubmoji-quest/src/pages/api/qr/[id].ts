import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { JubmojiQRCodeData } from "@/types";

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
    const qrCodeData: JubmojiQRCodeData | null = await prisma.qRCode.findUnique(
      {
        where: { uuid: id as string },
        include: {
          power: {
            select: {
              id: true,
              name: true,
              description: true,
              startTime: true,
              endTime: true,
              sigNullifierRandomness: true,
              powerType: true,
              powerParams: true,
              questId: true,
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

    res.status(200).json(qrCodeData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
