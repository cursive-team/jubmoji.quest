import { BackupState, Sigmoji } from "../types";
import {
  deserializeBackupState,
  parseSerializedSigmoji,
  serializeBackupState,
  serializeSigmoji,
  serializeSigmojisInLocalStorage,
} from "./serialize";

/**
 * Loads Sigmojis from the local storage.
 * @returns {Promise<Sigmoji[]>} - A promise that resolves to an array of Sigmojis.
 */
export async function loadSigmojis(): Promise<Sigmoji[]> {
  const sigmojis = window.localStorage["sigmojis"];
  return await parseSerializedSigmoji(sigmojis);
}

/**
 * Loads the Sigmojis from localStorage to be stored in a wallet backup. However,
 * we remove any computed ZKP as that would be too large to store in the wallet
 * backup. We then returned a serialized version of this new array.
 * @returns {Promise<string>} - A promise that resolves to a serialized string of Sigmojis.
 */
export async function loadSigmojiWalletBackup(): Promise<string> {
  const sigmojis = await loadSigmojis();
  const sigmojisWithoutZKP = sigmojis.map((sigmoji) => {
    return {
      emojiImg: sigmoji.emojiImg,
      PCD: sigmoji.PCD,
      ZKP: "",
    };
  });
  return JSON.stringify(
    await Promise.all(sigmojisWithoutZKP.map(serializeSigmoji))
  );
}

/**
 * Saves a Sigmoji to the local storage.
 * @param {Sigmoji} sigmoji - The Sigmoji to save.
 */
export async function saveSigmoji(sigmoji: Sigmoji): Promise<void> {
  const sigmojis = await loadSigmojis();
  sigmojis.push(sigmoji);
  serializeSigmojisInLocalStorage(sigmojis);
}

/**
 * Updates a Sigmoji in the localStorage.
 * @param {Sigmoji} sigmoji - The Sigmoji to update.
 */
export async function updateSigmoji(sigmoji: Sigmoji): Promise<void> {
  const sigmojis = await loadSigmojis();
  const index = sigmojis.findIndex((s) => s.emojiImg === sigmoji.emojiImg);
  if (index !== -1) {
    sigmojis[index] = sigmoji;
  }

  serializeSigmojisInLocalStorage(sigmojis);
}

/*
 * Updates the sigmojis in local storage with a new list.
 * Will overwrite any sigmojis that have the same emojiImg with the new list.
 * @param newSigmojis - The new list of sigmojis to update with.
 */
export async function updateSigmojiList(newSigmojis: Sigmoji[]): Promise<void> {
  const currentSigmojis = await loadSigmojis();
  const newSigmojiKeys = newSigmojis.map((s) => s.emojiImg);
  const updatedSigmojis = newSigmojis.concat(
    currentSigmojis.filter((s) => !newSigmojiKeys.includes(s.emojiImg))
  );

  serializeSigmojisInLocalStorage(updatedSigmojis);
}

/**
 * Saves a user's leaderboard entry to localStorage.
 * @param {object} entry - The leaderboard entry to save.
 * @param {string} entry.pseudonym - The pseudonym of the user.
 * @param {number} entry.score - The score of the user.
 */
export function saveLeaderboardEntry(entry: {
  pseudonym: string;
  score: number;
}): void {
  const leaderboardEntries = loadLeaderboardEntries();
  const serializedEntry = JSON.stringify(entry);
  if (!leaderboardEntries.includes(serializedEntry)) {
    leaderboardEntries.push(serializedEntry);
  }

  window.localStorage["leaderboard"] = JSON.stringify(leaderboardEntries);
}

/**
 * Loads the leaderboard entries from localStorage.
 * @returns {string[]} - An array of serialized leaderboard entries.
 */
export function loadLeaderboardEntries(): string[] {
  const leaderboardEntries = window.localStorage["leaderboard"];
  if (!leaderboardEntries) {
    return [];
  }

  return JSON.parse(leaderboardEntries) || [];
}

/**
 * Loads the backup state from localStorage.
 * @returns {Promise<BackupState | undefined>} - A promise that resolves to the backup state or undefined if it doesn't exist.
 */
export async function loadBackupState(): Promise<BackupState | undefined> {
  const serializedBackup = window.localStorage["backup"];
  if (serializedBackup != null && serializedBackup !== "") {
    return deserializeBackupState(serializedBackup);
  }
  return undefined;
}

/**
 * Saves the backup state to localStorage.
 * @param {BackupState} backup - The backup state to save.
 */
export async function saveBackupState(backup: BackupState): Promise<void> {
  window.localStorage["backup"] = serializeBackupState(backup);
}
