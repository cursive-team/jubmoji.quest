import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { ClubPost } from "@prisma/client";

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
    const posts: ClubPost[] = await prisma.clubPost.findMany({
      where: {
        typeOfTweet: "new-manifestation",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch club posts." });
  }
}
