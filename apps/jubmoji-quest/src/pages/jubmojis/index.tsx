import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { classed } from "@tw-classed/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getJubmojiCardByPubIndex, useFetchCards } from "@/hooks/useFetchCards";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import BackupModal from "@/components/modals/BackupModal";
import { cn } from "@/lib/utils";

const JubmojiNavItem = classed.div(
  "flex items-center justify-center p-2 rounded cursor-pointer",
  {
    variants: {
      size: {
        md: "w-8 h-16",
        full: "w-full",
      },
      active: {
        true: "bg-shark-600 mx-2 first:ml-0 mx-2 last:mr-0",
        false: "bg-shark-900",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  }
);

const JubmojiNavWrapper = classed.div(
  "grid grid-flow-col auto-cols-max h-20 py-[6px] gap-[1px] px-2 fixed left-0 right-0 bottom-[80px] w-full overflow-scroll bg-shark-970 justify-center"
);

export default function JubmojisPage() {
  const [selectedPubKeyIndex, setSelectedPubKeyIndex] =
    React.useState<number>(0);
  const { data: jubmojis = [] } = useJubmojis();
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { isLoading: isLoadingJubmojis, data: jubmojiCollectionCards = [] } =
    useFetchCards();

  useEffect(() => {
    if (isLoadingJubmojis) return;
    setSelectedPubKeyIndex(jubmojis[0]?.pubKeyIndex);
  }, [isLoadingJubmojis]);

  const { emoji, name, owner, collectsFor, imagePath } =
    getJubmojiCardByPubIndex(jubmojiCollectionCards, selectedPubKeyIndex) ?? {};

  // get all pubkeys from jubmojis
  const collectedPubKeys = Object.entries(jubmojis).map(
    ([_index, { pubKeyIndex }]) => {
      return pubKeyIndex;
    }
  );

  const collectedJubmojis = collectedPubKeys.map((pubKeyIndex) => {
    return getJubmojiCardByPubIndex(jubmojiCollectionCards, pubKeyIndex);
  });

  // get all jubmojis that match the search
  const filteredJubmojis = collectedJubmojis
    .filter((jubmoji) => {
      if (!jubmoji) return false;
      const { name, owner, description } = jubmoji;
      return (
        jubmoji.emoji.toLowerCase().includes(search.toLowerCase()) ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        owner.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter(Boolean);

  const JubmojiContent = () => {
    if (isLoadingJubmojis) return <Placeholder.Card size="2xl" />;

    return (
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
    );
  };

  const JubmojiSearchItems = () => {
    if (filteredJubmojis.length === 0) {
      return <span>No results found.</span>;
    }

    return (
      <div className="grid grid-cols-4 gap-3">
        {filteredJubmojis?.map((jubmoji, index) => {
          if (!jubmoji) return null;
          return (
            <JubmojiNavItem
              key={index}
              size="full"
              onClick={() => {
                setSearch(""); // clear search to show selected item
                setIsSearchMode(false);
                setSelectedPubKeyIndex(jubmoji?.pubKeyIndex);
              }}
            >
              <div className="flex items-center content-center w-[80px]">
                <span className="text-[50px] leading-none mx-auto py-auto mt-2">
                  {jubmoji?.emoji}
                </span>
              </div>
            </JubmojiNavItem>
          );
        })}
      </div>
    );
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    setIsSearchMode(true);
  };

  return (
    <>
      <BackupModal isOpen={backupModalOpen} setIsOpen={setBackupModalOpen} />
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
        <div
          className={cn("grid  justify-between gap-2", {
            "grid-cols-[1fr_70px]": isSearchMode,
            "grid-cols-[1fr_120px]": !isSearchMode,
          })}
        >
          <Input
            type="search"
            placeholder="Search your private collection"
            value={search}
            onChange={onSearch}
          />
          {isSearchMode ? (
            <button
              onClick={() => setIsSearchMode(false)}
              className="font-dm-sans text-[13px]"
            >
              Cancel
            </button>
          ) : (
            <Button
              icon={<Icons.download className="text-black" />}
              size="sm"
              variant="blue"
              onClick={() => setBackupModalOpen(true)}
            >
              Back up!
            </Button>
          )}
        </div>

        {isSearchMode ? <JubmojiSearchItems /> : <JubmojiContent />}

        {!isSearchMode && (
          <div className="mt-auto">
            <JubmojiNavWrapper>
              {collectedJubmojis?.map((jubmoji, index) => {
                const isActive = jubmoji?.pubKeyIndex === selectedPubKeyIndex;

                if (!jubmoji) return null;
                return (
                  <JubmojiNavItem
                    key={index}
                    active={isActive}
                    onClick={() => setSelectedPubKeyIndex(jubmoji?.pubKeyIndex)}
                  >
                    {jubmoji?.emoji!}
                  </JubmojiNavItem>
                );
              })}
            </JubmojiNavWrapper>
          </div>
        )}
      </div>
    </>
  );
}
