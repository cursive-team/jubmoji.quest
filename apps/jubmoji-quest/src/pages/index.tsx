import { AppleWalletButton } from "../components/AppleWalletButton";
import { GoogleWalletButton } from "../components/GoogleWalletButton";
import { useSigmojis } from "../hooks/useSimojis";

const BackupSection = () => {
  const { isLoading: isLoadingSigmojis, data: sigmojis } = useSigmojis();

  const hasSigmojis = sigmojis && sigmojis.length > 0 && !isLoadingSigmojis;

  if (isLoadingSigmojis) return <div>Loading...</div>;
  if (!hasSigmojis) return null;
  return (
    <div className="flex flex-col gap-2">
      <GoogleWalletButton />
      <AppleWalletButton />
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <BackupSection />
    </div>
  );
}
