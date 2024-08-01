import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { classed } from "@tw-classed/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { useQuery } from "react-query";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const JubmojiNavItem = classed.div(
  "!flex items-center justify-center p-2 rounded cursor-pointer h-[50px] xs:h-[70px] duration-75",
  {
    variants: {
      size: {
        md: "w-8 h-full",
        full: "w-full",
      },
      active: {
        true: "bg-shark-600",
        false: "bg-shark-900",
      },
      loading: {
        true: "bg-slate-200 animate-pulse",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
      loading: false,
    },
  }
);

const JubmojiNavWrapper = classed.div(
  "fixed-bottom overflow-hidden grid grid-flow-col justify-center auto-cols-max h-[60px] xs:h-[80px] py-2 xs:py-[6px] gap-[1px] px-2 w-full overflow-x-scroll bg-shark-970 mx-auto"
);

const PagePlaceholder = () => {
  return (
    <div className="flex flex-col w-full grow">
      <div className="flex flex-col h-full mt-4">
        <Placeholder.Card className="!rounded-[20px] w-full h-full" />
      </div>
      <JubmojiNavWrapper className="fixed-bottom grid grid-flow-col justify-center auto-cols-max h-[60px] xs:h-[80px] py-2 xs:py-[6px] gap-[1px] px-2 w-full overflow-x-scroll bg-shark-970 mx-autoz-1">
        <JubmojiNavItem loading />
        <JubmojiNavItem loading />
        <JubmojiNavItem loading />
      </JubmojiNavWrapper>
    </div>
  );
};

interface getDefaultIndexProps {
  defaultPubKeyIndex?: number;
  collectedJubmojis: any[];
}

// get collection index from query params
const getDefaultIndex = ({
  defaultPubKeyIndex = 0,
  collectedJubmojis,
}: getDefaultIndexProps): Promise<number | null> => {
  if (collectedJubmojis?.length === 0) return Promise.resolve(null);

  let defaultIndex = collectedJubmojis.findIndex(
    (jubmoji) => jubmoji?.pubKeyIndex === Number(defaultPubKeyIndex)
  );

  defaultIndex = defaultIndex === -1 ? 0 : defaultIndex;

  const selectedPubKey = collectedJubmojis[defaultIndex]?.pubKeyIndex;

  if (!selectedPubKey) return Promise.resolve(0);
  return Promise.resolve(defaultIndex);
};

