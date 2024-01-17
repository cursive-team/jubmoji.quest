import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {
  PublicMessageSignature,
  cardPubKeys,
  createProofInstance,
} from "jubmoji-api";
import { Client, auth } from "twitter-api-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { signedData, rawSig, pubKeyIndex } = req.body;
    const { tweetText, replyId, typeOfTweet } = JSON.parse(signedData);

    try {
      const proofInstance = createProofInstance(PublicMessageSignature, {
        randStr: "",
      });
      const proof = await proofInstance.prove({
        message: signedData,
        rawSig,
        pubKeyIndex,
      });
      const { verified } = await proofInstance.verify(proof);

      if (!verified) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const clubs = await prisma.club.findMany();
      for (const club of clubs) {
        console.log(club.clubName, signedData);
        if (club.clubName !== process.env.TWITTER_CLUBNAME) continue;

        const clubToken = club.serializedTwitterToken;
        if (!clubToken) continue;

        const authClient = new auth.OAuth2User({
          client_id: process.env.TWITTER_CLIENT_ID!,
          client_secret: process.env.TWITTER_CLIENT_SECRET!,
          callback: process.env.TWITTER_CALLBACK_URL!,
          scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
          token: JSON.parse(clubToken),
        });

        const twitterClient = new Client(authClient);
        let postTweet;

        // Add emoji addition
        let finalText = tweetText.toString();
        if (typeOfTweet === "normal-tweet") {
          finalText = `${
            cardPubKeys[pubKeyIndex].emoji
          }: ${tweetText.toString()}`;
        } else if (typeOfTweet === "new-manifestation") {
          finalText = `${
            cardPubKeys[pubKeyIndex].emoji
          } manifested ${tweetText.toString()} !`;
        }

        if (replyId) {
          postTweet = await twitterClient.tweets.createTweet({
            text: finalText,
            reply: {
              in_reply_to_tweet_id: replyId.toString(),
            },
          });
        } else {
          postTweet = await twitterClient.tweets.createTweet({
            text: finalText,
          });
        }

        if (!postTweet || !postTweet.data) {
          return res.status(500).json({ message: "Internal Server Error" });
        }

        await prisma.clubPost.create({
          data: {
            cardIndex: pubKeyIndex,
            tweetId: postTweet.data.id,
            postText: tweetText.toString(),
            typeOfTweet: typeOfTweet.toString(),
            proof: req.body,
            clubName: club.clubName,
          },
        });

        // follow up with verification tweet if it's a reveal
        if (typeOfTweet === "reveal-manifestation") {
          await twitterClient.tweets.createTweet({
            text: `Self-verify this reveal at https://emn178.github.io/online-tools/sha256.html`,
            reply: {
              in_reply_to_tweet_id: postTweet.data.id,
            },
          });
        }

        return res.status(200).json({
          postTweet,
          link: `https://twitter.com/${process.env.TWITTER_CLUBNAME}/status/${postTweet.data.id}`,
        });
      }

      return res.status(404).json({ message: "Club not found" });
    } catch (error) {
      console.error("Error posting tweet:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
