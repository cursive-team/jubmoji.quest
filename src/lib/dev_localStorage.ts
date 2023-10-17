import { Jubmoji } from "./dev_types";
import {
  deserializeJubmojiList,
  serializeJubmojiList,
} from "./dev_util/serialize";

export const loadJubmojis = async (): Promise<Jubmoji[]> => {
  const jubmojis = window.localStorage["jubmojis"];

  if (!jubmojis) {
    return [];
  }

  return deserializeJubmojiList(jubmojis);
};

export const writeJubmojis = async (jubmojis: Jubmoji[]): Promise<void> => {
  const serialized = serializeJubmojiList(jubmojis);

  window.localStorage["jubmojis"] = serialized;
};

export const clearJubmojis = async (): Promise<void> => {
  window.localStorage["jubmojis"] = "";
};

export const addJubmoji = async (jubmoji: Jubmoji): Promise<void> => {
  const jubmojis = await loadJubmojis();

  // We only allow users to store one of each card type
  if (jubmojis.find((j) => j.pubKeyIndex === jubmoji.pubKeyIndex)) {
    throw new Error("You may only store one Jubmoji of each card type!");
  }

  jubmojis.push(jubmoji);

  await writeJubmojis(jubmojis);
};
