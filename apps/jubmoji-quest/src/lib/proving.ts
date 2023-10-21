import { JubmojiPower } from "@/types";
import { Prisma, $Enums } from "@prisma/client";
import { VerificationResult } from "babyjubjub-ecdsa";
import {
  JubmojiInCollection,
  JubmojiInCollectionWithNonce,
  NUniqueJubmojisInCollection,
  ProofClass,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";

// Use circuits in public folder for prover and verified
export const PATH_TO_CIRCUITS = "public/circuits/";

export const createProofInstanceFromJubmojiPower = (
  power: JubmojiPower
): ProofClass<any, any> => {
  const proofParams = power.quest.proofParams as Prisma.JsonObject;
  const collectionCardIndices = power.quest.collectionCards.map(
    (card) => card.index
  );
  const collectionPubKeys = collectionCardIndices.map((index) =>
    getCardPubKeyFromIndex(index)
  );
  const sigNullifierRandomness = power.sigNullifierRandomness
    ? power.sigNullifierRandomness
    : (proofParams.sigNullifierRandomness as string);

  switch (power.quest.proofType) {
    case $Enums.ProofType.IN_COLLECTION:
      return createProofInstance(JubmojiInCollection, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits: PATH_TO_CIRCUITS,
      });
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      return createProofInstance(JubmojiInCollectionWithNonce, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits: PATH_TO_CIRCUITS,
      });
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      const N = proofParams.N as number;

      return createProofInstance(NUniqueJubmojisInCollection, {
        collectionPubKeys,
        N,
        sigNullifierRandomness,
        pathToCircuits: PATH_TO_CIRCUITS,
      });
    default:
      throw new Error("Invalid proof type.");
  }
};

export const verifyJubmojiPowerProof = async (
  power: JubmojiPower,
  serializedProof: string
): Promise<VerificationResult> => {
  const proof = JSON.parse(serializedProof);
  const proofClass = createProofInstanceFromJubmojiPower(power);

  return await proofClass.verify(proof);
};
