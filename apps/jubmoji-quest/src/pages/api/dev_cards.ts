import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { index, name, description, owner } = req.body;

    try {
      // Todo: Need validations for data

      const newCard = await prisma.card.create({
        data: {
          index,
          name,
          description,
          owner,
        },
      });
      return res.status(201).json(newCard);
    } catch (error) {
      console.error("Error creating a card:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
