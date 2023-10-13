import { v4 as uuidv4, parse as uuidParse } from "uuid";
import { bytesToBigInt } from "babyjubjub-ecdsa";
import { cardPubKeys } from "../dev_mockData/cardPubKeys";

export const getJubmojiPubKeyFromIndex = (index: number): string => {
  return cardPubKeys[index].pubKeyWeierstrass;
};

export const getRandomNullifierRandomness = (): bigint => {
  const uuid = uuidv4();

  return bytesToBigInt(uuidParse(uuid));
};
