// All definition of proving and verification classes
import {
  VerificationResult,
  areAllBigIntsDifferent,
  areAllBigIntsTheSame,
  batchProveMembership,
  batchVerifyMembership,
  bigIntToBytes,
  deserializeMembershipProof,
  getPublicSignalsFromMembershipZKP,
  hexToBigInt,
  proveMembership,
  serializeMembershipProof,
  verifyMembership,
} from "babyjubjub-ecdsa";
import {
  getMerkleProofFromCache,
  getMerkleProofListFromCache,
  getMerkleRootFromCache,
} from "./merkleCache";
import { recoverCounterMessageHash } from "./nfcCard";
import {
  getCardPubKeyFromIndex,
  getRandomNullifierRandomness,
  getMembershipProofArgsFromJubmoji,
  getMessageHash,
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
  TeamLeaderboardClassArgs,
  TeamLeaderboardProofArgs,
  TeamLeaderboardProof,
} from "./types";
import { Signature } from "@noble/secp256k1";
import { cardPubKeys } from "./data";

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

  prove(
    proofArgs: PublicMessageSignatureProofArgs
  ): Promise<PublicMessageSignatureProof> {
    return Promise.resolve(proofArgs);
  }

  verify({
    message,
    rawSig,
    pubKeyIndex,
  }: PublicMessageSignatureProof): Promise<VerificationResult> {
    // If there is a randStr, prepend it to the message
    const fullMessage = this.randStr ? this.randStr + message : message;
    const msgHash = getMessageHash(fullMessage);
    const { r, s, v } = rawSig;
    const signature = new Signature(
      hexToBigInt(r),
      hexToBigInt(s),
      v - 27 // The NFC card uses v = 27 or 28, but the secp library wants recovery to be 0 or 1
    );

    const claimedPublicKey = cardPubKeys[pubKeyIndex].pubKeySlot1; // Use secp256k1 key from slot 1
    let recoveredPublicKey;
    try {
      recoveredPublicKey = signature
        .recoverPublicKey(bigIntToBytes(msgHash))
        .toHex(false); // Get the uncompressed public key
    } catch {
      return Promise.resolve({ verified: false });
    }

    return Promise.resolve({
      verified: claimedPublicKey === recoveredPublicKey,
    });
  }
}

export class TeamLeaderboard
  implements ProofClass<TeamLeaderboardProofArgs, TeamLeaderboardProof>
{
  teamPubKeys: string[];
  collectionPubKeys: string[];
  sigNullifierRandomness: string;
  pathToCircuits?: string;

  constructor({
    teamPubKeys,
    collectionPubKeys,
    sigNullifierRandomness,
    pathToCircuits,
  }: TeamLeaderboardClassArgs) {
    this.teamPubKeys = teamPubKeys;
    this.collectionPubKeys = collectionPubKeys;
    this.sigNullifierRandomness = sigNullifierRandomness;
    this.pathToCircuits = pathToCircuits;
  }

  async prove({
    teamJubmoji,
    collectionJubmojis,
  }: TeamLeaderboardProofArgs): Promise<TeamLeaderboardProof> {
    const pubKeyNullifierRandomness = hexToBigInt(
      getRandomNullifierRandomness()
    );

    const { sig, msgHash, pubKey, R, T, U } =
      getMembershipProofArgsFromJubmoji(teamJubmoji);
    // We need to reveal which team we are on for the leaderboard
    const teamMerkleProof = await getMerkleProofFromCache([pubKey], 0);

    const teamMembershipProof = await proveMembership({
      sig,
      msgHash,
      publicInputs: {
        R,
        T,
        U,
      },
      merkleProof: teamMerkleProof,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    const sigs = [];
    const msgHashes = [];
    const publicInputs = [];
    const indices = [];
    for (const jubmoji of collectionJubmojis) {
      const { sig, msgHash, pubKey, R, T, U } =
        getMembershipProofArgsFromJubmoji(jubmoji);
      sigs.push(sig);
      msgHashes.push(msgHash);
      publicInputs.push({ R, T, U });
      indices.push(this.collectionPubKeys.indexOf(pubKey));
    }

    const collectionMerkleProofs = await getMerkleProofListFromCache(
      this.collectionPubKeys,
      indices
    );

    const collectionMembershipProofs = await batchProveMembership({
      sigs,
      msgHashes,
      publicInputs,
      merkleProofs: collectionMerkleProofs,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      pubKeyNullifierRandomness,
      pathToCircuits: this.pathToCircuits,
    });

    return {
      teamPubKeyIndex: teamJubmoji.pubKeyIndex,
      serializedTeamMembershipProof:
        serializeMembershipProof(teamMembershipProof),
      serializedCollectionMembershipProofs: collectionMembershipProofs.map(
        serializeMembershipProof
      ),
    };
  }

  async verify({
    teamPubKeyIndex,
    serializedTeamMembershipProof,
    serializedCollectionMembershipProofs,
  }: TeamLeaderboardProof): Promise<VerificationResult> {
    // Claimed team public key must be in the list of team public keys
    const teamPubKey = getCardPubKeyFromIndex(teamPubKeyIndex);
    if (!this.teamPubKeys.includes(teamPubKey)) {
      return { verified: false };
    }

    // Verify that the user is in the team they claim to be in
    const teamMerkleRoot = await getMerkleRootFromCache([teamPubKey]);
    const teamVerificationResult = await verifyMembership({
      proof: deserializeMembershipProof(serializedTeamMembershipProof),
      merkleRoot: teamMerkleRoot,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      usedSigNullifiers: undefined, // We don't care about reusing a team sig
      pathToCircuits: this.pathToCircuits,
    });

    if (!teamVerificationResult.verified) {
      return { verified: false }; // User is not in the team they claim to be in
    }

    const collectionMembershipProofs = serializedCollectionMembershipProofs.map(
      deserializeMembershipProof
    );
    const collectionMerkleRoot = await getMerkleRootFromCache(
      this.collectionPubKeys
    );

    return await batchVerifyMembership({
      proofs: collectionMembershipProofs,
      merkleRoot: collectionMerkleRoot,
      sigNullifierRandomness: hexToBigInt(this.sigNullifierRandomness),
      usedSigNullifiers: undefined, // Verify usedSigNullifiers outside of this proof, since we sometimes want to increase a user's score as long as they have used some new sigs
      pathToCircuits: this.pathToCircuits,
    });
  }
}
