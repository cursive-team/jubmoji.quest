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
  const {
    number,
    serial,
    collection,
    score = 0,
  } = request.query ?? ({} as any);

  // Check for required params
  if (!number || !serial || !collection) {
    console.error(
      "[/api/generateApplePass] missing 'number', 'serial', or 'collection' field"
    );
    return res.send({
      status: 400,
      message: `[/api/generateApplePass] missing 'number', 'serial', or 'collection' field`,
    });
  }

  if (parseInt(number as string) > 40) {
    console.error("[/api/generateApplePass] number > 40");
    return res.status(400).json({
      success: false,
      message: `[/api/generateApplePass] number > 40`,
    });
  }

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
      model: path.resolve(process.cwd(), "./src/pages/api/models/sigmoji.pass"),
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

  pkPass.headerFields.push({
    key: "collected",
    label: "Collected",
    value: number + "/40",
  });

  pkPass.backFields.push({
    key: "retrieve-link",
    label: "Retrieve your collection",
    value: `http://nfctap.xyz/recover?collection=${collection}`,
  });

  pkPass.secondaryFields.push({
    key: "score",
    label: "Score",
    value: score?.toString(),
  });

  const buffer = pkPass.getAsBuffer();

  res.setHeader("Content-Disposition", 'attachment; filename="sigmoji.pkpass"');
  res.setHeader("Content-Type", "application/vnd.apple.pkpass");

  return res.send(buffer);
}
