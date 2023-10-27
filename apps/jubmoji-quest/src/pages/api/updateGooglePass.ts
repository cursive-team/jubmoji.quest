import { GoogleAuth } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";
import { APP_CONFIG, GOOGLE_PASS_CREDENTIALS } from "../../constants";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (request.method !== "GET") return res.status(404).json({ success: false });

  const { number, serial, collection } = request.query ?? ({} as any);
  const { COLLECTION_SIZE } = APP_CONFIG;

  // Check for required params
  if (!number || !serial || !collection) {
    console.error(
      `[/api/updateGooglePass] missing 'number' or 'serial' or 'collection' field`
    );
    return res.status(400).json({
      success: false,
      message: `[/api/updateGooglePass] missing 'number' or 'serial' or 'collection' field`,
    });
  }

  if (parseInt(number as string) > COLLECTION_SIZE) {
    console.error(`[/api/updateGooglePass] number > ${COLLECTION_SIZE}`);
    return res.status(400).json({
      success: false,
      message: `[/api/updateGooglePass] number > ${COLLECTION_SIZE}`,
    });
  }

  const httpClient = new GoogleAuth({
    credentials: GOOGLE_PASS_CREDENTIALS,
    scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
  });

  const collectedItems = `${number}/${APP_CONFIG.COLLECTION_SIZE}}`;

  const updatedObject = {
    textModulesData: [
      {
        id: "collected",
        header: "COLLECTED",
        body: collectedItems,
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
          uri: APP_CONFIG.RECOVERY_URL(collection.toString()),
          description: "Restore your collection",
          id: "official_site",
        },
      ],
    },
  };

  await httpClient.request({
    url: `https://walletobjects.googleapis.com/walletobjects/v1/genericObject/${serial}`,
    method: "PATCH",
    data: updatedObject,
  });

  return res.status(200).json({ success: true });
}
