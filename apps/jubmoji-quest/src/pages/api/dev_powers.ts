import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, startTime, endTime, powerType, questId } =
      req.body;

    console.log(req.body);

    if (
      !name ||
      !description ||
      !startTime ||
      !endTime ||
      !powerType ||
      !questId
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // Todo: Need validations for data

    // Todo: Generate random nullifiers
    const sigNullifierRandomness = "0ab123420";

    try {
      const newPower = await prisma.power.create({
        data: {
          name,
          description,
          startTime,
          endTime,
          sigNullifierRandomness,
          powerType,
          powerParams: {},
          questId,
        },
      });
      return res.status(201).json(newPower);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error creating power" });
    }
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
