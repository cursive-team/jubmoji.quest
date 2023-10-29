import { APP_CONFIG } from "../../constants";
import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import { PKPass } from "passkit-generator";
import path from "path";
import process from "process";

const {
  PASSKIT_GENERATOR_PASSPHRASE,
  PASSKIT_WWDR_BASE64_PEM,
  PASSKIT_SIGNERKEY_BASE64_PEM,
  PASSKIT_SIGNERCERT_BASE64_PEM,
} = process.env;
assert(PASSKIT_GENERATOR_PASSPHRASE, "Missing at least one passkit env var");

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { serial, collection } = request.query ?? ({} as any);
  const { COLLECTION_SIZE } = APP_CONFIG;

  // Check for required params
  if (!serial || !collection) {
    console.error(
      "[/api/generateApplePass] missing 'number', 'serial', or 'collection' field"
    );
    return res.send({
      status: 400,
      message: `[/api/generateApplePass] missing 'number', 'serial', or 'collection' field`,
    });
  }

  const serializedJubmojis = collection.toString().split(",");

  assert(PASSKIT_WWDR_BASE64_PEM, "Missing passkit wwdr cert");
  assert(PASSKIT_SIGNERKEY_BASE64_PEM, "Missing passkit signer key");
  assert(PASSKIT_SIGNERCERT_BASE64_PEM, "Missing passkit signer cert");

  const signerKey = Buffer.from(
    PASSKIT_SIGNERKEY_BASE64_PEM,
    "base64"
  ).toString("utf8");

  const signerCert = Buffer.from(
    PASSKIT_SIGNERCERT_BASE64_PEM,
    "base64"
  ).toString("utf8");

  const pkPass = await PKPass.from(
    {
      model: path.resolve(process.cwd(), "./src/pages/api/models/jubmoji.pass"),
      certificates: {
        wwdr: Buffer.from(PASSKIT_WWDR_BASE64_PEM, "base64").toString("utf8"),
        signerKeyPassphrase: PASSKIT_GENERATOR_PASSPHRASE,
        signerCert,
        signerKey,
      },
    },
    {
      serialNumber: `${serial ?? ""}`,
    }
  );

  // only secondaryField is emojis
  let emojiString = "";
  for (const serializedJubmoji of serializedJubmojis) {
    const emoji = serializedJubmoji.split("-")[0];
    emojiString += emoji;
  }
  pkPass.secondaryFields.push({
    key: "Emojis",
    label: "Jubmojis",
    value: emojiString,
  });

  // auxiliaryFields
  pkPass.auxiliaryFields.push({
    key: "location",
    label: "Location",
    value: APP_CONFIG.LOCATION,
  });

  pkPass.auxiliaryFields.push({
    key: "event",
    label: "Event",
    value: APP_CONFIG.EVENT_NAME,
  });

  pkPass.auxiliaryFields.push({
    key: "year",
    label: "Year",
    value: APP_CONFIG.YEAR,
  });

  // headerFields
  const collectedItemsLabel = `${serializedJubmojis.length}/${APP_CONFIG.COLLECTION_SIZE}`;
  pkPass.headerFields.push({
    key: "collected",
    label: "Collected",
    value: collectedItemsLabel,
  });

  // backFields
  pkPass.backFields.push({
    key: "retrieve-link",
    label: "Restore your collection",
    value: APP_CONFIG.RECOVERY_URL(collection.toString()),
  });

  const buffer = pkPass.getAsBuffer();

  res.setHeader("Content-Disposition", 'attachment; filename="jubmoji.pkpass"');
  res.setHeader("Content-Type", "application/vnd.apple.pkpass");

  return res.send(buffer);
}
