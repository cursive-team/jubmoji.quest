import {
  derDecodeSignature,
  getPublicInputsFromSignature,
  publicKeyFromString,
  EdwardsPoint,
  Signature,
} from "babyjubjub-ecdsa";
import { Jubmoji } from "../types";
import { NonceSignature } from "../mockData";
import { recoverCounterMessageHash } from "../nfcCard";
import { getCardPubKeyFromIndex } from "../util";

export const getJubmojiFromNonceSignature = ({
  nonce,
  rand,
  sig,
  pubKeyIndex,
}: NonceSignature): Jubmoji => {
  const decodedSig = derDecodeSignature(sig);
  const msgHash = recoverCounterMessageHash(nonce, rand);
  const pubKey = publicKeyFromString(getCardPubKeyFromIndex(pubKeyIndex));
  const { R, T, U } = getPublicInputsFromSignature(decodedSig, msgHash, pubKey);

  return {
    pubKeyIndex,
    sig,
    msgNonce: nonce,
    msgRand: rand,
    R: R.serialize(),
    T: T.serialize(),
    U: U.serialize(),
  };
};

export const getMembershipProofArgsFromJubmoji = ({
  pubKeyIndex,
  sig,
  msgNonce,
  msgRand,
  R,
  T,
  U,
}: Jubmoji): {
  sig: Signature;
  msgHash: bigint;
  pubKey: string;
  R: EdwardsPoint;
  T: EdwardsPoint;
  U: EdwardsPoint;
} => {
  return {
    sig: derDecodeSignature(sig),
    msgHash: recoverCounterMessageHash(msgNonce, msgRand),
    pubKey: getCardPubKeyFromIndex(pubKeyIndex),
    R: EdwardsPoint.deserialize(R),
    T: EdwardsPoint.deserialize(T),
    U: EdwardsPoint.deserialize(U),
  };
};
