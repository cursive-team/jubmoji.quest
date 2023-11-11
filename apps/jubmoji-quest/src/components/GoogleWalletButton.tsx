import { loadBackupState, writeBackupState } from "../lib/localStorage";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as jose from "jose";
import {
  APP_CONFIG,
  GOOGLE_PASS_CREDENTIALS,
  GOOGLE_WALLET,
} from "../constants";
import { useJubmojis } from "@/hooks/useJubmojis";
import { cardPubKeys, succinctSerializeJubmojiList } from "jubmoji-api";
import toast from "react-hot-toast";

export const GoogleWalletButton = () => {
  const { data: jubmojis } = useJubmojis();

  const [saveUrl, setSaveUrl] = useState<string>();
  const [updateUrl, setUpdateUrl] = useState<string>();
  const [serial, setSerial] = useState<string>();
  const [updated, setUpdated] = useState<boolean>(false);

  // determine if user already has a google backup
  useEffect(() => {
    const loadBackup = async () => {
      if (!jubmojis) return;

      const backup = await loadBackupState();
      const succinctSerialization = succinctSerializeJubmojiList(jubmojis);

      // prep an update link if user already has a backup
      // need to also generate save link in case user didn't actually backup
      if (backup !== undefined && backup.type === "google") {
        setUpdateUrl(
          `/api/updateGooglePass?number=${jubmojis.length}&serial=${backup.serialNum}&collection=${succinctSerialization}`
        );
      }

      const backupSerial = crypto.randomUUID();
      const claims = await getClaims({
        jubmojiWalletBackup: succinctSerializeJubmojiList(jubmojis),
        number: jubmojis.length,
        serial: backupSerial,
        emojis: jubmojis
          .map((jubmoji) => cardPubKeys[jubmoji.pubKeyIndex].emoji)
          .join(""),
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
      setSerial(GOOGLE_WALLET.OBJECT_ID(backupSerial));
    };

    loadBackup();
  }, [jubmojis]);

  const isDisabled = !jubmojis || !saveUrl || !serial;

  const onAddToWallet = async () => {
    if (isDisabled) return;

    toast("Generating wallet backup...", {
      icon: "⏳",
    });

    if (updateUrl) {
      const response = await fetch(updateUrl);
      if (response.status === 200) {
        setUpdated(true);
        return;
      }
      // If update was unsuccessful, fall back to save. This can happen if user
      // clicks backup from the app but doesn't actually add it to their wallet
    }

    await writeBackupState({
      type: "google",
      serialNum: serial,
    });
    window.location.href = saveUrl;
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

interface GetClaimsProps {
  jubmojiWalletBackup?: string;
  number?: number;
  serial?: string;
  emojis?: string;
}

const getClaims = async ({
  jubmojiWalletBackup,
  number,
  serial,
  emojis,
}: GetClaimsProps) => {
  if (!number || !jubmojiWalletBackup || !serial) return;

  const collectedItemsLabel = `${number.toString()}/${
    APP_CONFIG.COLLECTION_SIZE
  }`;

  const genericObject = {
    id: GOOGLE_WALLET.OBJECT_ID(serial),
    classId: GOOGLE_WALLET.CLASS_ID,
    genericType: "GENERIC_TYPE_UNSPECIFIED",
    hexBackgroundColor: GOOGLE_WALLET.HEX_BACKGROUND_COLOR,
    logo: {
      sourceUri: {
        uri: GOOGLE_WALLET.LOGO_URI,
      },
    },
    cardTitle: {
      defaultValue: {
        language: "en",
        value: APP_CONFIG.APP_SLUG,
      },
    },
    heroImage: {
      sourceUri: {
        uri: GOOGLE_WALLET.HERO_IMAGE_URI,
      },
    },
    subheader: {
      defaultValue: {
        language: "en",
        value: "Jubmojis",
      },
    },
    header: {
      defaultValue: {
        language: "en",
        value: emojis,
      },
    },
    textModulesData: [
      {
        id: "collected",
        header: "COLLECTED",
        body: collectedItemsLabel,
      },
      {
        id: "location",
        header: "LOCATION",
        body: APP_CONFIG.LOCATION,
      },
      {
        id: "event",
        header: "EVENT",
        body: APP_CONFIG.EVENT_NAME,
      },
      {
        id: "year",
        header: "YEAR",
        body: APP_CONFIG.YEAR,
      },
    ],
    linksModuleData: {
      uris: [
        {
          uri: APP_CONFIG.RECOVERY_URL(`${jubmojiWalletBackup}`),
          description: "Restore your collection",
          id: "official_site",
        },
      ],
    },
  };

  const claims = {
    iss: GOOGLE_PASS_CREDENTIALS.client_email,
    aud: "google",
    origins: [],
    typ: "savetowallet",
    payload: {
      genericObjects: [genericObject],
    },
  };

  return claims;
};
