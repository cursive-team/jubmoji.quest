"use client";

import Image from "next/image";
import {
  HaLoNoncePCDArgs,
  HaLoNoncePCD,
  HaLoNoncePCDPackage,
} from "@pcd/halo-nonce-pcd";
import { useEffect, useState } from "react";
import { cardPubKeys } from "@/lib/cardPubKeys";
import { saveSigmoji } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import { Button } from "./ui/Button";
import { Sigmoji } from "@/types";
import { attestationText } from "@/lib/attestationData";
import { useSigmojis } from "@/hooks/useSimojis";

interface CollectProps {
  args: HaLoNoncePCDArgs;
}
export default function Collect({ args }: CollectProps) {
  const router = useRouter();

  const [pcd, setPCD] = useState<HaLoNoncePCD | undefined>(undefined);
  const [imageLink, setImageLink] = useState<string | undefined>(undefined);
  const [alreadyCollected, setAlreadyCollected] = useState(false);
  const { data: sigmojis = [] } = useSigmojis();

  const alertIncognito = async () => {
    const isIncognito = await detectIncognito();
    if (isIncognito.isPrivate) {
      alert(
        "Please copy this link into a non-incognito tab in order to save your Sigmojis!"
      );
    }
  };

  useEffect(() => {
    const generatePCD = async () => {
      // make the main signature PCD
      let producedPCD;
      try {
        producedPCD = await HaLoNoncePCDPackage.prove(args);
      } catch (e) {
        router.push("/");
        return;
      }
      if (
        producedPCD === undefined ||
        !(await HaLoNoncePCDPackage.verify(producedPCD))
      ) {
        router.push("/");
        return;
      }

      // make sure we haven't already collected this sigmoji if it isn't an event one
      for (const sigmoji of sigmojis) {
        if (
          sigmoji.PCD.claim.pubkeyHex.toLowerCase() ===
            "04cf92e6ba430b9850fb9d32f37205cd0824ffacf9d67db38dada0e38a22722556b376390fecda5c3672e1b1a96d10c758841623f709420bb4c778d8620aa21694" &&
          sigmoji.PCD.claim.nonce <= 114
        ) {
          // users can recollect if they already have the pinata from vivek
          continue;
        }

        if (
          sigmoji.PCD.claim.pubkeyHex.toLowerCase() ===
          producedPCD.claim.pubkeyHex.toLowerCase()
        ) {
          setImageLink(sigmoji.emojiImg);
          setAlreadyCollected(true);
          return;
        }
      }

      // pull correct image and save sigmoji to localStorage
      for (const entry of Object.entries(cardPubKeys)) {
        if (
          entry[1].secondaryPublicKeyRaw.toLowerCase() ===
          producedPCD.claim.pubkeyHex.toLowerCase()
        ) {
          const newSigmoji: Sigmoji = {
            emojiImg: entry[1].image,
            PCD: producedPCD,
            ZKP: "",
          };
          await saveSigmoji(newSigmoji);
          setImageLink(entry[1].image);
          break;
        }
      }

      setPCD(producedPCD);
    };

    generatePCD();
  }, [args, router]);

  return (
    <div className="px-2 justify-start items-start inline-flex">
      <div className="w-[264px] flex-col justify-start items-center gap-8 inline-flex text-center">
        {pcd && imageLink ? (
          <>
            <h3 className="text-[23px] font-bold text-woodsmoke-100 leading-normal">
              Yay, collected!
            </h3>
            <Image
              src={`/emoji-photo/${imageLink}`}
              width="160"
              height="160"
              alt="emoji"
            />
            <span className="text-base font-medium leading-[140%] text-woodsmoke-100">
              {attestationText(pcd) !== undefined
                ? `You have collected a "${attestationText(pcd)}" attestation.`
                : `You have edition ${pcd.claim.nonce} of this Sigmoji.`}
            </span>
          </>
        ) : alreadyCollected ? (
          <>
            <h3 className="text-[23px] text-normal text-center font-bold text-woodsmoke-100 leading-tight">
              {"You've already collected this sigmoji."}
            </h3>
            <Image
              src={`/emoji-photo/${imageLink}`}
              width="160"
              height="160"
              alt="emoji"
            />
          </>
        ) : (
          <div className="flex justify-center items-center">Loading...</div>
        )}
        <Button
          className="w-full"
          variant="secondary"
          onClick={async () => {
            await alertIncognito();
            router.push("/");
          }}
        >
          <div className="flex gap-2 items-center">
            <span>Back to app</span>
            <Image
              src="/images/arrow-right-line.svg"
              width="16"
              height="16"
              alt="arrow"
            />
          </div>
        </Button>
      </div>
    </div>
  );
}
