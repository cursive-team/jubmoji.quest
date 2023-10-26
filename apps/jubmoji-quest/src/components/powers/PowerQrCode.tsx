import QRCode from "react-qr-code";
import { useState } from "react";
import { PowerWrapper } from "../PowerWrapper";
import Image from "next/image";
import { Icons } from "../Icons";
import { usePowerMutation } from "@/hooks/useFetchPowers";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { classed } from "@tw-classed/react";
import { PowerContentProps } from "@/pages/powers/[id]";

const QrCodeWrapper = classed.div(
  "bg-white rounded-[8px] w-full max-w-[156px]"
);

const PowerQrCode = ({ power, jubmojis }: PowerContentProps) => {
  const [url, setUrl] = useState<string>();

  const powerMutation = usePowerMutation();

  return (
    <PowerWrapper>
      {!url ? (
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
              powerMutation
                .mutateAsync({
                  power,
                  jubmojis,
                })
                .then((data) => {
                  if (typeof data === "string") {
                    setUrl(data);
                  } else {
                    toast.error(data.error);
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
                "animate animate-pulse": powerMutation.isLoading,
              })}
            />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className=" font-dm-sans text-base font-medium text-shark-50">
              Title
            </span>
            <span className="flex flex-col gap-1 text-[13px] font-dm-sans text-shark-300 font-semibold">
              <span className="block">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(new Date())}
              </span>
              <span className="block text-tiny font-dm-sans text-shark-300 font-normal">
                {new Intl.DateTimeFormat("en-US", {
                  timeStyle: "medium",
                }).format(new Date())}
              </span>
            </span>
            <span className="text-[13px] font-dm-sans text-shark-300 font-semibold">
              Owner
            </span>
            <span className="text-tiny font-dm-sans text-shark-300">
              Location
            </span>
          </div>
          <QrCodeWrapper>
            <QRCode
              size={156}
              className="ml-auto p-4 h-auto w-full max-w-full"
              value={url}
              viewBox={`0 0 156 156`}
            />
          </QrCodeWrapper>
        </div>
      )}
    </PowerWrapper>
  );
};

PowerQrCode.displayName = "PowerQrCode";

export { PowerQrCode };
