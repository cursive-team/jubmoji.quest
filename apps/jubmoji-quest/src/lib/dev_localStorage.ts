import {
  Jubmoji,
  deserializeJubmojiList,
  serializeJubmojiList,
} from "jubmoji-api";
import { BackupState } from "../types";

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

export async function loadBackupState(): Promise<BackupState | undefined> {
  const serializedBackup = window.localStorage["backup"];
  if (serializedBackup != null && serializedBackup !== "") {
    return JSON.parse(serializedBackup);
  }
  return undefined;
}

export async function saveBackupState(backup: BackupState): Promise<void> {
  window.localStorage["backup"] = JSON.stringify(backup);
}
