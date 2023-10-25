import { JubmojiPower } from "@/types";
import { Jubmoji } from "jubmoji-api";
import QRCode from "react-qr-code";

import { useState } from "react";
import { PowerWrapper } from "../PowerWrapper";
import Image from "next/image";
import { Icons } from "../Icons";
import { usePower } from "@/hooks/useFetchPowers";
import { cn } from "@/lib/utils";

export type QRCodePowerProps = {
  power: JubmojiPower;
  jubmojis: Jubmoji[];
};

export default function QRCodePower({ power, jubmojis }: QRCodePowerProps) {
  const [url, setUrl] = useState<string>();

  const usePowerMutation = usePower();

  if (!url) {
    return (
      <PowerWrapper>
        <div className="flex items-center gap-4 justify-between">
          <div className="relative">
            <span className="absolute top-[6px] left-[12px] text-[13px] font-normal font-dm-sans text-shark-300">
              Tap and hold to prove
            </span>
            <Icons.bubble className="text-shark-800" />
          </div>
          <button
            type="button"
            onClick={() =>
              usePowerMutation
                .mutateAsync({
                  power,
                  jubmojis,
                })
                .then((url) => {
                  if (typeof url === "string") {
                    setUrl(url);
                  } else {
                    // TODO: Show error to user
                  }
                })
            }
          >
            <Image
              src="/images/zkp-maker.png"
              width={150}
              height={150}
              alt="zkp marker"
              className={cn("", {
                "animate animate-pulse": usePowerMutation.isLoading,
              })}
            />
          </button>
        </div>
      </PowerWrapper>
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
