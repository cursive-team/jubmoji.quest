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
