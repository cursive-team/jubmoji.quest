import { PowerWrapper } from "../PowerWrapper";
import { useRedirectPowerMutation } from "@/hooks/useFetchPowers";
import toast from "react-hot-toast";
import { PowerContentProps } from "@/pages/powers/[id]";
import { Button } from "../ui/Button";
import { Prisma } from "@prisma/client";

const RedirectPower = ({ power, jubmojis }: PowerContentProps) => {
  const powerParams = power.powerParams as Prisma.JsonObject;
  const redirectUrl = powerParams.redirectUrl as string | undefined;
  const powerMutation = useRedirectPowerMutation();

  const onRedirect = async () => {
    try {
      const serializedProof = await powerMutation.mutateAsync({
        power,
        jubmojis,
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

  return (
    <PowerWrapper>
      <div className="flex flex-col items-center gap-4">
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
