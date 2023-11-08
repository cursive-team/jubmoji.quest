import { useEffect, useRef, useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { classed } from "@tw-classed/react";
import { useBackupState } from "@/hooks/useBackupState";
import Image from "next/image";
import { MIN_SWIPE_DISTANCE } from "@/constants";

interface CollectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  edition?: number | string;
  owner: string;
  pubKeyIndex: number;
  telegramChatInviteLink?: string;
  cardBackImage?: string;
  actions?: React.ReactNode;
  centred?: boolean;
  canFlip?: boolean;
  size?: "sm" | "md";
  disabled?: boolean;
  preview?: boolean;
  height?: number;
  onSwipe?: (direction: "left" | "right") => void;
  quests?: {
    id: number;
    name: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
  }[];
}

interface CollectionCardBackupButton {
  backedUp: boolean;
  onBackup?: () => void;
}

const CardDivider = classed.div("h-[0.4px] z-[3] bg-shark-50");
const QuestButtonWrapper = classed.div(
  "absolute z-[7] duration-300 bottom-[-13px] left-1/2 transform -translate-x-1/2"
);

const CardArcImage = classed.div(
  "w-full transition duration-200 bg-cover bg-center bg-slate-50",
  {
    variants: {
      visible: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
  }
);

const CardWrapper = classed.div(
  Card.Base,
  "relative duration-300 rounded-b-0 border !border-[0.8px] !border-shark-50"
);

const CollectionCardBackupButton = ({
  backedUp,
  onBackup,
}: CollectionCardBackupButton) => {
  return backedUp ? (
    <div className="flex font-dm-sans text-[11px] items-center gap-1 text-shark-300 ">
      <Icons.checked />
      <span>Saved</span>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => {
        onBackup?.();
      }}
      className="flex font-dm-sans text-[11px] items-center gap-1 text-baby-blue-default"
    >
      <Icons.unchecked />
      <span className="mt-[0.5px] leading-none">Back up!</span>
    </button>
  );
};

