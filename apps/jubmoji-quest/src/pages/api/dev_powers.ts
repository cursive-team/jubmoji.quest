import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getRandomNullifierRandomness } from "jubmoji-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      password,
      name,
      description,
      startTime,
      endTime,
      powerType,
      redirectUrl,
      questId,
    } = req.body;

    if (password !== process.env.DEV_CONSOLE_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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

    const sigNullifierRandomness = getRandomNullifierRandomness();

    const powerParams = powerType === "REDIRECT" ? { redirectUrl } : {};

    try {
      const newPower = await prisma.power.create({
        data: {
          name,
          description,
          startTime,
          endTime,
          sigNullifierRandomness,
          powerType,
          powerParams,
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
