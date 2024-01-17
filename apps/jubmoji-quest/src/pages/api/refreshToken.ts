import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "twitter-api-sdk";
import prisma from "@/lib/prisma";

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
    const clubs = await prisma.club.findMany();
    for (const club of clubs) {
      const clubToken = club.serializedTwitterToken;
      if (!clubToken) continue;

      const authClient = new auth.OAuth2User({
        client_id: process.env.TWITTER_CLIENT_ID!,
        client_secret: process.env.TWITTER_CLIENT_SECRET!,
        callback: process.env.TWITTER_CALLBACK_URL!,
        scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
        token: JSON.parse(clubToken),
      });

      const newToken = await authClient.refreshAccessToken();

      await prisma.club.update({
        where: {
          clubName: club.clubName,
        },
        data: {
          serializedTwitterToken: JSON.stringify(newToken.token),
          updatedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to refresh tokens." });
  }

  res.status(200).json({ message: "Tokens refreshed" });
}
