import { useQuery } from "react-query";
import { loadBackupState } from "../lib/localStorage";
import { BackupState } from "../types";

export const useBackupState = () => {
  return useQuery(
    ["backupState"],
    async (): Promise<BackupState | undefined> => {
      const backupState = await loadBackupState();
      return backupState;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
