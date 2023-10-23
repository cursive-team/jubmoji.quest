import AppHeader from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { JubmojiCollectionCard } from "@/types";
import { classed } from "@tw-classed/react";
import { cardPubKeys } from "jubmoji-api";
import React, { useEffect, useState } from "react";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";

const BackupSection = () => {
  const { isLoading: isLoadingJubmojis, data: jubmojis } = useJubmojis();

  const hasJubmojis = jubmojis && jubmojis.length > 0 && !isLoadingJubmojis;

  if (isLoadingJubmojis) return <div>Loading...</div>;
  if (!hasJubmojis) return null;
  return (
    <div className="flex flex-col gap-2">
      <GoogleWalletButton />
      <AppleWalletButton />
    </div>
  );
};

const JubmojiNavItem = classed.div(
  "block p-2 w-[32px] h-16 rounded cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-shark-600 mx-2 first:ml-0 mx-2 last:mr-0",
        false: "bg-shark-900",
      },
    },
  }
);

const JubmojiNavWrapper = classed.div(
  "grid grid-flow-col auto-cols-max h-20 py-[6px] gap-[1px] px-2 fixed left-0 rigth-0 bottom-[80px] w-full overflow-scroll"
);

const JubmojiNav = () => {
  const [active, setActive] = React.useState<number | undefined>(undefined);

  const jubmojis = Array.from(Array(12).keys());

  const onSelectJubmoji = (jubmoji: any, index?: number) => {
    setActive(index);
  };

  return (
    <JubmojiNavWrapper>
      {jubmojis?.map((jubmoji, index) => {
        const isActive = index === active;

        return (
          <JubmojiNavItem
            key={index}
            active={isActive}
            onClick={() => onSelectJubmoji(jubmoji, index)}
          />
        );
      })}
    </JubmojiNavWrapper>
  );
};

export default function JubmojisPage() {
  const { data: jubmojis = [] } = useJubmojis();
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [jubmojiCollectionCards, setJubmojiCollectionCards] = useState<
    Record<number, JubmojiCollectionCard>
  >({});

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch("/api/cards");

      if (!response.ok) {
        console.error("Could not fetch Jubmoji cards.");
        setJubmojiCollectionCards([]);
      }

      const collectionCards: JubmojiCollectionCard[] = await response.json();
      const collectionCardMap: Record<number, JubmojiCollectionCard> = {};
      collectionCards.forEach((card) => {
        collectionCardMap[card.index] = card;
      });

      setJubmojiCollectionCards(collectionCardMap);
    };

    fetchCards();
  }, []);

  return (
    <>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Jubmojis
      </Modal>
      <div className="flex flex-col">
        <AppHeader
          title="YOUR JUBMOJIS"
          actions={
            <button
              onClick={() => setIsModalOpen(!infoModalOpen)}
              type="button"
            >
              <Icons.info />
            </button>
          }
        />
        <Input placeholder="Search your private collection" />
        {jubmojis.map((jubmoji, i) => {
          if (!jubmojiCollectionCards[jubmoji.pubKeyIndex]) {
            return;
          }

          // Emoji is fixed in hardware and fetched from hardcoded card metadata file
          const { emoji } = cardPubKeys[jubmoji.pubKeyIndex];
          // Name, owner, and collectsFor are set by the current cardholder and fetched from the backend
          const { name, owner, collectsFor } =
            jubmojiCollectionCards[jubmoji.pubKeyIndex];
          // Image path is fetched from the hardcoded card image map for offline use
          const imagePath = cardPubKeys[jubmoji.pubKeyIndex].imageBlobUrl;

          return (
            <div key={i} className="my-4">
              <CollectionCard
                label={name}
                icon={emoji}
                edition={jubmoji.msgNonce}
                owner={owner}
                cardBackImage={imagePath}
                actions={<span>backed up</span>}
                quests={collectsFor}
              />
            </div>
          );
        })}
        <div className="mt-auto">
          <JubmojiNav />
        </div>
      </div>
    </>
  );
}
