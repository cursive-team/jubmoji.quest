"use client";

// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { useEffect, useState } from "react";

export type CardholderTapModalProps = {
  message: string;
};

export default function CardholderTapModal({
  message,
}: CardholderTapModalProps) {
  const [statusText, setStatusText] = useState("Waiting for NFC setup...");

  useEffect(() => {
    async function runScan() {
      const messageHash =
        "\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01";
      let command = {
        name: "sign",
        keyNo: 1,
        digest: Buffer.from(messageHash).toString("hex"),
      };

      let res;
      try {
        // --- request NFC command execution ---
        res = await execHaloCmdWeb(command, {
          statusCallback: (cause: any) => {
            if (cause === "init") {
              setStatusText(
                "Please tap the tag to the back of your smartphone and hold it..."
              );
            } else if (cause === "retry") {
              setStatusText(
                "Something went wrong, please try to tap the tag again..."
              );
            } else if (cause === "scanned") {
              setStatusText(
                "Tag scanned successfully, post-processing the result..."
              );
            } else {
              setStatusText(cause);
            }
          },
        });

        console.log({
          digest: res.input.digest,
          rawSignature: res.signature.raw,
          publicKey: res.publicKey,
        });

        alert(
          JSON.stringify({
            digest: res.input.digest,
            rawSignature: res.signature.raw,
            publicKey: res.publicKey,
          })
        );

        console.log("Tapped card with public key: ", res.publicKey);
        setStatusText("Tapped card! Process result...");
      } catch (error) {
        console.error(error);
        setStatusText("Scanning failed, please try again.");
      }
    }

    runScan();
  }, [message]);

  return (
    <div>
      <span className="font-helvetica text-[23px] font-bold leading-none text-woodsmoke-100">
        Place the NFC card on your phone.
      </span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">
        {statusText}
      </span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">
        {"If you still can't tap, check out the "}
        <a
          href="https://pse-team.notion.site/Card-tapping-instructions-ac5cae2f72e34155ba67d8a251b2857c?pvs=4"
          target="_blank"
          className="underline"
        >
          troubleshooting guide
        </a>
        .
      </span>
    </div>
  );
}