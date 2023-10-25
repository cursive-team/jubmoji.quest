import { useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { Card } from "./Card";
import { CollectionCardProps } from "./CollectionCard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { classed } from "@tw-classed/react";
import { Transition } from "@headlessui/react";

const IMAGE_COVER_HEIGHT = 254;

const CardQuestWrapper = classed.div(
  "absolute duration-150 bg-shark-970 z-[4] w-full p-4 min-h-[255px]",
  {
    variants: {
      open: {
        true: "top-0",
        false: "top-[255px] invisible",
      },
    },
  }
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
  "relative duration-200 rounded-b-0 animate !border-[0.8px] !border-shark-50",
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
  quests = [],
}: CollectionCardProps) => {
  const [showQuest, setShowQuest] = useState(false);
  const [backedUp, setBackedUp] = useState(false);

  const CardDetail = () => {
    return (
      <div className="flex flex-col relative">
        <div className="flex flex-col gap-2 mt-2 bg-shark-970 z-[2]">
          <span className="font-dm-sans text-[13px] font-normal line-clamp-2 text-shark-400">
            {label}
          </span>
          <div className="flex">
            <div className="flex items-center gap-1 font-dm-sans text-tiny">
              {backedUp ? (
                <div className="flex items-center gap-1 text-yellow ">
                  <Icons.warning />
                  <span className="mt-[0.5px] leading-none">Back up!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-shark-300 ">
                  <Icons.checked />
                  <span>Backed up</span>
                </div>
              )}
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1">
                <span className="text-lg">{icon}</span>
                <span className="font-giorgio text-shark-50 text-lg tracking-[0.36px] ">{`#${edition}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CollectionQuestContent = () => {
    if (quests.length === 0) {
      return (
        <span className="mt-2 font-dm-sans font-normal text-base">
          No active quests.
        </span>
      );
    }
    return (
      <div className="h-full flex flex-col gap-4">
        {quests?.map((quest) => {
          return (
            <div key={quest.id} className="flex gap-2">
              <Icons.logo />
              <Link
                className="text-baby-blue-default font-dm-sans text-[13px]"
                href={`/quests/${quest.id}`}
              >
                <div className="flex items-center gap-1 underline">
                  <span> {quest.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M6 12.5L10 8.5L6 4.5"
                      stroke="#92D7FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative ove">
      <Transition
        show={!showQuest}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <>
          <Icons.collectionCardOrbit className="absolute z-[4] top-[102px] right-[-10px]" />
          <Icons.starSolid
            style={{
              transform: "rotate(150deg)",
            }}
            className="absolute z-[4] top-[140px] right-[6px]"
          />
        </>
      </Transition>

      <div
        className={cn(
          "absolute z-[5] duration-300 top-[-12px] translate-y-[255px] left-1/2 transform -translate-x-1/2",
          {}
        )}
      >
        <Button
          onClick={() => setShowQuest(!showQuest)}
          size="tiny"
          variant="shark"
          className="!border-[0.8px]"
          iconPosition="right"
          icon={
            <Icons.arrowUp
              className={cn("transform", {
                "rotate-180": showQuest,
              })}
            />
          }
          rounded
        >
          Quests
        </Button>
      </div>
      <div className="relative px-4">
        {showQuest && (
          <div className="absolute h-[0.8px] top-[255px] mx-4 z-[3] bg-shark-50 left-0 right-0"></div>
        )}
        <CardArcWrapper rounded={!showQuest}>
          <CardArcImage
            style={{
              backgroundImage: `url(${cardBackImage})`,
              height: `${IMAGE_COVER_HEIGHT}px`,
            }}
          />
          <CardQuestWrapper open={showQuest}>
            <CollectionQuestContent />
          </CardQuestWrapper>
          <Card.Content
            className={cn("relative !bg-shark-970 top-0", {
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
