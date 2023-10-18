import { BackupState, Sigmoji } from "../types";
import { deserialize, serialize } from "@pcd/halo-nonce-pcd";

export async function serializeSigmoji(sigmoji: Sigmoji): Promise<string> {
  const serializedPCD = await serialize(sigmoji.PCD);

  return JSON.stringify({
    emojiImg: sigmoji.emojiImg,
    stringPCD: serializedPCD.pcd,
    ZKP: sigmoji.ZKP,
  });
}

export async function deserializeSigmoji(
  serializedSigmoji: string
): Promise<Sigmoji> {
  const data = JSON.parse(serializedSigmoji);

  return {
    emojiImg: data.emojiImg,
    PCD: await deserialize(data.stringPCD),
    ZKP: data.ZKP,
  };
}

export function serializeBackupState(backup: BackupState): string {
  return JSON.stringify(backup);
}

export function deserializeBackupState(serializedBackup: string): BackupState {
  return JSON.parse(serializedBackup);
}

/**
 * Parses a serialized string of Sigmojis.
 * @param {string} serializedStr - The serialized string to parse.
 * @returns {Promise<Sigmoji[]>} - A promise that resolves to an array of Sigmojis.
 */
export async function parseSerializedSigmoji(
  serializedStr: string
): Promise<Sigmoji[]> {
  if (serializedStr != null && serializedStr !== "") {
    const serializedSigmojis = JSON.parse(serializedStr);
    return await Promise.all(
      serializedSigmojis.map((serializedSigmoji: string) =>
        deserializeSigmoji(serializedSigmoji)
      )
    );
  }

  return [];
}

/**
 * Serializes array of Sigmojis for localStorage backup.
 */
export async function serializeSigmojisInLocalStorage(
  sigmojis: Sigmoji[]
): Promise<void> {
  window.localStorage["sigmojis"] = JSON.stringify(
    await Promise.all(sigmojis.map(serializeSigmoji))
  );
}
