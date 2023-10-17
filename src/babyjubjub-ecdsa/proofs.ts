import {
  EdwardsPoint,
  MembershipProof,
  Signature,
  areAllBigIntsDifferent,
  areAllBigIntsTheSame,
  batchVerifyMembership,
  derDecodeSignature,
  getPublicSignalsFromMembershipZKP,
  proveMembership,
  publicKeyFromString,
  verifyEcdsaSignature,
  verifyMembership,
} from "babyjubjub-ecdsa";
import { getMerkleProofFromCache, getMerkleRootFromCache } from "./merkle";
import {
  recoverArbitraryMessageHash,
  recoverCounterMessageHash,
} from "@/lib/dev_util/signature";
import { Jubmoji } from "@/lib/dev_types";
import {
  getCardPubKeyFromIndex,
  getRandomNullifierRandomness,
} from "@/lib/dev_util/utils";

export class JubmojiInCollection {
  collectionPubKeys: string[];
  sigNullifierRandomness: bigint;
  pathToCircuits?: string;

  constructor(
    collectionPubKeys: string[],
    sigNullifierRandomness: bigint,
    pathToCircuits?: string
  ) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    pubKeyIndex,
    sig,
    msgNonce,
    msgRand,
    R,
    T,
    U,
  }: Jubmoji): Promise<MembershipProof> {
    const decodedSig = derDecodeSignature(sig);
    const msgHash = recoverCounterMessageHash(msgNonce, msgRand);
    const pubKey = getCardPubKeyFromIndex(pubKeyIndex);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = getMerkleProofFromCache(this.collectionPubKeys, index);
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    return await proveMembership({
      sig: decodedSig,
      msgHash,
      publicInputs: {
        R: EdwardsPoint.deserialize(R),
        T: EdwardsPoint.deserialize(T),
        U: EdwardsPoint.deserialize(U),
      },
      merkleProof,
      sigNullifierRandomness: this.sigNullifierRandomness,
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });
  }

  async verify({
    membershipProof,
    usedSigNullifiers,
  }: {
    membershipProof: MembershipProof;
    usedSigNullifiers?: bigint[];
  }): Promise<{
    verified: boolean;
    newSigNullifiers?: bigint[];
  }> {
    const merkleRoot = getMerkleRootFromCache(this.collectionPubKeys);

    return await verifyMembership({
      proof: membershipProof,
      merkleRoot,
      sigNullifierRandomness: this.sigNullifierRandomness,
      usedSigNullifiers,
      pathToCircuits: this.pathToCircuits,
    });
  }
}

// We must also pass the message nonce and random string along with the proof
export class JubmojiInCollectionWithNonce {
  collectionPubKeys: string[];
  sigNullifierRandomness: bigint;
  nonces: number[];
  pathToCircuits?: string;