export default function JubmojisPage() {
  const router = useRouter();
  const { pubKeyIndex } = router.query;
  const [selectedPubKeyIndex, setSelectedPubKeyIndex] = useState<
    number | undefined
  >(undefined);
  const { isLoading: isLoadingJubmojis, data: jubmojis = [] } = useJubmojis();
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [cardSize, setCardSize] = useState<number>(0);
  const [defaultIndex, setDefaultIndex] = useState<number | null>(0);
  const [jubmojiSlider, setJubmojiSlider] = useState<any>(null);
  const [navigatorSlider, setNavigatorSlider] = useState<any>(null);

  const calculateCardSize = () => {
    const footer = document.getElementById("footer")?.clientHeight ?? 0;
    const header = document.getElementById("header")?.clientHeight ?? 0;

    const SPACING = 100; // spacing between header and footer

    const cardSize = window?.innerHeight - footer - header - SPACING;

    setCardSize(cardSize); // set card size container size
  };

  const {
    isLoading: isLoadingJubmojiCards,
    data: jubmojiCollectionCards = [],
  } = useFetchCards();

  // get all jubmojis collected infos
  const collectedPubKeys = Object.entries(jubmojis).map(
    ([_index, { pubKeyIndex }]) => pubKeyIndex
  );

  const collectedJubmojis = collectedPubKeys.map((pubKeyIndex) => {
    return getJubmojiCardByPubIndex(jubmojiCollectionCards, pubKeyIndex);
  });

  const { isLoading: isLoadingDefaultIndex } = useQuery(
    ["getDefaultIndex", isLoadingJubmojiCards, collectedJubmojis],
    async () => {
      const defaultIndex = await getDefaultIndex({
        defaultPubKeyIndex: Number(pubKeyIndex),
        collectedJubmojis: collectedJubmojis || [],
      });

      return defaultIndex;
    },
    {
      onSuccess: (defaultIndex: number | null) => {
        if (defaultIndex == null) return;

        const selectedPubKey = collectedJubmojis[defaultIndex]?.pubKeyIndex;

        setSelectedPubKeyIndex(selectedPubKey);
        setDefaultIndex(defaultIndex);
        return defaultIndex;
      },
    }
  );

  useEffect(() => {
    calculateCardSize();
  }, [isLoadingJubmojiCards, jubmojis, pubKeyIndex]);

  useEffect(() => {
    window.addEventListener("resize", calculateCardSize); // add resize listener
  }, []);

  const hasSelectedJubmoji = selectedPubKeyIndex !== undefined;

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

  const noSearchResults = filteredJubmojis?.length === 0;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    setIsSearchMode(true);
  };

  const handleIndexChange = (index: number) => {
    const selectedIndex = collectedJubmojis[index]?.pubKeyIndex;
    if (!selectedIndex) return;
    if (selectedIndex === selectedPubKeyIndex) return; // ignore if same index, no need to change
    setSelectedPubKeyIndex(selectedIndex);
  };

  const handleSearchItem = (pubKeyIndex: number) => {
    const index = collectedJubmojis.findIndex(
      (jubmoji) => jubmoji?.pubKeyIndex === pubKeyIndex
    );
    setSearch(""); // clear search to show selected item
    setIsSearchMode(false);

    if (selectedPubKeyIndex !== pubKeyIndex) {
      setSelectedPubKeyIndex(pubKeyIndex);
    }
    setSelectedPubKeyIndex(pubKeyIndex);
    if (index !== defaultIndex) {
      setDefaultIndex(index);
    }
  };

  const isLoadingPage =
    isLoadingJubmojiCards || isLoadingDefaultIndex || isLoadingJubmojis;
  const showNav =
    collectedJubmojis.length > 0 && !isSearchMode && !isLoadingPage;

  useEffect(() => {
    if (isLoadingPage && defaultIndex !== 0) return;
    jubmojiSlider?.slideTo(defaultIndex, 100);
  }, [defaultIndex, isLoadingPage, jubmojiSlider]);

  return (
    <>
      <BackupModal isOpen={backupModalOpen} setIsOpen={setBackupModalOpen} />
      <InfoModal isOpen={infoModalOpen} setIsOpen={setIsModalOpen} />
      <div
        className={cn("flex flex-col gap-1 xs:gap-2", {
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
              "grid justify-between gap-2 duration-200",
              isSearchMode ? "grid-cols-[1fr_70px]" : "grid-cols-[1fr_110px]"
            )}
          >
            <Input
              type="search"
              placeholder="Search your private collection"
              value={search}
              onChange={onSearch}
              onFocus={() => setIsSearchMode(true)}
              disabled={!hasSelectedJubmoji}
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
                disabled={!hasSelectedJubmoji}
              >
                Back up!
              </Button>
            )}
          </div>
        </AppHeader>
        <div
          id="jubmoji-slider"
          className="flex flex-col xs:mt-0"
          style={{
            height: `${cardSize}px`,
          }}
        >
          {isLoadingPage ? (
            <PagePlaceholder />
          ) : isSearchMode ? (
            noSearchResults ? (
              <Message>No results found.</Message>
            ) : (
              <div className="flex gap-2 justify-center flex-wrap">
                {filteredJubmojis?.map((jubmoji, index) => {
                  if (!jubmoji) return null;
                  return (
                    <JubmojiNavItem
                      key={jubmoji.pubKeyIndex}
                      size="full"
                      className="!w-[70px] !h-[70px]"
                      onClick={() => handleSearchItem(jubmoji.pubKeyIndex)}
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
            )
          ) : !hasSelectedJubmoji ? (
            <div className="flex flex-col mx-auto gap-2 mt-5 h-full">
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
          ) : (
            <div
              className="mt-5"
              style={{
                maxWidth: `${window?.innerWidth - 36}px`,
              }}
            >
              <Swiper
                modules={[Controller]}
                onSwiper={setJubmojiSlider}
                controller={{ control: navigatorSlider }}
                spaceBetween={25}
                slidesPerView={1}
                centeredSlides={true}
                loop={false}
                speed={150}
              >
                {collectedJubmojis.map((jubmoji, index) => {
                  if (!jubmoji) return null;

                  const jubmojiQuests = [
                    ...(jubmoji.prerequisitesFor || []),
                    ...(jubmoji.collectsFor || []),
                  ];

                  const msgNonce = jubmojis.find((jubmojiItem: Jubmoji) => {
                    return jubmojiItem.pubKeyIndex === jubmoji?.pubKeyIndex;
                  })?.msgNonce;

                  return (
                    <SwiperSlide className="w-full" key={jubmoji.pubKeyIndex}>
                      <CollectionCard
                        height={cardSize}
                        label={jubmoji.name}
                        icon={jubmoji.emoji}
                        edition={msgNonce ? msgNonce - 1 : ""}
                        owner={jubmoji.owner}
                        pubKeyIndex={jubmoji.pubKeyIndex}
                        cardBackImage={jubmoji.imagePath}
                        telegramChatInviteLink={jubmoji.telegramChatInviteLink}
                        actions={null}
                        quests={jubmojiQuests}
                        rotate={jubmoji.rotate}
                        onBackup={() => setBackupModalOpen(true)}
                        className={`min-[${cardSize}px] h-full`}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>

        {showNav && (
          <div
            id="nav-wrapper"
            className="mt-auto fixed-bottom z-1 h-[50px] xs:h-[70px] my-1"
          >
            <Swiper
              modules={[Controller]}
              slidesPerView={"auto"}
              onSwiper={setNavigatorSlider}
              controller={{ control: jubmojiSlider }}
              spaceBetween={1}
              centeredSlides={true}
              loop={false}
              slideToClickedSlide={true}
            >
              {collectedJubmojis?.map((jubmoji, index) => {
                if (!jubmoji) return null;
                return (
                  <SwiperSlide className="!w-8" key={index}>
                    {({ isActive }) => (
                      <JubmojiNavItem
                        active={isActive}
                        onClick={() => {
                          handleIndexChange(index);
                        }}
                      >
                        {jubmoji?.emoji!}
                      </JubmojiNavItem>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}
