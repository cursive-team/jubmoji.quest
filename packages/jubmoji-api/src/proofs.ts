// All definition of proving and verification classes
import {
  VerificationResult,
  areAllBigIntsDifferent,
  areAllBigIntsTheSame,
  batchProveMembership,
  batchVerifyMembership,
  derDecodeSignature,
  deserializeMembershipProof,
  getPublicSignalsFromMembershipZKP,
  hexToBigInt,
  proveMembership,
  publicKeyFromString,
  serializeMembershipProof,
  verifyEcdsaSignature,
  verifyMembership,
} from "babyjubjub-ecdsa";
import {
  getMerkleProofFromCache,
  getMerkleProofListFromCache,
  getMerkleRootFromCache,
} from "./merkleCache";
import {
  recoverArbitraryMessageHash,
  recoverCounterMessageHash,
} from "./nfcCard";
import {
  getCardPubKeyFromIndex,
  getRandomNullifierRandomness,
  getMembershipProofArgsFromJubmoji,
} from "./util";
import {
  ProofClass,
  JubmojiInCollectionClassArgs,
  JubmojiInCollectionProofArgs,
  JubmojiInCollectionProof,
  JubmojiInCollectionWithNonceClassArgs,
  JubmojiInCollectionWithNonceProofArgs,
  JubmojiInCollectionWithNonceProof,
  NUniqueJubmojiInCollectionClassArgs,
  NUniqueJubmojiInCollectionProofArgs,
  NUniqueJubmojiInCollectionProof,
  PublicMessageSignatureClassArgs,
  PublicMessageSignatureProofArgs,
  PublicMessageSignatureProof,
} from "./types";

export class JubmojiInCollection {
  collectionPubKeys: string[];
  sigNullifierRandomness: string;
  pathToCircuits?: string;

