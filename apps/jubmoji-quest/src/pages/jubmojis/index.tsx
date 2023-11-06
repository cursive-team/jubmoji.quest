import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { classed } from "@tw-classed/react";
import React, { ChangeEvent, use, useEffect, useRef, useState } from "react";
import { getJubmojiCardByPubIndex, useFetchCards } from "@/hooks/useFetchCards";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/Placeholder";
import BackupModal from "@/components/modals/BackupModal";
import { cn } from "@/lib/utils";
import { Jubmoji } from "jubmoji-api";
import { useRouter } from "next/router";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Message } from "@/components/Message";
import { InfoModal } from "@/components/modals/InfoModal";
import Image from "next/image";
import Link from "next/link";

const JubmojiNavItem = classed.div(
  "flex items-center justify-center p-2 rounded cursor-pointer duration-300",
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
  const [cardSize, setCardSize] = useState<number>(0);

  const startX = useRef(0);
  const startY = useRef(0);

  const calculateCardSize = () => {
    const footer = document.getElementById("footer")?.clientHeight ?? 0;
    const header = document.getElementById("header")?.clientHeight ?? 0;
    const navWrapper =
      document.getElementById("nav-wrapper")?.clientHeight ?? 0;

    const SPACING = 70; // spacing between header and footer

    const cardSize =
      window?.innerHeight - footer - header - navWrapper - SPACING;

    setCardSize(cardSize); // set card size container size
  };

  const {
    isLoading: isLoadingJubmojiCards,
    data: jubmojiCollectionCards = [],
  } = useFetchCards();

  useEffect(() => {
    calculateCardSize();
  }, [isLoadingJubmojiCards, jubmojis, pubKeyIndex]);

  useEffect(() => {
    window.addEventListener("resize", calculateCardSize); // add resize listener
  }, []);

  useEffect(() => {
    if (isLoadingJubmojiCards) return;
    // set default pubKeyIndex from query params
    setSelectedPubKeyIndex(Number(pubKeyIndex) || jubmojis[0]?.pubKeyIndex);
  }, [isLoadingJubmojiCards, jubmojis, pubKeyIndex]);

  const selectedJubmoji = getJubmojiCardByPubIndex(
    jubmojiCollectionCards,
    selectedPubKeyIndex
  );
  const {
    emoji,
    name,
    owner,
    prerequisitesFor,
    collectsFor,
    imagePath,
    telegramChatInviteLink,
  } = selectedJubmoji ?? {};

  // get all jubmojis collected infos
  const collectedPubKeys = Object.entries(jubmojis).map(
    ([_index, { pubKeyIndex }]) => pubKeyIndex
  );

  const msgNonce = jubmojis.find((jubmoji: Jubmoji) => {
    return jubmoji.pubKeyIndex === selectedPubKeyIndex;
  })?.msgNonce;

  const collectedJubmojis = collectedPubKeys
    .map((pubKeyIndex) => {
      return getJubmojiCardByPubIndex(jubmojiCollectionCards, pubKeyIndex);
    })
    .filter(Boolean);

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

  // get all quests that the selected jubmoji is a prerequisite or collection card for
  const jubmojiQuests = [...(prerequisitesFor || []), ...(collectsFor || [])];

  const JubmojiContent = () => {
    if (isLoadingJubmojiCards)
      return (
        <div
          style={{
            height: `${cardSize}px`,
          }}
          className="flex flex-col grow h-full"
        >
          <div className="flex flex-col mx-auto justify-center w-full my-auto grow h-full">
            <Placeholder.Card
              style={{
                height: `${cardSize - 80}px`,
              }}
              className="!rounded-[20px] w-full"
            />
          </div>
          <JubmojiNavWrapper className="z-1">
            <JubmojiNavItem className="bg-slate-200 animate-pulse" />
            <JubmojiNavItem className="bg-slate-200 animate-pulse" />
            <JubmojiNavItem className="bg-slate-200 animate-pulse" />
          </JubmojiNavWrapper>
        </div>
      );

    if (!selectedJubmoji) {
      return (
        <div
          className="flex flex-col mx-auto gap-2 mt-5"
          style={{
            height: `${cardSize}px`,
          }}
        >
          <div className="my-auto">
            <div className="mx-auto">
              <Icons.starSolid />
            </div>
            <div className="mx-auto flex flex-col gap-5">
              <Image
                height={220}
                width={300}
                src="/images/no-jubmojis.png"
                alt="no result"
              />
              <Link href="/">
                <Button rounded size="sm" className="max-w-[100px] mx-auto">
                  {"Let's go"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {name && owner && (
          <div
            className="flex flex-col justify-center xs:mt-0"
            style={{
              height: `${cardSize}px`,
            }}
          >
            <CollectionCard
              height={cardSize}
              label={name}
              icon={emoji}
              edition={msgNonce ? msgNonce - 1 : ""}
              owner={owner}
              pubKeyIndex={selectedPubKeyIndex}
              cardBackImage={imagePath}
              telegramChatInviteLink={telegramChatInviteLink}
              actions={null}
              quests={jubmojiQuests}
              onSwipe={(direction: string) => {
                const currentActiveIndex = collectedJubmojis.findIndex(
                  (jubmoji) => jubmoji?.pubKeyIndex === selectedPubKeyIndex
                );

                const nextIndex =
                  direction === "right"
                    ? currentActiveIndex + 1
                    : currentActiveIndex - 1;

                if (nextIndex < 0 || nextIndex > collectedJubmojis.length - 1)
                  return; // can't go past the first or last slide

                const selectedSwipeJubmojiPubKey =
                  collectedJubmojis?.[nextIndex]?.pubKeyIndex;

                if (!selectedSwipeJubmojiPubKey) return;

                setSelectedPubKeyIndex(selectedSwipeJubmojiPubKey);
              }}
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

  const handleNavSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const MIN_SWIPE_DISTANCE = 20; // min distance to swipe
    const clientX = event.touches[0].clientX;

    const distance = clientX - startX.current;
    const index = Math.min(
      Math.round(distance / MIN_SWIPE_DISTANCE),
      collectedJubmojis.length
    );
    const swipeIndex = index < 0 ? 0 : index;

    if (swipeIndex < 0 || swipeIndex == collectedJubmojis.length) return;

    const selectedSwipeJubmojiPubKey =
      collectedJubmojis?.[swipeIndex]?.pubKeyIndex;

    if (selectedSwipeJubmojiPubKey) {
      setSelectedPubKeyIndex(selectedSwipeJubmojiPubKey);
    }
  };

  const showNav =
    collectedJubmojis.length > 0 && !isSearchMode && !isLoadingJubmojiCards;

  return (
    <>
      <BackupModal isOpen={backupModalOpen} setIsOpen={setBackupModalOpen} />
      <InfoModal isOpen={infoModalOpen} setIsOpen={setIsModalOpen} />
      <div
        className={cn("flex flex-col", {
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
        >
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
              disabled={!selectedJubmoji}
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
                disabled={!selectedJubmoji}
              >
                Back up!
              </Button>
            )}
          </div>
        </AppHeader>

        {isSearchMode ? <JubmojiSearchItems /> : <JubmojiContent />}

        {showNav && (
          <div id="nav-wrapper" className="mt-auto">
            <JubmojiNavWrapper
              onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
                startX.current = event.touches[0].clientX;
                startY.current = event.touches[0].clientY;
              }}
              onTouchEnd={() => {
                startX.current = 0;
                startY.current = 0;
              }}
              onTouchMove={handleNavSwipe}
            >
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
