import {
  Jubmoji,
  deserializeJubmojiList,
  serializeJubmojiList,
} from "jubmoji-api";
import { BackupState, NullifiedSigs } from "../types";

/**
 * JUBMOJI UTILITIES
 */
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

export const unionJubmojisByPubKey = async (
  jubmojis1: Jubmoji[],
  jubmojis2: Jubmoji[]
): Promise<Jubmoji[]> => {
  const unionJubmojis = Array.from(new Set([...jubmojis1, ...jubmojis2]));

  // make sure we only keep the lowest nonce for each pubKeyIndex
  return unionJubmojis.reduce((acc: Jubmoji[], jubmoji: Jubmoji) => {
    const existingJubmoji = acc.find(
      (item) => item.pubKeyIndex === jubmoji.pubKeyIndex
    );
    if (!existingJubmoji) {
      return [...acc, jubmoji];
    } else if (existingJubmoji.msgNonce > jubmoji.msgNonce) {
      return acc.map((item) =>
        item.pubKeyIndex === jubmoji.pubKeyIndex ? jubmoji : item
      );
    } else {
      return acc;
    }
  }, []);
};

export const clearJubmojis = async (): Promise<void> => {
  window.localStorage["jubmojis"] = "";
};

export const addJubmoji = async (jubmoji: Jubmoji): Promise<void> => {
  const jubmojis = await loadJubmojis();

  // We only allow users to store one of each card type
  if (jubmojis.find((j) => j.pubKeyIndex === jubmoji.pubKeyIndex)) {
    console.error("You may only store one Jubmoji of each card type!");
    return;
  }

  jubmojis.push(jubmoji);

  await writeJubmojis(jubmojis);
};

/**
 * BACKUP STATE UTILITIES
 */
export async function loadBackupState(): Promise<BackupState | undefined> {
  const serializedBackup = window.localStorage["backup"];
  if (serializedBackup != null && serializedBackup !== "") {
    return JSON.parse(serializedBackup);
  }
  return undefined;
}

export async function writeBackupState(backup: BackupState): Promise<void> {
  const backedUpJubmojis = await loadJubmojis();
  backup.backedUpPubKeyIndices = backedUpJubmojis.map((j) => j.pubKeyIndex);
  window.localStorage["backup"] = JSON.stringify(backup);
}

/**
 * NULLIFIED SIGS UTILITIES
 */
export const addNullifiedSigs = async ({
  quests: questNullifiedSigs,
  powers: powerNullifiedSigs,
}: NullifiedSigs): Promise<void> => {
  const sigs = await loadNullifiedSigs();

  Object.entries(questNullifiedSigs).forEach(([questId, newSigs]) => {
    if (!sigs.quests[Number(questId)]) {
      sigs.quests[Number(questId)] = newSigs;
    } else {
      sigs.quests[Number(questId)] = Array.from(
        new Set([...sigs.quests[Number(questId)], ...newSigs])
      );
    }
  });

  Object.entries(powerNullifiedSigs).forEach(([powerId, newSigs]) => {
    if (!sigs.powers[Number(powerId)]) {
      sigs.powers[Number(powerId)] = newSigs;
    } else {
      sigs.powers[Number(powerId)] = Array.from(
        new Set([...sigs.powers[Number(powerId)], ...newSigs])
      );
    }
  });

  await writeNullifiedSigs(sigs);
};

export const writeNullifiedSigs = async (
  sigs: NullifiedSigs
): Promise<void> => {
  window.localStorage["nullifiedSigs"] = JSON.stringify(sigs);
};

export const loadNullifiedSigs = async (): Promise<NullifiedSigs> => {
  const sigs = window.localStorage["nullifiedSigs"];

  if (!sigs) {
    return { quests: {}, powers: {} };
  }

  return JSON.parse(sigs);
};

/**
 * LEADERBOARD UTILITIES
 */
export const addLeaderboardKey = async (
  questId: number,
  leaderboardKey: string
): Promise<void> => {
  const leaderboardKeys = await loadLeaderboardKeys();
  leaderboardKeys[questId] = leaderboardKey;

  await writeLeaderboardKeys(leaderboardKeys);
};

export const writeLeaderboardKeys = async (
  leaderboardKeys: Record<number, string>
): Promise<void> => {
  window.localStorage["leaderboardKeys"] = JSON.stringify(leaderboardKeys);
};

export const loadLeaderboardKeys = async (): Promise<
  Record<number, string>
> => {
  const leaderboardKeys = window.localStorage["leaderboardKeys"];

  if (!leaderboardKeys) {
    return {};
  }

  return JSON.parse(leaderboardKeys);
};
/**
 * COLLECTED TIME UTILITIES
 */
export const loadCollectedTimes = (): Record<number, number> => {
  const collectedTimes = window.localStorage["collectedTimes"];

  if (!collectedTimes) {
    return {};
  }

  return JSON.parse(collectedTimes);
};

export const readCollectedTime = (pubKeyIndex: number): number | undefined => {
  const collectedTimes = loadCollectedTimes();
  return collectedTimes[pubKeyIndex];
};

export const addCollectedTime = (pubKeyIndex: number): void => {
  const collectedTimes = loadCollectedTimes();

  if (!(pubKeyIndex in collectedTimes)) {
    collectedTimes[pubKeyIndex] = Date.now();
    window.localStorage["collectedTimes"] = JSON.stringify(collectedTimes);
  }
};
