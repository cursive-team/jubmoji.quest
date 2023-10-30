import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import { succinctDeserializeJubmojiList } from "jubmoji-api";
import { unionJubmojisByPubKey, writeJubmojis } from "@/lib/localStorage";
import { Card } from "@/components/cards/Card";
import { SimpleCard } from "@/components/cards/SimpleCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Modal } from "@/components/modals/Modal";
import { useJubmojis } from "@/hooks/useJubmojis";

enum RecoverStatus {
  LOADING = "Loading",
  IN_INCOGNITO = "You're in an incognito tab. Please copy this link into a non-incognito tab in order to recover your Jubmojis!",
  ERROR = "There was an error in recovering your jubmojis. Please make sure you copied the link correctly and try again.",
  SUCCESS = "If you had duplicate jubmojis, only the lowest nonce was kept. This will not affect your app experience!",
}

export default function RecoverJubmojiPage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const { isLoading: isLoadingJubmojis, data: jubmojis = [] } = useJubmojis();
  const [recoverStatus, setRecoverStatus] = useState<RecoverStatus>(
    RecoverStatus.LOADING
  );

  useEffect(() => {
    async function getCollectionFromUrl() {
      const isIncognito = await detectIncognito();
      if (isIncognito.isPrivate) {
        setRecoverStatus(RecoverStatus.IN_INCOGNITO);
        return;
      }

      try {
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
        setRecoverStatus(RecoverStatus.SUCCESS);
      } catch (err) {
        setRecoverStatus(RecoverStatus.ERROR);
      }
    }

    if (typeof window !== "undefined" && !isLoadingJubmojis) {
      getCollectionFromUrl();
    }
  }, [router, jubmojis, isLoadingJubmojis]);

  const renderData = (status: RecoverStatus) => {
    switch (status) {
      case RecoverStatus.LOADING:
        return <Card.Base className="h-[260px]" loading />;
      case RecoverStatus.IN_INCOGNITO:
        return (
          <SimpleCard
            className="text-center"
            title={"Incognito detected."}
            icon={"🕵️‍♀️"}
            description={RecoverStatus.IN_INCOGNITO}
          />
        );
      case RecoverStatus.ERROR:
        return (
          <SimpleCard
            className="text-center"
            title={"Unable to recover."}
            icon={"❌"}
            description={RecoverStatus.ERROR}
          />
        );
      case RecoverStatus.SUCCESS:
        return (
          <SimpleCard
            className="text-center"
            title={"Jubmojis recovered!"}
            icon={"✅"}
            description={RecoverStatus.SUCCESS}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      closable={[RecoverStatus.SUCCESS, RecoverStatus.ERROR].includes(
        recoverStatus
      )}
      onClose={() => {
        router.push(`/jubmojis`);
      }}
    >
      <div className="my-auto flex flex-col gap-8">
        {renderData(recoverStatus)}

        {[RecoverStatus.SUCCESS, RecoverStatus.ERROR].includes(
          recoverStatus
        ) && (
          <Link href="/jubmojis">
            <Button
              icon={<Icons.arrowRight className="text-black" />}
              iconPosition="right"
              variant="secondary"
            >
              Back to app
            </Button>
          </Link>
        )}
      </div>
    </Modal>
  );
}
