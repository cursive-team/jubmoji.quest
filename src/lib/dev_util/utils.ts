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

// Adjusts a hex string to be a certain length by adding a leading 0 if necessary
export const extendHexString = (hex: string, desiredLength: number): string => {
  const zeros = "0".repeat(desiredLength - hex.length);

  return zeros + hex;
};
