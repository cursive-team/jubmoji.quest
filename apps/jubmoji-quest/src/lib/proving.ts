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

export const createJubmojiPowerProof = async (
  power: JubmojiPower,
  jubmojis: Jubmoji[]
): Promise<string> => {
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
  const proofJubmojis = jubmojis.filter((jubmoji) => {
    return collectionCardIndices.includes(jubmoji.pubKeyIndex);
  });

  let proof; // We create proof classes different from the above helper in that they don't use path to circuits for client proving
  switch (power.quest.proofType) {
    case $Enums.ProofType.IN_COLLECTION:
      const jubmojiInCollectionProof = createProofInstance(
        JubmojiInCollection,
        {
          collectionPubKeys,
          sigNullifierRandomness,
        }
      );

      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proof = await jubmojiInCollectionProof.prove({
        jubmoji: proofJubmojis[0],
      });
      break;
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      const jubmojiInCollectionWithNonceProof = createProofInstance(
        JubmojiInCollectionWithNonce,
        {
          collectionPubKeys,
          sigNullifierRandomness,
        }
      );

      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proof = await jubmojiInCollectionWithNonceProof.prove({
        jubmoji: proofJubmojis[0],
      });
      break;
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      const N = proofParams.N as number;
      const nUniqueJubmojisInCollectionProof = createProofInstance(
        NUniqueJubmojisInCollection,
        {
          collectionPubKeys,
          N,
          sigNullifierRandomness,
          pathToCircuits: PATH_TO_CIRCUITS,
        }
      );

      proof = await nUniqueJubmojisInCollectionProof.prove({
        jubmojis: proofJubmojis,
      });
      break;
    default:
      throw new Error("Invalid proof type.");
  }

  return JSON.stringify(proof);
};

export const verifyJubmojiPowerProof = async (
  power: JubmojiPower,
  serializedProof: string
): Promise<VerificationResult> => {
  const proof = JSON.parse(serializedProof);
  const proofClass = createProofInstanceFromJubmojiPower(power);

  return await proofClass.verify(proof);
};
