import { JubmojiPower } from "@/types";
import { Prisma, $Enums } from "@prisma/client";
import { VerificationResult } from "babyjubjub-ecdsa";
import {
  Jubmoji,
  JubmojiInCollection,
  JubmojiInCollectionWithNonce,
  NUniqueJubmojisInCollection,
  ProofClass,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";

// Use circuits in public folder for prover and verified
export const SERVER_PATH_TO_CIRCUITS = "public/circuits/";

export const createProofInstanceFromJubmojiPower = (
  power: JubmojiPower,
  pathToCircuits?: string
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
        pathToCircuits,
      });
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      return createProofInstance(JubmojiInCollectionWithNonce, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
      });
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      const N = proofParams.N as number;
      return createProofInstance(NUniqueJubmojisInCollection, {
        collectionPubKeys,
        N,
        sigNullifierRandomness,
        pathToCircuits,
      });
    default:
      throw new Error("Invalid proof type.");
  }
};

export const createJubmojiPowerProof = async (
  power: JubmojiPower,
  jubmojis: Jubmoji[],
  pathToCircuits?: string
): Promise<string> => {
  const proofClass = createProofInstanceFromJubmojiPower(power, pathToCircuits);
  const collectionCardIndices = power.quest.collectionCards.map(
    (card) => card.index
  );
  const proofJubmojis = jubmojis.filter((jubmoji) => {
    return collectionCardIndices.includes(jubmoji.pubKeyIndex);
  });

  let proofArgs;
  switch (power.quest.proofType) {
    case $Enums.ProofType.IN_COLLECTION:
      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proofArgs = {
        jubmoji: proofJubmojis[0],
      };
      break;
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proofArgs = {
        jubmoji: proofJubmojis[0],
      };
      break;
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      proofArgs = {
        jubmojis: proofJubmojis,
      };
      break;
    default:
      throw new Error("Invalid proof type.");
  }

  const proof = await proofClass.prove(proofArgs);
  return JSON.stringify(proof);
};

export const verifyJubmojiPowerProof = async (
  power: JubmojiPower,
  serializedProof: string,
  pathToCircuits?: string
): Promise<VerificationResult> => {
  const proof = JSON.parse(serializedProof);
  const proofClass = createProofInstanceFromJubmojiPower(power, pathToCircuits);

  return await proofClass.verify(proof);
};