const CollectionCard = ({
  label,
  edition,
  icon,
  cardBackImage,
  pubKeyIndex,
  telegramChatInviteLink = undefined,
  quests = [],
  disabled = false,
  preview = false,
  height = 250,
  className,
  onSwipe,
  onBackup,
  ...props
}: CollectionCardProps & Pick<CollectionCardBackupButton, "onBackup">) => {
  const [showQuest, setShowQuest] = useState(false);
  const { isLoading: isLoadingBackup, data: backupState } = useBackupState();
  const [backedUp, setBackedUp] = useState<boolean>();

  const startX = useRef(0);
  const startY = useRef(0);

  const endX = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    if (isLoadingBackup) return;

    if (!backupState) {
      setBackedUp(false);
      return;
    }

    if (
      backupState.backedUpPubKeyIndices &&
      backupState.backedUpPubKeyIndices.includes(pubKeyIndex)
    ) {
      setBackedUp(true);
      return;
    }

    setBackedUp(false);
  }, [isLoadingBackup, backupState, pubKeyIndex]);

  const handleCardSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    if (showQuest) return; // prevent swipe if quest is showing
    if (typeof onSwipe !== "function") return;
    endX.current = event.changedTouches[0].clientX;
    endY.current = event.changedTouches[0].clientY;

    const swipeDistance: number = endX.current - startX.current;
    const direction = swipeDistance < 0 ? "right" : "left";

    if (Math.abs(swipeDistance) > MIN_SWIPE_DISTANCE) {
      onSwipe?.(direction);

      startX.current = 0;
      startY.current = 0;
    }
  };

  const CardDetail = () => {
    return (
      <div className="flex flex-col relative">
        <div className="flex flex-col gap-2 bg-shark-970 z-[2]">
          {!preview && (
            <span className="font-dm-sans text-[13px] font-normal line-clamp-2 text-shark-50">
              {label}
            </span>
          )}
          <div className="flex">
            {preview ? (
              <span className="text-shark-50 font-dm-sans max-w-[190px] text-base">
                {label}
              </span>
            ) : (
              backedUp !== undefined && (
                <CollectionCardBackupButton
                  backedUp={backedUp}
                  onBackup={onBackup}
                />
              )
            )}
            <div className="ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                <span className="font-giorgio text-shark-50 text-lg tracking-[0.36px] ">{`#${edition}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let telegramChatInviteUrl: URL | undefined;
  if (telegramChatInviteLink) {
    try {
      telegramChatInviteUrl = new URL(telegramChatInviteLink);
    } catch {
      console.error("Invalid telegram chat invite link");
    }
  }

  const CollectionQuestContent = () => {
    if (quests.length === 0) {
      return (
        <span className="block mt-4 font-dm-sans font-normal text-base">
          No active quests.
        </span>
      );
    }
    return (
      <div className="h-full flex flex-col gap-6 m-4">
        <div className="w-full">
          <span className="font-giorgio text-shark-400 text-[16px] tracking-[0.36px] ">
            Quests
          </span>
          <div
            style={{
              height: `${CARD_HEIGHT - 40}px`,
            }}
            className="flex flex-col gap-3 overflow-scroll pb-5"
          >
            <div className="flex flex-col gap-3">
              {quests?.map((quest, index) => {
                return (
                  <div
                    key={`${quest.id}-${index}`}
                    className="grid grid-cols-[16px_1fr] items-center gap-2"
                  >
                    <Icons.logo />
                    <Link
                      className="text-shark-50 hover:text-baby-blue-default font-dm-sans text-[13px]"
                      href={`/quests/${quest.id}`}
                    >
                      <div className="flex items-center gap-1 underline">
                        <span>{quest.name}</span>
                        <Icons.externalLink />
                      </div>
                    </Link>
                  </div>
                );
              })}
              {telegramChatInviteUrl && (
                <Link href={telegramChatInviteUrl}>
                  <div>
                    <Button
                      size="tiny"
                      variant="blue"
                      className="max-w-[150px]"
                      rounded
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          src="/images/telegram-icon.svg"
                          alt="Collector's chat"
                          width={16}
                          height={16}
                          sizes="100vw"
                        />
                        <span>{"Collector's Chat"}</span>
                      </div>
                    </Button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CARD_HEIGHT = height - 160;

  return (
    <div
      className={cn("relative w-full mx-auto -mt-3", className)}
      {...props}
      onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
        startX.current = event.touches[0].clientX;
        startY.current = event.touches[0].clientY;
      }}
      onTouchEnd={handleCardSwipe}
    >
      {quests?.length > 0 && (
        <QuestButtonWrapper>
          <Button
            onClick={() => {
              disabled ? null : setShowQuest(!showQuest);
            }}
            size="tiny"
            variant="shark"
            className={cn("!border-[0.8px]", disabled ? " text-white/40" : "")}
            iconPosition="right"
            icon={
              <Icons.arrowUp
                className={cn("transform duration-200", {
                  "rotate-180": showQuest,
                })}
              />
            }
            rounded
          >
            More Info
          </Button>
        </QuestButtonWrapper>
      )}

      <div className="relative">
        <CardDivider
          style={{
            top: `${CARD_HEIGHT}px`,
          }}
          className={cn("absolute left-0 right-0")}
        />
        <CardWrapper rounded={!showQuest}>
          <CardArcImage
            className={cn(
              `duration-500 h-full`,
              showQuest
                ? "scale-80 opacity-0 rounded-[20px]"
                : "scale-105 opacity-100"
            )}
            style={{
              backgroundImage: `url(${cardBackImage})`,
              height: `${CARD_HEIGHT}px`,
            }}
          />

          <div
            className={cn(
              "absolute top-0 duration-200 w-full",
              showQuest ? "scale-105 delay-300" : "scale-0 delay-0"
            )}
          >
            <CollectionQuestContent />
          </div>

          <Card.Content
            className={cn("!relative !border-none !bg-shark-970 !pb-2 top-0", {
              "!border-0": true,
            })}
            spacing="sm"
          >
            <CardDetail />
          </Card.Content>
        </CardWrapper>
      </div>
    </div>
  );
};

CollectionCard.displayName = "CollectionCard";
CollectionCard.BackupButton = CollectionCardBackupButton;

export { CollectionCard };
