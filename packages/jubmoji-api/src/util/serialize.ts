import { Jubmoji } from "../types";

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
