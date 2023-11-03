import { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { classed } from "@tw-classed/react";
import { Transition } from "@headlessui/react";
import { useBackupState } from "@/hooks/useBackupState";
import Image from "next/image";

interface CollectionCardArcProps extends React.HTMLAttributes<HTMLDivElement> {
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
  quests?: {
    id: number;
    name: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
  }[];
}

const CardDivider = classed.div("h-[0.4px] mx-4 z-[3] bg-shark-50");
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

const CardArcWrapper = classed.div(
  Card.Base,
  "relative duration-300 rounded-b-0 border !border-[0.8px] !border-shark-50",
  {
    variants: {
      rounded: {
        true: "rounded-t-full",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      rounded: true,
    },
  }
);

const CollectionCardArc = ({
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
  ...props
}: CollectionCardArcProps) => {
  const [showQuest, setShowQuest] = useState(false);
  const { isLoading: isLoadingBackup, data: backupState } = useBackupState();
  const [backedUp, setBackedUp] = useState<boolean>();
  const extraSmallDevice = window.innerWidth <= 375;

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

  const CardDetail = () => {
    return (
      <div className="flex flex-col relative">
        <div className="flex flex-col gap-2 bg-shark-970 z-[2]">
          {!preview && (
            <span className="font-dm-sans text-[13px] font-normal line-clamp-2 text-shark-400">
              {label}
            </span>
          )}
          <div className="flex">
            {preview ? (
              <span className="text-white font-dm-sans max-w-[190px] text-base">
                {label}
              </span>
            ) : (
              <div className="flex items-center gap-1 font-dm-sans text-tiny">
                {backedUp === undefined ? (
                  <></>
                ) : backedUp ? (
                  <div className="flex items-center gap-1 text-shark-300 ">
                    <Icons.checked />
                    <span>Backed up</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-yellow ">
                    <Icons.warning />
                    <span className="mt-[0.5px] leading-none">Back up!</span>
                  </div>
                )}
              </div>
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
              {quests?.map((quest) => {
                return (
                  <div
                    key={quest.id}
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

  const MAX_CARD_HEIGHT = 280;
  const CARD_HEIGHT = height - 160 > 280 ? MAX_CARD_HEIGHT : height - 160;

  return (
    <div
      className={cn("relative w-full max-w-[300px] mx-auto", className)}
      {...props}
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

      {!preview && (
        <Transition
          show={!showQuest}
          enter="transition-scale duration-500"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-300"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100 scale-500"
          leaveTo="opacity-0 scale-0"
        >
          <>
            <Icons.collectionCardOrbit className="absolute z-[4] top-[105px] right-[-17px] w-[326px]" />
            <Icons.starSolid
              style={{
                transform: "rotate(150deg)",
              }}
              className="absolute z-[4] top-[152px] right-[5px]"
            />
          </>
        </Transition>
      )}

      <div className={cn("relative", preview ? "" : "px-4")}>
        <CardDivider
          style={{
            top: `${CARD_HEIGHT}px`,
          }}
          className={cn("absolute left-0 right-0")}
        />
        <CardArcWrapper rounded={!showQuest}>
          <CardArcImage
            className={cn(
              `duration-500 h-full`,
              showQuest
                ? "scale-0 opacity-0 rounded-t-full"
                : "scale-105 opacity-100",
              extraSmallDevice ? "h-[210px]" : "h-[250px]"
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
        </CardArcWrapper>
      </div>
    </div>
  );
};

CollectionCardArc.displayName = "CollectionCardArc";

export { CollectionCardArc };
