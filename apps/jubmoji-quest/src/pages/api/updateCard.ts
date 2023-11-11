import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PublicMessageSignature, createProofInstance } from "jubmoji-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { updateData, rawSig, pubKeyIndex } = req.body;

    const { meaning, telegramLink, website } = JSON.parse(updateData);

    try {
      const proofInstance = createProofInstance(PublicMessageSignature, {
        randStr: "",
      });
      const proof = await proofInstance.prove({
        message: updateData,
        rawSig,
        pubKeyIndex,
      });
      const { verified } = await proofInstance.verify(proof);

      if (!verified) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        if (website !== "") {
          await prisma.card.update({
            where: {
              index: pubKeyIndex,
            },
            data: {
              name: meaning,
              telegramChatInviteLink: telegramLink,
              websiteLink: website,
            },
          });
        } else {
          await prisma.card.update({
            where: {
              index: pubKeyIndex,
            },
            data: {
              name: meaning,
              telegramChatInviteLink: telegramLink,
            },
          });
        }
      }

      return res.status(200).json({ message: "Card updated successfully" });
    } catch (error) {
      console.error("Error updating a card:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
