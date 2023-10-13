import { NextApiRequest, NextApiResponse } from "next";
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

  res.status(200).json({ verified });
}
