import {
  loadBackupState,
  loadSigmojis,
  loadSigmojiWalletBackup,
  saveBackupState,
} from "../lib/localStorage";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as jose from "jose";
import { GOOGLE_WALLET } from "../constants";
import { useGoogleWallet } from "../hooks/useGoogleWallet";

export const GoogleWalletButton = () => {
  const [tempSerial, setTempSerial] = useState<string>();
  const [saveUrl, setSaveUrl] = useState<string | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);

  const [serial, setSerial] = useState<string>();
  const [number, setNumber] = useState<number>();
  const [sigmojiWalletBackup, setSigmojiWalletBackup] = useState<string>();
  const { getClaims } = useGoogleWallet();

  // determine if user already has a google backup
  useEffect(() => {
    const loadState = async () => {
      const [backup, sigmojis, serializedSigmojis] = await Promise.all([
        loadBackupState(),
        loadSigmojis(),
        loadSigmojiWalletBackup(),
      ]);

      if (backup !== undefined && backup.type === "google") {
        setSerial(backup.serialNum);
      }
      setNumber(sigmojis.length);
      setSigmojiWalletBackup(serializedSigmojis);
    };

    loadState();
  }, []);

  // generate save url if user doesn't have a backup already
  useEffect(() => {
    if (serial || !number || !sigmojiWalletBackup) return;
    const generateSaveUrl = async () => {
      const claims = await getClaims({ sigmojiWalletBackup, number });
      if (!claims) return;

      const PRIVATE_KEY = await jose.importPKCS8(
        GOOGLE_WALLET.PRIVATE_KEY,
        "RS256"
      );

      const token = await new jose.SignJWT(claims)
        .setProtectedHeader({ alg: "RS256", typ: "JWT" })
        .setIssuedAt() // Add issued at time (iat)
        .sign(PRIVATE_KEY);

      setTempSerial(GOOGLE_WALLET.OBJECT_ID);
      setSaveUrl(`https://pay.google.com/gp/v/save/${token}`);
    };

    generateSaveUrl();
  }, [getClaims, number, serial, sigmojiWalletBackup]);

  const onAddToWallet = () => {
    const SAVE_URI = `/api/updateGooglePass?number=${number}&serial=${serial}&collection=${sigmojiWalletBackup}`;
    if (!serial && saveUrl && tempSerial) {
      saveBackupState({
        type: "google",
        serialNum: tempSerial,
      });
      window.location.href = saveUrl;
    } else if (serial && number && sigmojiWalletBackup) {
      fetch(SAVE_URI).then((response) => {
        if (response.status === 200) {
          setUpdated(true);
        }
      });
    }
  };

  const isDisabled = !(saveUrl || (serial && number));

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
            style={
              saveUrl || (serial && number) ? {} : { filter: "grayscale(100%)" }
            }
          />
        )}
      </button>
    </div>
  );
};
