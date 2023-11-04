import { PowerWrapper } from "../PowerWrapper";
import { useRedirectPowerMutation } from "@/hooks/useFetchPowers";
import toast from "react-hot-toast";
import { PowerContentProps } from "@/pages/powers/[id]";
import { Button } from "../ui/Button";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { ProvingState } from "jubmoji-api";

const RedirectPower = ({ power, jubmojis }: PowerContentProps) => {
  const [provingState, setProvingState] = useState<ProvingState>();
  const powerParams = power.powerParams as Prisma.JsonObject;
  const redirectUrl = powerParams.redirectUrl as string | undefined;
  const powerMutation = useRedirectPowerMutation();

  const onUpdateProvingState = (newProvingState: ProvingState) => {
    if (newProvingState.numProofsCompleted === newProvingState.numProofsTotal) {
      setProvingState(undefined);
    } else {
      setProvingState(newProvingState);
    }
  };

  const onRedirect = async () => {
    try {
      const serializedProof = await powerMutation.mutateAsync({
        power,
        jubmojis,
        onUpdateProvingState,
      });

      const url = new URL(redirectUrl!);
      url.searchParams.append("proof", encodeURIComponent(serializedProof));

      window.open(url.href, "_blank");
    } catch (e) {
      console.error(e);
      toast.error("Failed to use power");
    }
  };

  if (!redirectUrl) {
    return null;
  }

  const proofPercentageProgress = provingState
    ? (provingState.numProofsCompleted / (provingState.numProofsTotal || 1)) *
      100
    : 0;
  const proofProgressDisplayText = `Proving ownership of Jubmoji ${provingState?.numProofsCompleted} of ${provingState?.numProofsTotal}`;

  return (
    <PowerWrapper>
      <div className="flex flex-col items-center gap-4">
        {provingState && (
          <div className="flex justify-center items-center gap-2 self-stretch">
            <span className="font-bold font-hind-siliguri text-shark-600 text-[13px] leading-[120%]">
              {proofProgressDisplayText}
            </span>
            <div className="flex items-center self-stretch border border-shark-400 w-full">
              <div
                className={`h-full bg-shark-400`}
                style={{
                  width: `${proofPercentageProgress}%`,
                }}
              />
            </div>
          </div>
        )}
        <span>Using this power will redirect you to: {redirectUrl}</span>
        <Button variant="secondary" onClick={onRedirect}>
          Use Power
        </Button>
      </div>
    </PowerWrapper>
  );
};

RedirectPower.displayName = "RedirectPower";

export { RedirectPower };