  constructor(
    collectionPubKeys: string[],
    sigNullifierRandomness: bigint,
    nonces: number[],
    pathToCircuits?: string
  ) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.nonces = nonces;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    pubKeyIndex,
    sig,
    msgNonce,
    msgRand,
    R,
    T,
    U,
  }: Jubmoji): Promise<{
    membershipProof: MembershipProof;
    msgNonce: number;
    msgRand: string;
  }> {
    const decodedSig = derDecodeSignature(sig);
    const msgHash = recoverCounterMessageHash(msgNonce, msgRand);
    const pubKey = getCardPubKeyFromIndex(pubKeyIndex);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = getMerkleProofFromCache(this.collectionPubKeys, index);
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    const membershipProof = await proveMembership({
      sig: decodedSig,
      msgHash,
      publicInputs: {
        R: EdwardsPoint.deserialize(R),
        T: EdwardsPoint.deserialize(T),
        U: EdwardsPoint.deserialize(U),
      },
      merkleProof,
      sigNullifierRandomness: this.sigNullifierRandomness,
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    return {
      membershipProof,
      msgNonce,
      msgRand,
    };
  }

  async verify({
    membershipProof,
    msgNonce,
    msgRand,
    usedSigNullifiers,
  }: {
    membershipProof: MembershipProof;
    msgNonce: number;
    msgRand: string;
    usedSigNullifiers?: bigint[];
  }): Promise<{
    verified: boolean;
    newSigNullifiers?: bigint[];
  }> {
    // Check that the message hash is correct
    const msgHash = recoverCounterMessageHash(msgNonce, msgRand);
    if (msgHash !== membershipProof.msgHash) {
      return { verified: false };
    }

    // Check that the message nonce is one of the valid nonces
    if (!this.nonces.includes(msgNonce)) {
      return { verified: false };
    }

    const merkleRoot = getMerkleRootFromCache(this.collectionPubKeys);

    return await verifyMembership({
      proof: membershipProof,
      merkleRoot,
      sigNullifierRandomness: this.sigNullifierRandomness,
      usedSigNullifiers,
      pathToCircuits: this.pathToCircuits,
    });
  }
}

export class NUniqueJubmojisInCollection {
  collectionPubKeys: string[];
  sigNullifierRandomness: bigint;
  N: number;
  pathToCircuits?: string;

  constructor(
    collectionPubKeys: string[],
    sigNullifierRandomness: bigint,
    N: number,
    pathToCircuits?: string
  ) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.N = N;
    this.pathToCircuits = pathToCircuits;
  }

  // Todo: Let's use batch proving here
  async prove(jubmojis: Jubmoji[]): Promise<MembershipProof[]> {
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    return await Promise.all(
      jubmojis.map(
        async ({ pubKeyIndex, sig, msgNonce, msgRand, R, T, U }: Jubmoji) => {
          const decodedSig = derDecodeSignature(sig);
          const msgHash = recoverCounterMessageHash(msgNonce, msgRand);
          const pubKey = getCardPubKeyFromIndex(pubKeyIndex);
          const index = this.collectionPubKeys.indexOf(pubKey);
          const merkleProof = getMerkleProofFromCache(
            this.collectionPubKeys,
            index
          );

          return await proveMembership({
            sig: decodedSig,
            msgHash,
            publicInputs: {
              R: EdwardsPoint.deserialize(R),
              T: EdwardsPoint.deserialize(T),
              U: EdwardsPoint.deserialize(U),
            },
            merkleProof,
            sigNullifierRandomness: this.sigNullifierRandomness,
            pubKeyNullifierRandomness,
            pathToCircuits: this.pathToCircuits,
          });
        }
      )
    );
  }

  // Checks that all the membershipProofs are valid, and that their pubKeyNullifiers are unique
  // while having the same pubKeyNullifierRandomnessHash
  async verify({
    membershipProofs,
    usedSigNullifiers,
  }: {
    membershipProofs: MembershipProof[];
    usedSigNullifiers: bigint[];
  }): Promise<{
    verified: boolean;
    newSigNullifiers?: bigint[];
  }> {
    // Must have at least N proofs
    if (membershipProofs.length < this.N) {
      return { verified: false };
    }

    // Checks that all the pubKeyNullifiers are unique but all the
    // pubKeyNullifierRandomnessHashes are the same
    const pubKeyNullifiers = membershipProofs.map(
      (proof) => getPublicSignalsFromMembershipZKP(proof.zkp).pubKeyNullifier
    );
    if (!areAllBigIntsDifferent(pubKeyNullifiers)) {
      return { verified: false };
    }

    const pubKeyNullifierRandomnessHashes = membershipProofs.map(
      (proof) =>
        getPublicSignalsFromMembershipZKP(proof.zkp)
          .pubKeyNullifierRandomnessHash
    );
    if (!areAllBigIntsTheSame(pubKeyNullifierRandomnessHashes)) {
      return { verified: false };
    }

    const merkleRoot = getMerkleRootFromCache(this.collectionPubKeys);

    return await batchVerifyMembership({
      proofs: membershipProofs,
      merkleRoot,
      sigNullifierRandomness: this.sigNullifierRandomness,
      usedSigNullifiers,
      pathToCircuits: this.pathToCircuits,
    });
  }
}

export class PublicMessageSignature {
  randStr?: string;

  constructor(randStr?: string) {
    this.randStr = randStr;
  }

  prove(
    message: string,
    sig: string,
    pubKeyIndex: number
  ): Promise<{
    message: string;
    sig: Signature;
    pubKeyIndex: number;
  }> {
    return Promise.resolve({
      message,
      sig: derDecodeSignature(sig),
      pubKeyIndex,
    });
  }

  verify({
    message,
    sig,
    pubKeyIndex,
  }: {
    message: string;
    sig: Signature;
    pubKeyIndex: number;
  }): Promise<{
    verified: boolean;
    newSigNullifiers?: bigint[];
  }> {
    // If there is a randStr, prepend it to the message
    const fullMessage = this.randStr ? this.randStr + message : message;
    const msgHash = recoverArbitraryMessageHash(fullMessage);
    const pubKey = publicKeyFromString(getCardPubKeyFromIndex(pubKeyIndex));

    return Promise.resolve({
      verified: verifyEcdsaSignature(sig, msgHash, pubKey),
    });
  }
}
