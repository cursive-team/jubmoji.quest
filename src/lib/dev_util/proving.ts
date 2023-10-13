import {
  derDecode,
  hexToBigInt,
  publicKeyFromString,
  getPublicInputsFromSignature,
} from "babyjubjub-ecdsa";
import { NonceSignature } from "../dev_mockData/nonceSigs";
import { Jubmoji } from "../dev_types";
import { recoverCounterMessageHash } from "./signature";
import { getJubmojiPubKeyFromIndex } from "./utils";

export const getJubmojiFromNonceSignature = ({
  nonce,
  rand,
  sig,
  pubKeyIndex,
}: NonceSignature): Jubmoji => {
  const decodedSig = derDecode(sig);
  const msgHash = hexToBigInt(recoverCounterMessageHash(nonce, rand));
  const pubKey = publicKeyFromString(getJubmojiPubKeyFromIndex(pubKeyIndex));
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
