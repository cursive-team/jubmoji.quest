import {
  loadBackupState,
  loadSigmojis,
  saveBackupState,
  loadSigmojiWalletBackup,
} from "@/lib/localStorage";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AppleWalletButton = () => {
  const [serial, setSerial] = useState<string | undefined>(undefined);
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [sigmojiWalletBackup, setSigmojiWalletBackup] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const loadState = async () => {
      const [backup, sigmojis, serializedSigmojis] = await Promise.all([
        loadBackupState(),
        loadSigmojis(),
        loadSigmojiWalletBackup(),
      ]);

      setNumber(sigmojis.length);
      setSigmojiWalletBackup(serializedSigmojis);
      if (backup !== undefined && backup.type === "apple") {
        setSerial(backup.serialNum);
      } else {
        const uuid = crypto.randomUUID();
        setSerial(uuid);
      }
    };

    loadState();
  }, []);

  const onAddToWallet = async () => {
    const isValid = number && serial && sigmojiWalletBackup;
    if (!isValid) return;
    saveBackupState({
      type: "apple",
      serialNum: serial,
    });
    window.location.href = `/api/generateApplePass?number=${number}&serial=${serial}&collection=${sigmojiWalletBackup}`;
  };

  return (
    <div className="flex justify-center">
      <button
        style={{ margin: 0 }}
        onClick={onAddToWallet}
        disabled={!(number && serial)}
      >
        <Image
          src="/images/apple-wallet.svg"
          alt="Add to Apple Wallet"
          width={264}
          height={52}
          sizes="100vw"
          style={number && serial ? {} : { filter: "grayscale(100%)" }}
        />
      </button>
    </div>
  );
};
