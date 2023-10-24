import { Button } from "@/components/ui/Button";
import { JubmojiPower } from "@/types";
import { Jubmoji } from "jubmoji-api";
import QRCode from "react-qr-code";
import {
  CLIENT_PATH_TO_CIRCUITS,
  createJubmojiPowerProof,
} from "@/lib/proving";
import { useState } from "react";

export type QRCodePowerProps = {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
};

export default function QRCodePower({ power, jubmojis }: QRCodePowerProps) {
  const [url, setUrl] = useState<string>();

  const onUsePower = async () => {
    alert("Using power...");

    let serializedProof;
    try {
      serializedProof = await createJubmojiPowerProof(
        power,
        jubmojis
        // __dirname + CLIENT_PATH_TO_CIRCUITS
      );
    } catch (error) {
      console.log(error);
      alert("Failed to use your power!");
      return;
    }

    const response = await fetch(`/api/qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        powerId: power.id,
        serializedProof,
      }),
    });

    const responseJson = await response.json();
    console.log("Response from /api/qr: ", responseJson);

    if (!response.ok) {
      alert("Failed to use your power!");
      return;
    }

    const { qrCodeUuid } = await response.json();
    setUrl(`${window.location.origin}/qr/${qrCodeUuid}`);
  };

  if (!url) {
    return (
      <div>
        <Button variant="secondary" onClick={onUsePower}>
          Use Power
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}
    >
      <QRCode
        size={512}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 512 512`}
      />
    </div>
  );
}
