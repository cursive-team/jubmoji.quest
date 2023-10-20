import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const powers = await prisma.power.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          startTime: true,
          endTime: true,
          powerType: true,
          powerParams: true,
          questId: true,
        },
      });
      return res.status(200).json(powers);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching powers" });
    }
  }

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

    try {
      const newPower = await prisma.power.create({
        data: {
          name,
          description,
          startTime,
          endTime,
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

  // Handle any other HTTP method
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
