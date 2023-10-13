const keccak256 = require("keccak256");
import { sha256 } from "js-sha256";
import { extendHexString } from "./utils";

// Recovers the message hash of an arbitrary message signature
// https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign
export const recoverArbitraryMessageHash = (msg: string): bigint => {
  const msgString =
    "\x19Ethereum Signed Message:\n" + msg.length.toString() + msg;

  return keccak256(Buffer.from(msgString)).toString("hex");
};

// Recovers the message hash of a counter signature
// https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign_random
export const recoverCounterMessageHash = (
  msgNonce: number,
  msgRand: string
): string => {
  // Nonce occupies the first 4 bytes of the message
  const nonceString = extendHexString(msgNonce.toString(16), 8);
  // Randomness occupies the next 28 bytes of the message
  const randString = extendHexString(msgRand, 56);
  const msgString = nonceString + randString;

  const msgBuffer = Buffer.from(msgString, "hex");
  const hash = sha256.create();

  return hash
    .update(
      Buffer.concat([
        Buffer.from([0x19]),
        Buffer.from("Attest counter pk2:\n", "utf8"),
      ])
    )
    .update(msgBuffer)
    .hex();
};