  constructor({
    collectionPubKeys,
    sigNullifierRandomness,
    pathToCircuits,
  }: JubmojiInCollectionClassArgs) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    jubmoji,
  }: JubmojiInCollectionProofArgs): Promise<JubmojiInCollectionProof> {
    const { sig, msgHash, pubKey, R, T, U } =
      getMembershipProofArgsFromJubmoji(jubmoji);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = await getMerkleProofFromCache(
      this.collectionPubKeys,
      index
    );
    const pubKeyNullifierRandomness = hexToBigInt(
      getRandomNullifierRandomness()
    );

    const membershipProof = await proveMembership({
      sig,
      msgHash,
      publicInputs: {
        R,
        T,
        U,
      },
      merkleProof,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    return {
      serializedMembershipProof: serializeMembershipProof(membershipProof),
    };
  }

  async verify({
    serializedMembershipProof,
    usedSigNullifiers,
  }: JubmojiInCollectionProof): Promise<VerificationResult> {
    const merkleRoot = await getMerkleRootFromCache(this.collectionPubKeys);

    return await verifyMembership({
      proof: deserializeMembershipProof(serializedMembershipProof),
      merkleRoot,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      usedSigNullifiers: usedSigNullifiers?.map(hexToBigInt),
      pathToCircuits: this.pathToCircuits,
    });
  }
}

// We must also pass the message nonce and random string along with the proof
export class JubmojiInCollectionWithNonce {
  collectionPubKeys: string[];
  sigNullifierRandomness: string;
  pathToCircuits?: string;

  constructor({
    collectionPubKeys,
    sigNullifierRandomness,
    pathToCircuits,
  }: JubmojiInCollectionWithNonceClassArgs) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    jubmoji,
  }: JubmojiInCollectionWithNonceProofArgs): Promise<JubmojiInCollectionWithNonceProof> {
    const { sig, msgHash, pubKey, R, T, U } =
      getMembershipProofArgsFromJubmoji(jubmoji);
    const index = this.collectionPubKeys.indexOf(pubKey);
    const merkleProof = await getMerkleProofFromCache(
      this.collectionPubKeys,
      index
    );
    const pubKeyNullifierRandomness = hexToBigInt(
      getRandomNullifierRandomness()
    );

    const membershipProof = await proveMembership({
      sig,
      msgHash,
      publicInputs: {
        R,
        T,
        U,
      },
      merkleProof,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    return {
      serializedMembershipProof: serializeMembershipProof(membershipProof),
      msgNonce: jubmoji.msgNonce,
      msgRand: jubmoji.msgRand,
    };
  }

  async verify({
    serializedMembershipProof,
    msgNonce,
    msgRand,
    usedSigNullifiers,
  }: JubmojiInCollectionWithNonceProof): Promise<VerificationResult> {
    const membershipProof = deserializeMembershipProof(
      serializedMembershipProof
    );

    // Check that the message hash is correct
    const msgHash = recoverCounterMessageHash(msgNonce, msgRand);
    if (msgHash !== membershipProof.msgHash) {
      return { verified: false };
    }

    const merkleRoot = await getMerkleRootFromCache(this.collectionPubKeys);

    return await verifyMembership({
      proof: membershipProof,
      merkleRoot,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      usedSigNullifiers: usedSigNullifiers?.map(hexToBigInt),
      pathToCircuits: this.pathToCircuits,
    });
  }
}

export class NUniqueJubmojisInCollection {
  collectionPubKeys: string[];
  sigNullifierRandomness: string;
  N: number;
  pathToCircuits?: string;

  constructor({
    collectionPubKeys,
    sigNullifierRandomness,
    N,
    pathToCircuits,
  }: NUniqueJubmojiInCollectionClassArgs) {
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.N = N;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    jubmojis,
  }: NUniqueJubmojiInCollectionProofArgs): Promise<NUniqueJubmojiInCollectionProof> {
    const pubKeyNullifierRandomness = hexToBigInt(
      getRandomNullifierRandomness()
    );

    const sigs = [];
    const msgHashes = [];
    const publicInputs = [];
    const indices = [];
    for (const jubmoji of jubmojis) {
      const { sig, msgHash, pubKey, R, T, U } =
        getMembershipProofArgsFromJubmoji(jubmoji);
      sigs.push(sig);
      msgHashes.push(msgHash);
      publicInputs.push({ R, T, U });
      indices.push(this.collectionPubKeys.indexOf(pubKey));
    }

    const merkleProofs = await getMerkleProofListFromCache(
      this.collectionPubKeys,
      indices
    );

    const membershipProofs = await batchProveMembership({
      sigs,
      msgHashes,
      publicInputs,
      merkleProofs,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    return {
      serializedMembershipProofs: membershipProofs.map(
        serializeMembershipProof
      ),
    };
  }

  // Checks that all the membershipProofs are valid, and that their pubKeyNullifiers are unique
  // while having the same pubKeyNullifierRandomnessHash
  async verify({
    serializedMembershipProofs,
    usedSigNullifiers,
  }: NUniqueJubmojiInCollectionProof): Promise<VerificationResult> {
    // Must have at least N proofs
    if (serializedMembershipProofs.length < this.N) {
      return { verified: false };
    }

    const membershipProofs = serializedMembershipProofs.map(
      deserializeMembershipProof
    );

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

    const merkleRoot = await getMerkleRootFromCache(this.collectionPubKeys);

    return await batchVerifyMembership({
      proofs: membershipProofs,
      merkleRoot,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      usedSigNullifiers: usedSigNullifiers?.map(hexToBigInt),
      pathToCircuits: this.pathToCircuits,
    });
  }
}

export class PublicMessageSignature
  implements
    ProofClass<PublicMessageSignatureProofArgs, PublicMessageSignatureProof>
{
  randStr?: string;

  constructor(classArgs: PublicMessageSignatureClassArgs) {
    this.randStr = classArgs.randStr;
  }

  prove(proofArgs: PublicMessageSignatureProofArgs) {
    return Promise.resolve(proofArgs);
  }

  verify({
    message,
    sig,
    pubKeyIndex,
  }: PublicMessageSignatureProof): Promise<VerificationResult> {
    // If there is a randStr, prepend it to the message
    const fullMessage = this.randStr ? this.randStr + message : message;
    const msgHash = recoverArbitraryMessageHash(fullMessage);
    const decodedSig = derDecodeSignature(sig);
    const pubKey = publicKeyFromString(getCardPubKeyFromIndex(pubKeyIndex));

    return Promise.resolve({
      verified: verifyEcdsaSignature(decodedSig, msgHash, pubKey),
    });
  }
}
