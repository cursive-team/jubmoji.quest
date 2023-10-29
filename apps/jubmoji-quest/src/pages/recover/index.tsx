import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import { succinctDeserializeJubmojiList } from "jubmoji-api";
import { unionJubmojisByPubKey, writeJubmojis } from "@/lib/localStorage";
import { Card } from "@/components/cards/Card";
import { RecoverCard } from "@/components/cards/RecoverCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Modal } from "@/components/modals/Modal";
import { useJubmojis } from "@/hooks/useJubmojis";

export default function RecoverJubmojiPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { isLoading: isLoadingJubmojis, data: jubmojis = [] } = useJubmojis();
  const [isLoadingSerialization, setIsLoadingSerialization] =
    useState<boolean>(true);

  // ensure users do not go to rest of app if they are in incognito
  const alertIncognito = async () => {
    const isIncognito = await detectIncognito();
    if (isIncognito.isPrivate) {
      alert(
        "Please copy this link into a non-incognito tab in order to save your Jubmojis!"
      );
    }
  };

  useEffect(() => {
    async function getCollectionFromUrl() {
      const urlParams = new URLSearchParams(location.hash.slice(1));
      const succinctSerializationURI = urlParams.get("collection");
      if (!succinctSerializationURI) {
        router.push("/");
        return;
      }
      const succinctSerialization = decodeURIComponent(
        succinctSerializationURI
      );
      const recoveredJubmojis = succinctDeserializeJubmojiList(
        succinctSerialization
      );
      const uniquePubKeyJubmojis = await unionJubmojisByPubKey(
        recoveredJubmojis,
        jubmojis
      );
      await writeJubmojis(uniquePubKeyJubmojis);
      setIsLoadingSerialization(false);
    }

    if (typeof window !== "undefined" && !isLoadingJubmojis) {
      getCollectionFromUrl();
    }
  }, [router, jubmojis, isLoadingJubmojis]);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      closable={!isLoadingSerialization}
      onClose={() => {
        router.push(`/jubmojis`);
      }}
    >
      <div className="my-auto flex flex-col gap-8">
        {isLoadingSerialization ? (
          <Card.Base className="h-[260px]" loading />
        ) : (
          <RecoverCard
            className="text-center"
            title={"Jubmojis recovered!"}
            icon={"✅"}
            description={
              "If you had duplicate jubmojis, only the lowest nonce was kept. This will not affect your app experience!"
            }
          />
        )}

        <div className="flex flex-col gap-8">
          <Link href="/jubmojis">
            <Button
              icon={<Icons.arrowRight className="text-black" />}
              iconPosition="right"
              variant="secondary"
              disabled={isLoadingSerialization}
            >
              Back to app
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
