import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { classed } from "@tw-classed/react";
import { cardPubKeys } from "jubmoji-api";
import React, { useState } from "react";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";
import { getJubmojiCardByPubIndex, useFetchCards } from "@/hooks/useFetchCards";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import BackupModal from "@/components/modals/BackupModal";

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
  "flex items-center p-2 w-8 h-16 rounded cursor-pointer",
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
  "grid grid-flow-col auto-cols-max h-20 py-[6px] gap-[1px] px-2 fixed left-0 right-0 bottom-[80px] w-full overflow-scroll bg-shark-970 justify-center"
);

export default function JubmojisPage() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const { data: jubmojis = [] } = useJubmojis();
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);

  const { isLoading: isLoadingJubmojis, data: jubmojiCollectionCards = [] } =
    useFetchCards();

  const selectedPubKeyIndex = jubmojis[activeIndex]?.pubKeyIndex;
  const { emoji, name, owner, collectsFor, imagePath } =
    getJubmojiCardByPubIndex(jubmojiCollectionCards, selectedPubKeyIndex) ?? {};

  return (
    <>
      <BackupModal
        isOpen={backupModalOpen}
        setIsOpen={setBackupModalOpen}
      ></BackupModal>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Jubmojis
      </Modal>
      <div className="flex flex-col gap-4">
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
        <div className="grid grid-cols-[1fr_120px] justify-between gap-2">
          <Input placeholder="Search your private collection" />
          <Button
            icon={<Icons.download className="text-black" />}
            size="sm"
            variant="blue"
            onClick={() => setBackupModalOpen(true)}
          >
            Back up!
          </Button>
        </div>

        {isLoadingJubmojis ? (
          <Placeholder.Card size="2xl" />
        ) : (
          <>
            {name && owner && (
              <CollectionCard
                label={name}
                icon={emoji}
                edition={"jubmoji.msgNonce"}
                owner={owner}
                cardBackImage={imagePath}
                actions={
                  <Button size="sm" rounded icon={<Icons.compass />}>
                    Quests
                  </Button>
                }
                quests={collectsFor}
              />
            )}
          </>
        )}

        <div className="mt-auto">
          <JubmojiNavWrapper>
            {jubmojis?.map((jubmoji, index) => {
              const isActive = index === activeIndex;
              const { emoji } = cardPubKeys[jubmoji.pubKeyIndex];

              return (
                <JubmojiNavItem
                  key={index}
                  active={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  {emoji}
                </JubmojiNavItem>
              );
            })}
          </JubmojiNavWrapper>
        </div>
      </div>
    </>
  );
}
