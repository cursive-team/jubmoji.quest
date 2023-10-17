import {
  APP_CONFIG,
  GOOGLE_PASS_CREDENTIALS,
  GOOGLE_WALLET,
} from "@/constants";

interface GetClaimsProps {
  sigmojiWalletBackup?: string;
  number?: number;
}
export const useGoogleWallet = () => {
  const getClaims = async ({ sigmojiWalletBackup, number }: GetClaimsProps) => {
    if (!number || !sigmojiWalletBackup) return;

    const collectedItemsLabel = `${number.toString()}/${
      APP_CONFIG.COLLECTION_SIZE
    }`;

    /**
     * Setting up Google Wallet API variables that are relevant to Sigmoji I.
     *
     * It's okay to expose our Google Wallet API private key here because the
     * "useful" information in the passes are the signatures from the cards,
     * which cannot be forged. Without those signatures, no valid ZKPs can be made.
     * This is a necessary hack to avoid sending the user's private signatures
     * to the server to get signed, which is usually how passes are handled.
     */
    const genericObject = {
      id: GOOGLE_WALLET.OBJECT_ID,
      classId: GOOGLE_WALLET.CLASS_ID,
      genericType: "GENERIC_TYPE_UNSPECIFIED",
      hexBackgroundColor: GOOGLE_WALLET.HEX_BACKGROUND_COLOR,
      logo: {
        sourceUri: {
          uri: GOOGLE_WALLET.LOGO_URI,
        },
      },
      barcode: {
        type: "QR_CODE",
        value: APP_CONFIG.WEBSITE_URI,
        alternateText: APP_CONFIG.APP_SLUG,
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
          value: "Collection",
        },
      },
      header: {
        defaultValue: {
          language: "en",
          value: APP_CONFIG.APP_NAME,
        },
      },
      textModulesData: [
        {
          id: "score",
          header: "SCORE",
          body: "?",
        },
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
            uri: APP_CONFIG.RECOVERY_URL(`${sigmojiWalletBackup}`),
            description: "Retrieve your collection",
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

  return {
    getClaims,
  };
};
