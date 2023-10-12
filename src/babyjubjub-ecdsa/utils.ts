import { EdwardsPoint, bytesToBigInt } from "babyjubjub-ecdsa";
import { v4 as uuidv4, parse as uuidParse } from "uuid";
import { JubmojiData } from "./types";

export const serializeJumbojiData = (data: JubmojiData): string => {
  return JSON.stringify({
    jubmojiIndex: data.jubmojiIndex,
    sig: data.sig,
    msgNonce: data.msgNonce,
    msgRand: data.msgRand,
    R: data.R.serialize(),
    T: data.T.serialize(),
    U: data.U.serialize(),
    leaderboardProof: data.leaderboardProof,
  });
};

export const deserializeJubmojiData = (data: string): JubmojiData => {
  const parsed = JSON.parse(data);
  return {
    jubmojiIndex: parsed.jubmojiIndex,
    sig: parsed.sig,
    msgNonce: parsed.msgNonce,
    msgRand: parsed.msgRand,
    R: EdwardsPoint.deserialize(parsed.R),
    T: EdwardsPoint.deserialize(parsed.T),
    U: EdwardsPoint.deserialize(parsed.U),
    leaderboardProof: parsed.leaderboardProof,
  };
};

export const getJubmojiPubKeyFromFullCollectionIndex = (
  index: number
): string => {
  throw new Error("Not implemented");
};

export const hashMessage = (msg: string): bigint => {
  throw new Error("Not implemented");
};

export const recoverMessageFromNonceAndRand = (
  msgNonce: number,
  msgRand: string
): string => {
  throw new Error("Not implemented");
};

export const getRandomNullifierRandomness = (): bigint => {
  const uuid = uuidv4();

  return bytesToBigInt(uuidParse(uuid));
};
