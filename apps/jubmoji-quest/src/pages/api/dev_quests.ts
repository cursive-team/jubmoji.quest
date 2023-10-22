import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Here, we're assuming the body contains the quest details.
      // You should validate these details before attempting to create a quest in your database.

      const {
        name,
        description,
        tags,
        startTime,
        endTime,
        proofType,
        N,
        prerequisiteCardIndices,
        collectionCardIndices,
      } = req.body;

      // Todo: Add random nullifiers
      const sigNullifierRandomness = "abc123";

      // Todo: Need validations for data

      const proofParams: any = {
        sigNullifierRandomness,
      };

      // If the proofType requires an 'N', add it to proofParams
      if (proofType === "N_UNIQUE_IN_COLLECTION" && N) {
        proofParams.N = N;
      }

      const newQuest = await prisma.quest.create({
        data: {
          name,
          description,
          tags,
          startTime,
          endTime,
          proofType,
          proofParams,
          prerequisiteCards: {
            // Assuming you have relation fields set up correctly
            connect: prerequisiteCardIndices.map((index: number) => ({
              index,
            })),
          },
          collectionCards: {
            connect: collectionCardIndices.map((index: number) => ({ index })),
          },
        },
      });

      res.status(201).json(newQuest);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to create quest", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
