import { sha256 } from "js-sha256";
import { extendHexString } from "./utils";
import { babyjubjub, hexToBigInt } from "babyjubjub-ecdsa";

export const HASH_DIGEST_LENGTH = 256;

// Prepares a message for ECDSA signing by hashing it and truncating the hash
export const getECDSAMessageHash = (msg: Buffer): bigint => {
  const hasher = sha256.create();
  const hash = hasher.update(msg).hex();

  // As part of the ECDSA algorithm, we truncate the hash to its left n bits,
  // where n is the bit length of the order of the curve.
  // Truncation includes any leading zeros, so we first pad the hash to the full digest length
  const hashBits = hexToBigInt(hash)
    .toString(2)
    .padStart(HASH_DIGEST_LENGTH, "0");
  const truncatedBits = hashBits.slice(0, babyjubjub.scalarFieldBitLength);

  return BigInt("0b" + truncatedBits);
};

// Recovers the digest of the hash of an arbitrary message
// https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign
export const recoverArbitraryMessageHash = (msg: string): bigint => {
  return getECDSAMessageHash(Buffer.from(msg, "utf8"));
};

// Recovers the message hash of a counter signature
// https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md#command-sign_random
export const recoverCounterMessageHash = (
  msgNonce: number,
  msgRand: string
): bigint => {
  // Nonce occupies the first 4 bytes of the message
  const nonceString = extendHexString(msgNonce.toString(16), 8);
  // Randomness occupies the next 28 bytes of the message
  const randString = extendHexString(msgRand, 56);
  const msgString = nonceString + randString;

  return getECDSAMessageHash(
    Buffer.concat([
      Buffer.from("\x19Attest counter pk62:\n", "utf8"),
      Buffer.from(msgString, "hex"),
    ])
  );
};
