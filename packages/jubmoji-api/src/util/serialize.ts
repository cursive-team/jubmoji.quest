import { Jubmoji } from "../types";
import { NonceSignature, cardPubKeys } from "../data";
import { getJubmojiFromNonceSignature } from "./proving";

export const serializeJumboji = (jubmoji: Jubmoji): string => {
  return JSON.stringify(jubmoji);
};

export const deserializeJubmoji = (seralized: string): Jubmoji => {
  return JSON.parse(seralized);
};

export const serializeJubmojiList = (jubmojis: Jubmoji[]): string => {
  return JSON.stringify(jubmojis);
};

export const deserializeJubmojiList = (serialized: string): Jubmoji[] => {
  return JSON.parse(serialized);
};

export const succinctSerializeJubmojiList = (jubmojis: Jubmoji[]): string => {
  let serialization = "";
  for (const jubmoji of jubmojis) {
    // use base64 encoding to reduce length by 33%
    const base64Serial = [
      // include emoji so URL is more human readable
      cardPubKeys[jubmoji.pubKeyIndex].emoji,
      Buffer.from(jubmoji.sig, "hex").toString("base64"),
      jubmoji.msgNonce,
      Buffer.from(jubmoji.msgRand, "hex").toString("base64"),
      jubmoji.pubKeyIndex,
    ].join("-");
    serialization += base64Serial + ",";
  }
  return serialization.substring(0, serialization.length - 1);
};

export const succinctDeserializeJubmojiList = (
  serialized: string
): Jubmoji[] => {
  const jubmojis: Jubmoji[] = [];
  const serializedJubmojis = serialized.split(",");
  for (const serializedJubmoji of serializedJubmojis) {
    const [_emoji, sig, msgNonce, msgRand, pubKeyIndex] =
      serializedJubmoji.split("-");
    const nonceSig: NonceSignature = {
      sig: Buffer.from(sig, "base64").toString("hex").toUpperCase(),
      nonce: parseInt(msgNonce),
      rand: Buffer.from(msgRand, "base64").toString("hex").toUpperCase(),
      pubKeyIndex: parseInt(pubKeyIndex),
    };
    jubmojis.push(getJubmojiFromNonceSignature(nonceSig));
  }
  return jubmojis;
};
