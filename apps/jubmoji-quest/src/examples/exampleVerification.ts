import {
  NUniqueJubmojiInCollectionProof,
  NUniqueJubmojisInCollection,
  createProofInstance,
} from "jubmoji-api";

/**
 * Demonstrates how to verify a proof from a URL.
 * collectionPubKeys, sigNullifierRandomness, N are obtained from your specific quest.
 * You must copy the verification key from https://github.com/jubmoji/jubmoji.quest/tree/main/apps/jubmoji-quest/public/circuits and set its path to pathToCircuits.
 * @param urlEncodedProof - URL-encoded proof passed in 'proof' query parameter
 * @param collectionPubKeys - Public keys of cards in the collection from https://github.com/jubmoji/jubmoji.quest/blob/main/packages/jubmoji-api/src/data/cardPubKeys.ts
 * @param sigNullifierRandomness - Randomness used to generate unique signature nullifiers
 * @param N - Number of unique cards a user must have Jubmojis from
 * @param pathToCircuits - Path to the circuits directory
 * @returns True if proof is valid, false otherwise
 */
export const urlVerification = async (
  urlEncodedProof: string,
  collectionPubKeys: string[],
  sigNullifierRandomness: string,
  N: number,
  pathToCircuits: string
): Promise<boolean> => {
  const decodedProof = JSON.parse(
    decodeURIComponent(urlEncodedProof)
  ) as NUniqueJubmojiInCollectionProof;

  const proofInstance = createProofInstance(NUniqueJubmojisInCollection, {
    collectionPubKeys,
    sigNullifierRandomness,
    N,
    pathToCircuits,
  });

  const { verified, consumedSigNullifiers } = await proofInstance.verify(
    decodedProof
  );
  if (!verified) {
    return false;
  }

  // TODO: Check that consumedSigNullifiers have not been used before

  // TODO: Update nullifier list with consumedSigNullifiers

  return true;
};
