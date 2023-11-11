import { loadBackupState, writeBackupState } from "../lib/localStorage";
import { useJubmojis } from "@/hooks/useJubmojis";
import { succinctSerializeJubmojiList } from "jubmoji-api";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppleWalletButton = () => {
  const { data: jubmojis } = useJubmojis();
  const [serial, setSerial] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadBackup = async () => {
      if (!jubmojis) return;
      const backup = await loadBackupState();
      if (backup !== undefined && backup.type === "apple") {
        setSerial(backup.serialNum);
      } else {
        const uuid = crypto.randomUUID();
        setSerial(uuid);
      }
    };

    loadBackup();
  }, [jubmojis]);

  const onAddToWallet = async () => {
    if (!jubmojis || !serial) return;

    toast("Generating wallet backup...", {
      icon: "⏳",
    });

    const succinctSerialization = encodeURIComponent(
      succinctSerializeJubmojiList(jubmojis)
    );
    await writeBackupState({
      type: "apple",
      serialNum: serial,
    });
    window.location.href = `/api/generateApplePass?number=${jubmojis.length}&serial=${serial}&collection=${succinctSerialization}`;
  };

  return (
    <div className="flex justify-center">
      <button
        style={{ margin: 0 }}
        onClick={onAddToWallet}
        disabled={!jubmojis || !serial}
      >
        <Image
          src="/images/apple-wallet.svg"
          alt="Add to Apple Wallet"
          width={264}
          height={52}
          sizes="100vw"
          style={!jubmojis || !serial ? { filter: "grayscale(100%)" } : {}}
        />
      </button>
    </div>
  );
};
