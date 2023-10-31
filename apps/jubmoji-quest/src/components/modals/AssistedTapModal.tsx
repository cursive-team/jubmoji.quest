// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalProps } from "./Modal";
import { Card } from "../cards/Card";
import { Button } from "../ui/Button";
import Image from "next/image";
import MobileDetect from "mobile-detect";
import Link from "next/link";
import { cardPubKeys, recoverCounterMessageHash } from "jubmoji-api";
import {
  Signature,
  derDecodeSignature,
  publicKeyFromString,
  recoverPubKeyIndexFromSignature,
} from "babyjubjub-ecdsa";

type Device = "android" | "ios";
const DeviceImageMapping: Record<Device, string> = {
  android: "/images/tap-phone-android.png",
  ios: "/images/tap-phone-ios.png",
};

const AssistedTapModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const md = useRef<any>();
  useEffect(() => {
    md.current = new MobileDetect(window?.navigator?.userAgent);
  }, []);
  const [statusText, setStatusText] = useState<string>();

  const device: Device = md?.current?.is("iPhone") ? "ios" : "android";

  const onReadyToTap = async () => {
    let command = {
      name: "sign_random",
      keyNo: 98,
    };

    let res;
    try {
      // --- request NFC command execution ---
      res = await execHaloCmdWeb(command, {
        statusCallback: (cause: any) => {
          if (cause === "init") {
            setStatusText(
              "Please hold the tag to the back of your smartphone as pictured..."
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

      setStatusText("Tapped card! Processing result...");

      const msgHash = recoverCounterMessageHash(
        parseInt(res.counter),
        res.digest.substring(8)
      );

      const sig: Signature = derDecodeSignature(res.signature);

      const pubKeyIndex = recoverPubKeyIndexFromSignature(
        sig,
        msgHash,
        cardPubKeys.map((cardPubKey) =>
          publicKeyFromString(cardPubKey.pubKeyJub)
        )
      );

      const pkN = "6200" + cardPubKeys[pubKeyIndex].pubKeyJub;
      window.location.href = `/collect#?pkN=${pkN}&rnd=${res.digest}&rndsig=${res.signature}`;
    } catch (error) {
      console.error(error);
      setStatusText(`Scanning failed, please try again. Error: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-center my-auto">
        <Card.Title className="!font-[22px]">
          Hold the NFC card by your phone for 1-2 seconds.
        </Card.Title>
        <Image
          src={DeviceImageMapping[device]}
          width={180}
          height={200}
          alt="tap card"
          className="mx-auto py-12"
        />
        <div className="flex flex-col gap-8">
          {statusText && <span className=" font-dm-sans ">{statusText}</span>}
          <Button variant="secondary" onClick={onReadyToTap}>
            Ready to tap
          </Button>
          <span className=" font-dm-sans ">
            {`If you still can't tap, check out`} <br />
            <Link className="underline" href="/">
              the troubleshooting guide.
            </Link>
          </span>
        </div>
      </div>
    </Modal>
  );
};

AssistedTapModal.displayName = "AssistedTapModal";
export { AssistedTapModal };
