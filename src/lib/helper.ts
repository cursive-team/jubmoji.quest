import { BackupState, Sigmoji } from "@/types";
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
