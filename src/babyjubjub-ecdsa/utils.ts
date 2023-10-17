import { Jubmoji } from "@/lib/dev_types";
import { recoverCounterMessageHash } from "@/lib/dev_util/signature";
import { getCardPubKeyFromIndex } from "@/lib/dev_util/utils";
import { EdwardsPoint, Signature, derDecodeSignature } from "babyjubjub-ecdsa";

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
