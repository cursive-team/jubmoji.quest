import { JubmojiQuest } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma, $Enums } from "@prisma/client";
import { LeaderboardProof } from "jubmoji-api";
import {
  areAllBigIntsDifferent,
  bigIntToHex,
  deserializeMembershipProof,
  getPublicSignalsFromMembershipZKP,
} from "babyjubjub-ecdsa";
import { verifyJubmojiQuestProof } from "@/lib/proving";
import { getServerPathToCircuits } from "@/lib/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get endpoint is used for fetching leaderboard data for a specific quest
  if (req.method === "GET") {
    const { questId } = req.query;

    const leaderboardNullifiers = await prisma.leaderboardNullifiers.findMany({
      where: { questId: Number(questId) },
      select: { pubKeyNullifierRandomnessHash: true },
    });

    // Count the number of times each user has submitted a valid signature
    const userKeyToCount = new Map<string, number>();
    leaderboardNullifiers.forEach((nullifier) => {
      const { pubKeyNullifierRandomnessHash } = nullifier;
      if (userKeyToCount.has(pubKeyNullifierRandomnessHash)) {
        userKeyToCount.set(
          pubKeyNullifierRandomnessHash,
          userKeyToCount.get(pubKeyNullifierRandomnessHash)! + 1
        );
      } else {
        userKeyToCount.set(pubKeyNullifierRandomnessHash, 1);
      }
    });

    const leaderboardPseudonyms = await prisma.leaderboardPseudonym.findMany({
      where: { questId: Number(questId) },
      select: { pseudonym: true, pubKeyNullifierRandomnessHash: true },
    });

    const pseudonymMap = leaderboardPseudonyms.reduce(
      (map, { pseudonym, pubKeyNullifierRandomnessHash }) => {
        map[pubKeyNullifierRandomnessHash] = pseudonym;
        return map;
      },
      {} as Record<string, string>
    );

    return res
      .status(200)
      .json({ scoreMap: Object.fromEntries(userKeyToCount), pseudonymMap });

    // Post endpoint is used for submitting a leaderboard proof
    // Will return a 200 only if proof is successful, and will return parameter
    // scoreAdded equal to the number of points added to the user's score
  } else if (req.method === "POST") {
    try {
      const { questId, serializedProof, pseudonym, proofGenerationTime } =
        req.body;

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
              proofType: true,
              proofParams: true,
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
            },
          },
        },
      });

      if (!quest) {
        return res.status(500).json({ message: "Quest not found" });
      }

      if (quest.proofType !== $Enums.ProofType.LEADERBOARD) {
        return res.status(500).json({ message: "Invalid proof type" });
      }

      const currentTime = new Date();
      if (quest.endTime && currentTime > quest.endTime) {
        return res.status(500).json({ message: "Quest has ended" });
      }

      let startProofTime = performance.now();
      const { verified, consumedSigNullifiers } = await verifyJubmojiQuestProof(
        {
          config: {
            ...quest,
            proofParams: quest.proofParams as Prisma.JsonObject,
          },
          serializedProof,
          pathToCircuits: getServerPathToCircuits(),
        }
      );
      let endProofTime = performance.now();
      let proofTime = endProofTime - startProofTime;
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

      const leaderboardProof = JSON.parse(serializedProof) as LeaderboardProof;
      const { serializedMembershipProofs } = leaderboardProof;
      const membershipProofs = serializedMembershipProofs.map(
        deserializeMembershipProof
      );
      const pubKeyNullifierRandomnessHash = bigIntToHex(
        getPublicSignalsFromMembershipZKP(membershipProofs[0].zkp)
          .pubKeyNullifierRandomnessHash
      );
      const previouslyUsedSigNullifiers =
        await prisma.leaderboardNullifiers.findMany({
          where: {
            questId: Number(questId),
          },
        });
      const previouslyUsedPubKeyNullifiers =
        await prisma.leaderboardNullifiers.findMany({
          where: {
            questId: Number(questId),
            pubKeyNullifierRandomnessHash,
          },
        });

      const newlyConsumedNullifiers: {
        pubKeyNullifier: string;
        pubKeyNullifierRandomnessHash: string;
        sigNullifier: string;
      }[] = [];
      for (const membershipProof of membershipProofs) {
        const { pubKeyNullifier, pubKeyNullifierRandomnessHash, sigNullifier } =
          getPublicSignalsFromMembershipZKP(membershipProof.zkp);
        // Check that the sig hasn't been used for this quest and that the public key is unique for this user
        if (
          !previouslyUsedSigNullifiers.find(
            (n) => n.sigNullifier === bigIntToHex(sigNullifier)
          ) &&
          !previouslyUsedPubKeyNullifiers.find(
            (n) => n.pubKeyNullifier === bigIntToHex(pubKeyNullifier)
          )
        ) {
          newlyConsumedNullifiers.push({
            pubKeyNullifier: bigIntToHex(pubKeyNullifier),
            pubKeyNullifierRandomnessHash: bigIntToHex(
              pubKeyNullifierRandomnessHash
            ),
            sigNullifier: bigIntToHex(sigNullifier),
          });
        }
      }
      if (newlyConsumedNullifiers.length === 0) {
        return res
          .status(500)
          .json({ message: "All the submitted signatures have been used" });
      }

      // Add score to leaderboard
      const scoreAdded = newlyConsumedNullifiers.length;
      await prisma.leaderboardNullifiers.createMany({
        data: newlyConsumedNullifiers.map(
          ({
            pubKeyNullifier,
            pubKeyNullifierRandomnessHash,
            sigNullifier,
          }) => ({
            pubKeyNullifier,
            pubKeyNullifierRandomnessHash,
            sigNullifier,
            questId: Number(questId),
          })
        ),
      });

      // Update user pseudonym
      if (pseudonym) {
        const pseudonymQueryResult = await prisma.leaderboardPseudonym.findMany(
          {
            where: {
              pubKeyNullifierRandomnessHash,
              questId: Number(questId),
            },
          }
        );
        if (pseudonymQueryResult.length === 1) {
          await prisma.leaderboardPseudonym.update({
            where: {
              id: pseudonymQueryResult[0].id,
            },
            data: {
              pseudonym,
            },
          });
        } else {
          await prisma.leaderboardPseudonym.create({
            data: {
              pseudonym,
              pubKeyNullifierRandomnessHash,
              questId: Number(questId),
            },
          });
        }
      }

      // Log client side proof timing
      try {
        await prisma.leaderboardProofLog.create({
          data: {
            isVerificationLog: false,
            proofCount: serializedMembershipProofs.length,
            proofTime: proofGenerationTime,
            questId: Number(questId),
          },
        });
      } catch (e) {
        console.log("Error logging client proof timimg: ", e);
      }

      // Log server side proof verification
      try {
        await prisma.leaderboardProofLog.create({
          data: {
            isVerificationLog: true,
            proofCount: serializedMembershipProofs.length,
            verifiedProofCount: newlyConsumedNullifiers.length,
            proofTime: proofTime,
            questId: Number(questId),
          },
        });
      } catch (e) {
        console.log("Error logging server proof timimg: ", e);
      }

      return res.status(200).json({ scoreAdded });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error submitting leaderboard score" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
