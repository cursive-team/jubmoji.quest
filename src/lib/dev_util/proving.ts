import {
  derDecodeSignature,
  getPublicInputsFromSignature,
  publicKeyFromString,
} from "babyjubjub-ecdsa";
import { NonceSignature } from "../dev_mockData/nonceSigs";
import { Jubmoji } from "../dev_types";
import { recoverCounterMessageHash } from "./signature";
import { getCardPubKeyFromIndex } from "./utils";

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
