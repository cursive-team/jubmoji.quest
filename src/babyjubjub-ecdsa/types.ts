import { EdwardsPoint, Signature, ZKP } from "babyjubjub-ecdsa";

export type JubmojiData = {
  jubmojiIndex: number;
  sig: string;
  msgNonce: number;
  msgRand: string;
  R: EdwardsPoint;
  T: EdwardsPoint;
  U: EdwardsPoint;
  leaderboardProof: ZKP;
};
