import { isNode, bytesToHex } from "babyjubjub-ecdsa";
const crypto = require("crypto");

// Generates randomness for nullifiers
// Uses Crypto Web API in browser and Node.js Crypto module in Node.js
export const getRandomNullifierRandomness = (): string => {
  const numBytes = 30; // Generate a number of bytes smaller than the size of a field element

  if (isNode()) {
    return crypto.randomBytes(numBytes).toString("hex");
  } else {
    return bytesToHex(self.crypto.getRandomValues(new Uint8Array(numBytes)));
  }
};

// Adjusts a hex string to be a certain length by adding a leading 0 if necessary
export const extendHexString = (hex: string, desiredLength: number): string => {
  const zeros = "0".repeat(desiredLength - hex.length);

  return zeros + hex;
};
