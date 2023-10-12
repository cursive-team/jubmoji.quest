import {
  MembershipProof,
  areAllBigIntsDifferent,
  areAllBigIntsTheSame,
  batchVerifyMembership,
  derDecode,
  getPublicSignalsFromMembershipZKP,
  proveMembership,
  verifyMembership,
} from "babyjubjub-ecdsa";
import { JubmojiData } from "./types";
import {
  getJubmojiPubKeyFromFullCollectionIndex,
  getRandomNullifierRandomness,
  hashMessage,
  recoverMessageFromNonceAndRand,
} from "./utils";
import { getMerkleProofFromCache, getMerkleRootFromCache } from "./merkle";

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
    jubmojiIndex,
    sig,
    msgNonce,
    msgRand,
    R,
    T,
    U,
  }: JubmojiData): Promise<MembershipProof> {
    const decodedSig = derDecode(sig);
    const msgHash = hashMessage(
      recoverMessageFromNonceAndRand(msgNonce, msgRand)
    );
    const pubKey = getJubmojiPubKeyFromFullCollectionIndex(jubmojiIndex);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = getMerkleProofFromCache(this.collectionPubKeys, index);
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    return await proveMembership({
      sig: decodedSig,
      msgHash,
      publicInputs: {
        R,
        T,
        U,
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
    jubmojiIndex,
    sig,
    msgNonce,
    msgRand,
    R,
    T,
    U,
  }: JubmojiData): Promise<{
    membershipProof: MembershipProof;
    msgNonce: number;
    msgRand: string;
  }> {
    const decodedSig = derDecode(sig);
    const msgHash = hashMessage(
      recoverMessageFromNonceAndRand(msgNonce, msgRand)
    );
    const pubKey = getJubmojiPubKeyFromFullCollectionIndex(jubmojiIndex);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = getMerkleProofFromCache(this.collectionPubKeys, index);
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    const membershipProof = await proveMembership({
      sig: decodedSig,
      msgHash,
      publicInputs: {
        R,
        T,
        U,
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
    const msg = recoverMessageFromNonceAndRand(msgNonce, msgRand);
    if (hashMessage(msg) !== membershipProof.msgHash) {
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
  async prove(jubmojis: JubmojiData[]): Promise<MembershipProof[]> {
    const pubKeyNullifierRandomness = getRandomNullifierRandomness();

    return await Promise.all(
      jubmojis.map(
        async ({
          jubmojiIndex,
          sig,
          msgNonce,
          msgRand,
          R,
          T,
          U,
        }: JubmojiData) => {
          const decodedSig = derDecode(sig);
          const msgHash = hashMessage(
            recoverMessageFromNonceAndRand(msgNonce, msgRand)
          );
          const pubKey = getJubmojiPubKeyFromFullCollectionIndex(jubmojiIndex);
          const index = this.collectionPubKeys.indexOf(pubKey);
          const merkleProof = getMerkleProofFromCache(
            this.collectionPubKeys,
            index
          );

          return await proveMembership({
            sig: decodedSig,
            msgHash,
            publicInputs: {
              R,
              T,
              U,
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
