import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getRandomNullifierRandomness } from "jubmoji-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Here, we're assuming the body contains the quest details.
      // You should validate these details before attempting to create a quest in your database.

      const {
        password,
        name,
        description,
        startTime,
        endTime,
        isOfficial,
        isAlwaysVisible,
        proofType,
        N,
        prerequisiteCardIndices,
        collectionCardIndices,
      } = req.body;

      if (password !== process.env.DEV_CONSOLE_PASSWORD) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Todo: Need validations for data

      const sigNullifierRandomness = getRandomNullifierRandomness();
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
          startTime,
          endTime,
          isOfficial,
          isAlwaysVisible,
          proofType,
          proofParams,
          prerequisiteCards: {
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
