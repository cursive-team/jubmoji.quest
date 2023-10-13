import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {
  derDecode,
  hexToBigInt,
  publicKeyFromString,
  verifyEcdsaSignature,
} from "babyjubjub-ecdsa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sig, msgHash, pubKey } = req.body;

  const decodedSig = derDecode(sig);
  const msgHashBigInt = hexToBigInt(msgHash);
  const pubKeyPoint = publicKeyFromString(pubKey);

  const verified = verifyEcdsaSignature(decodedSig, msgHashBigInt, pubKeyPoint);

  const log = await prisma.cardholderLog.create({
    data: {
      signature: sig,
      messageHash: msgHash,
      publicKey: pubKey,
      verified: verified,
    },
  });

  res.status(200).json({ verified: log.verified });
}
