import QRCode from "react-qr-code";
import { useState } from "react";
import { PowerWrapper } from "../PowerWrapper";
import { Icons } from "../Icons";
import { useQRCodePowerMutation } from "@/hooks/useFetchPowers";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { classed } from "@tw-classed/react";
import { PowerContentProps } from "@/pages/powers/[id]";
import { ProvingState } from "jubmoji-api";
import ProofProgressBar from "../ui/ProofProgressBar";

const QRCodeWrapper = classed.div(
  "bg-white rounded-[8px] w-full max-w-[156px]"
);

const PowerQrCode = ({ power, jubmojis }: PowerContentProps) => {
  const [url, setUrl] = useState<string>();
  const [provingState, setProvingState] = useState<ProvingState>();
  const powerMutation = useQRCodePowerMutation();

  const onUpdateProvingState = (newProvingState: ProvingState) => {
    setProvingState(newProvingState);
  };

  const onHandlePower = async () => {
    await toast.promise(
      powerMutation.mutateAsync({
        power,
        jubmojis,
        onUpdateProvingState,
      }),
      {
        loading: "Proving power...",
        error: (err: any) => {
          setProvingState(undefined);
          return (
            err?.message ??
            "There was an error claiming power. Please try again."
          );
        },
        success: (qrCodeUuid: any) => {
          setUrl(`${window.location.origin}/qr/${qrCodeUuid}`);
          setProvingState(undefined);
          return "Power claimed!";
        },
      }
    );
  };

  const proofProgressPercentage = provingState
    ? (provingState.numProofsCompleted / (provingState.numProofsTotal || 1)) *
      100
    : 0;
  const proofProgressDisplayText = `Proving ownership of Jubmoji ${provingState?.numProofsCompleted} of ${provingState?.numProofsTotal}`;

  return (
    <PowerWrapper>
      {!url ? (
        <div className="flex items-center gap-4 justify-between">
          <div className="relative">
            <span className="absolute top-[6px] left-[12px] text-[13px] font-normal font-dm-sans text-shark-300">
              Tap to prove
            </span>
            <Icons.bubble className="text-shark-800" width={100} />
          </div>
          {provingState ? (
            <ProofProgressBar
              displayText={proofProgressDisplayText}
              progressPercentage={proofProgressPercentage}
            />
          ) : (
            <button type="button" onClick={onHandlePower}>
              <div
                className={cn("w-[150px] h-[150px]  bg-cover", {
                  "animate animate-pulse": powerMutation.isLoading,
                })}
                style={{
                  backgroundImage: `url(/images/proof-icon.png)`,
                }}
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className=" font-dm-sans text-base font-medium text-shark-50">
              {power.name}
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
            {/* <span className="text-[13px] font-dm-sans text-shark-300 font-semibold">
              Owner
            </span>
            <span className="text-tiny font-dm-sans text-shark-300">
              Location
            </span> */}
          </div>
          <QRCodeWrapper>
            <QRCode
              size={156}
              className="ml-auto p-4 h-auto w-full max-w-full"
              value={url}
              viewBox={`0 0 156 156`}
            />
          </QRCodeWrapper>
        </div>
      )}
    </PowerWrapper>
  );
};

PowerQrCode.displayName = "PowerQrCode";

export { PowerQrCode };
