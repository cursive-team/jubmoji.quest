"use client";

import ForegroundTapModal from "@/components/modals/ForegroundTapModal";
import { NfcCardSignMessageResult } from "jubmoji-api";
import { useState } from "react";

export default function DevTapPage() {
  const [isTapping, setIsTapping] = useState(false);

  const exampleMessage = "Hello, world!";

  const exampleOnTap = async ({
    digest,
    rawSignature,
    publicKey,
  }: NfcCardSignMessageResult) => {
    console.log("logging from on tap");
    console.log("digest: ", digest);
    console.log("raw sig s: ", rawSignature.s);
    console.log("raw sig r: ", rawSignature.r);
    console.log("raw sig v: ", rawSignature.v);
    console.log("public key: ", publicKey);
  };

  return (
    <div>
      {isTapping ? (
        <ForegroundTapModal message={exampleMessage} onTap={exampleOnTap} />
      ) : (
        <button onClick={() => setIsTapping(true)}>Tap</button>
      )}
    </div>
  );
}
