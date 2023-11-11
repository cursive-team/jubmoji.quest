// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import React, { useEffect, useRef } from "react";
import { Modal, ModalProps } from "./Modal";
import { Card } from "../cards/Card";
import { Button } from "../ui/Button";
import Image from "next/image";
import MobileDetect from "mobile-detect";
import { cardPubKeys, recoverCounterMessageHash } from "jubmoji-api";
import {
  Signature,
  derDecodeSignature,
  publicKeyFromString,
  recoverPubKeyIndexFromSignature,
} from "babyjubjub-ecdsa";
import { toast } from "react-hot-toast";

const AssistedTapModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const md = useRef<any>();
  useEffect(() => {
    md.current = new MobileDetect(window?.navigator?.userAgent);
  }, []);
  const deviceImage = md?.current?.is("iPhone")
    ? "/images/tap-phone-ios.png"
    : "/images/tap-phone-android.png";

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
          if (cause === "retry") {
            toast.error("Tapping failed, please try again.");
          } else {
            console.log("Tapping status", cause);
          }
        },
      });

      toast.success("Successful tap! Redirecting...");

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
      toast.error("Tapping failed, please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-center my-auto">
        <Card.Title className="!font-[22px] mt-16">
          Hold the card on your phone as pictured, then press start below.
        </Card.Title>
        <Image
          src={deviceImage}
          width={180}
          height={200}
          alt="tap card"
          className="mx-auto py-12"
        />
        <div className="flex flex-col gap-8">
          <Button variant="secondary" onClick={onReadyToTap}>
            Start assisted tap
          </Button>
          <span className=" font-dm-sans ">
            {`If you still can't tap, check out our `}
            <u>
              <a href="https://pse-team.notion.site/Card-tapping-instructions-ac5cae2f72e34155ba67d8a251b2857c">
                troubleshooting guide
              </a>
            </u>
            {"."}
          </span>
        </div>
      </div>
    </Modal>
  );
};

AssistedTapModal.displayName = "AssistedTapModal";
export { AssistedTapModal };
