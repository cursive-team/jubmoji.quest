"use client";

import ForegroundTapModal from "@/components/modals/ForegroundTapModal";
import { NfcCardSignMessageResult } from "jubmoji-api";

export default function DevTapPage() {
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

  return <ForegroundTapModal message={exampleMessage} onTap={exampleOnTap} />;
}
