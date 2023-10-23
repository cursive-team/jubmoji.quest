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
