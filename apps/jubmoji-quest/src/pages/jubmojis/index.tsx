import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
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
import { Jubmoji } from "jubmoji-api";
import { useRouter } from "next/router";
import { CollectionCardArc } from "@/components/cards/CollectionCardArc";
import { Message } from "@/components/Message";

const JubmojiNavItem = classed.div(
  "flex items-center justify-center p-2 rounded cursor-pointer",
  {
    variants: {
      size: {
        md: "w-8 h-full",
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
  "fixed-bottom grid grid-flow-col auto-cols-max h-[60px] xs:h-[80px] py-2 xs:py-[6px] gap-[1px] px-2 w-full overflow-x-scroll bg-shark-970 mx-auto"
);

export default function JubmojisPage() {
  const router = useRouter();
  const { pubKeyIndex } = router.query;
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
    // set default pubKeyIndex from query params
    setSelectedPubKeyIndex(Number(pubKeyIndex) || jubmojis[0]?.pubKeyIndex);
  }, [isLoadingJubmojis]);

  const { emoji, name, owner, collectsFor, imagePath } =
    getJubmojiCardByPubIndex(jubmojiCollectionCards, selectedPubKeyIndex) ?? {};

  // get all jubmojis collected infos
  const collectedPubKeys = Object.entries(jubmojis).map(
    ([_index, { pubKeyIndex }]) => pubKeyIndex
  );

  const msgNonce = jubmojis.find((jubmoji: Jubmoji) => {
    return jubmoji.pubKeyIndex === selectedPubKeyIndex;
  })?.msgNonce;

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
    if (isLoadingJubmojis)
      return (
        <div className="flex flex-col mx-auto">
          <Placeholder.CardArc className="w-[300px]" />
          <Placeholder.Card className="w-[300px] !rounded-t-none" size="xs" />
        </div>
      );

    return (
      <>
        {name && owner && (
          <div>
            <CollectionCardArc
              label={name}
              icon={emoji}
              edition={msgNonce}
              owner={owner}
              cardBackImage={imagePath}
              actions={null}
              quests={collectsFor}
            />
          </div>
        )}
      </>
    );
  };

  const JubmojiSearchItems = () => {
    if (filteredJubmojis.length === 0) {
      return <Message>No results found.</Message>;
    }

    return (
      <div className="flex flex-wrap gap-3 mt-4 mx-auto">
        {filteredJubmojis?.map((jubmoji, index) => {
          if (!jubmoji) return null;
          return (
            <JubmojiNavItem
              key={index}
              size="full"
              className="!w-[70px] !h-[70px]"
              onClick={() => {
                setSearch(""); // clear search to show selected item
                setIsSearchMode(false);
                setSelectedPubKeyIndex(jubmoji?.pubKeyIndex);
              }}
            >
              <div className="flex items-center content-center">
                <span className="text-[40px] leading-none mx-auto py-auto mt-2">
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
      <div
        className={cn("flex flex-col gap-3 xs:gap-4", {
          invisible: infoModalOpen || backupModalOpen,
        })}
      >
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
          className={cn(
            "grid justify-between gap-2",
            isSearchMode ? "grid-cols-[1fr_70px]" : "grid-cols-[1fr_110px]"
          )}
        >
          <Input
            type="search"
            placeholder="Search your private collection"
            value={search}
            onChange={onSearch}
            onFocus={() => setIsSearchMode(true)}
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
              size="tiny"
              variant="blue"
              onClick={() => setBackupModalOpen(true)}
              className="!font-semibold"
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
