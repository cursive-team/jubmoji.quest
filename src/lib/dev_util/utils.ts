import { bytesToBigInt } from "babyjubjub-ecdsa";
import { cardPubKeys } from "../dev_mockData/cardPubKeys";

export const getCardPubKeyFromIndex = (index: number): string => {
  return cardPubKeys[index].pubKeyWeierstrass;
};

export const getRandomNullifierRandomness = (): bigint => {
  const randBytes = self.crypto.getRandomValues(new Uint8Array(32));

  return bytesToBigInt(randBytes);
};

// Adjusts a hex string to be a certain length by adding a leading 0 if necessary
export const extendHexString = (hex: string, desiredLength: number): string => {
  const zeros = "0".repeat(desiredLength - hex.length);

  return zeros + hex;
};
