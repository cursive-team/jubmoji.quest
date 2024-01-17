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

  const { code, state, name, error } = req.query ?? ({} as any);

  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID!,
    client_secret: process.env.TWITTER_CLIENT_SECRET!,
    callback: process.env.TWITTER_CALLBACK_URL!,
    scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
  });

  if (error) {
    // they didn't accept the permissions
    res.redirect("/");
  }

  if (!code && name) {
    // Redirect to Twitter OAuth Page, pass club name through state because of
    // serverless setup
    res.redirect(
      authClient.generateAuthURL({
        state: name.toString(),
        code_challenge: "challenge",
        code_challenge_method: "plain",
      })
    );
  } else if (code && state) {
    // Initialize correct default challenge in authClient
    authClient.generateAuthURL({
      state: state.toString(),
      code_challenge: "challenge",
      code_challenge_method: "plain",
    });

    // They were sent back from OAuth page, so we register their token
    const { token } = await authClient.requestAccessToken(code as string);

    const newClub = await prisma.club.create({
      data: {
        clubName: state.toString(),
        serializedTwitterToken: JSON.stringify(token),
      },
    });

    res.status(200).json({ newClub });
  }
}
