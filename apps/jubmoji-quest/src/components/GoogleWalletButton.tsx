import { loadBackupState, saveBackupState } from "../lib/dev_localStorage";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as jose from "jose";
import { GOOGLE_WALLET } from "../constants";
import { useGoogleWallet } from "../hooks/useGoogleWallet";
import { useJubmojis } from "@/hooks/useJubmojis";
import { serializeJubmojiList } from "jubmoji-api";

export const GoogleWalletButton = () => {
  const { data: jubmojis } = useJubmojis();
  const { getClaims } = useGoogleWallet();

  const [updateBackup, setUpdateBackup] = useState<boolean>();
  const [saveUrl, setSaveUrl] = useState<string>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [serial, setSerial] = useState<string>();

  // determine if user already has a google backup
  useEffect(() => {
    const loadBackup = async () => {
      if (!jubmojis) return;

      const backup = await loadBackupState();
      if (backup !== undefined && backup.type === "google") {
        // just updating backup, use Wallet API
        setUpdateBackup(true);
        setSaveUrl(
          `/api/updateGooglePass?number=${jubmojis.length}&serial=${
            backup.serialNum
          }&collection=${serializeJubmojiList(jubmojis)}`
        );
        setSerial(backup.serialNum);
      } else {
        // first time saving backup, use save URL
        setUpdateBackup(false);

        // create save URL for wallet
        const claims = await getClaims({
          jubmojiWalletBackup: serializeJubmojiList(jubmojis),
          number: jubmojis.length,
        });
        if (!claims) return;
        const PRIVATE_KEY = await jose.importPKCS8(
          GOOGLE_WALLET.PRIVATE_KEY,
          "RS256"
        );
        const token = await new jose.SignJWT(claims)
          .setProtectedHeader({ alg: "RS256", typ: "JWT" })
          .setIssuedAt() // Add issued at time (iat)
          .sign(PRIVATE_KEY);
        setSaveUrl(`https://pay.google.com/gp/v/save/${token}`);
        setSerial(GOOGLE_WALLET.OBJECT_ID);
      }
    };

    loadBackup();
  }, [jubmojis, getClaims]);

  const isDisabled = !jubmojis || !saveUrl || !updateBackup || !serial;

  const onAddToWallet = () => {
    if (isDisabled) return;

    if (updateBackup) {
      fetch(saveUrl).then((response) => {
        if (response.status === 200) {
          setUpdated(true);
        }
      });
    } else if (!updateBackup) {
      saveBackupState({
        type: "google",
        serialNum: serial,
      });
      window.location.href = saveUrl;
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="margin-0"
        onClick={onAddToWallet}
        disabled={isDisabled}
      >
        {updated ? (
          <span className="font-helvetica text-h4 font-bold leading-none text-woodsmoke-100">
            Updated!
          </span>
        ) : (
          <Image
            src="/images/google-wallet.svg"
            alt="Add To Google Wallet"
            width={264}
            height={52}
            sizes="100vw"
            style={isDisabled ? { filter: "grayscale(100%)" } : {}}
          />
        )}
      </button>
    </div>
  );
};
