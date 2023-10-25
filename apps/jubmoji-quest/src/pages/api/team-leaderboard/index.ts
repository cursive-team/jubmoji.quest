import { JubmojiQuest } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma, $Enums } from "@prisma/client";
import path from "path";
import {
  TeamLeaderboard,
  TeamLeaderboardProof,
  cardPubKeys,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";
import { areAllBigIntsDifferent, bigIntToHex } from "babyjubjub-ecdsa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get endpoint is used for fetching team leaderboard data for a specific quest
  if (req.method === "GET") {
    const { questId } = req.query;

    const teamLeaderboardNullifiers =
      await prisma.teamLeaderboardNullifiers.findMany({
        where: { questId: Number(questId) },
        select: { teamPubKeyIndex: true },
      });

    // Count the number of times each team has submitted a valid signature
    const teamPubKeyIndexToCount = new Map<number, number>();
    teamLeaderboardNullifiers.forEach((nullifier) => {
      const { teamPubKeyIndex } = nullifier;
      if (teamPubKeyIndexToCount.has(teamPubKeyIndex)) {
        teamPubKeyIndexToCount.set(
          teamPubKeyIndex,
          teamPubKeyIndexToCount.get(teamPubKeyIndex)! + 1
        );
      } else {
        teamPubKeyIndexToCount.set(teamPubKeyIndex, 1);
      }
    });

    return res
      .status(200)
      .json({ scoreMap: Object.fromEntries(teamPubKeyIndexToCount) });

    // Post endpoint is used for submitting a team leaderboard proof
    // Will return a 200 only if proof is successful, and will return parameter
    // scoreAdded equal to the number of points added to the team's score
  } else if (req.method === "POST") {
    try {
      const { questId, serializedProof } = req.body;

      const quest: JubmojiQuest | null = await prisma.quest.findUnique({
        where: { id: Number(questId) },
        include: {
          prerequisiteCards: {
            select: {
              index: true,
            },
          },
          collectionCards: {
            select: {
              index: true,
            },
          },
          powers: {
            select: {
              id: true,
              name: true,
              description: true,
              powerType: true,
            },
          },
        },
      });

      if (!quest) {
        return res.status(500).json({ message: "Quest not found" });
      }

      if (quest.proofType !== $Enums.ProofType.TEAM_LEADERBOARD) {
        return res.status(500).json({ message: "Invalid proof type" });
      }

      const proofParams = quest.proofParams as Prisma.JsonObject;
      const teamPubKeys = quest.prerequisiteCards.map((card) =>
        getCardPubKeyFromIndex(card.index)
      );
      const collectionPubKeys = quest.collectionCards.map((card) =>
        getCardPubKeyFromIndex(card.index)
      );
      const sigNullifierRandomness =
        proofParams.sigNullifierRandomness as string;
      const pathToCircuits =
        path.resolve(process.cwd(), "./public") + "/circuits/";
      const teamLeaderboardProofClass = createProofInstance(TeamLeaderboard, {
        teamPubKeys,
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
      });

      const teamLeaderboardProof = JSON.parse(
        serializedProof
      ) as TeamLeaderboardProof;
      const { verified, consumedSigNullifiers } =
        await teamLeaderboardProofClass.verify(teamLeaderboardProof);
      if (!verified) {
        return res.status(500).json({ message: "Proof not verified" });
      }
      if (!consumedSigNullifiers) {
        return res
          .status(500)
          .json({ message: "Invalid signature nullifiers" });
      }
      if (!areAllBigIntsDifferent(consumedSigNullifiers)) {
        return res
          .status(500)
          .json({ message: "Do not provide multiple of the same signature" });
      }

      const teamCardPubKeyIndex = cardPubKeys.findIndex(
        (card) => card.pubKeyJub === teamLeaderboardProof.teamPubKey
      );
      if (teamCardPubKeyIndex === -1) {
        return res.status(500).json({ message: "Invalid team public key" });
      }

      const consumedSigNullifiersHex = consumedSigNullifiers.map(bigIntToHex);
      const previouslyUsedSigNullifiers =
        await prisma.teamLeaderboardNullifiers.findMany({
          where: {
            questId: Number(questId),
          },
        });

      const newlyConsumedSigNullifiers = consumedSigNullifiersHex.filter(
        (nullifier) =>
          !previouslyUsedSigNullifiers.find(
            (usedNullifier) => usedNullifier.sigNullifier === nullifier
          )
      );
      if (newlyConsumedSigNullifiers.length === 0) {
        return res
          .status(500)
          .json({ message: "All the submitted signatures have been used" });
      }

      const scoreAdded = newlyConsumedSigNullifiers.length;
      await prisma.teamLeaderboardNullifiers.createMany({
        data: newlyConsumedSigNullifiers.map((nullifier) => ({
          teamPubKeyIndex: teamCardPubKeyIndex,
          sigNullifier: nullifier,
          questId: Number(questId),
        })),
      });

      return res.status(200).json({ scoreAdded });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error submitting team leaderboard score" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
