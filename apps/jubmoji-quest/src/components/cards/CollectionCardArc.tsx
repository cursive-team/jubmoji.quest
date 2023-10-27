import { useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { Card } from "./Card";
import { CollectionCardProps } from "./CollectionCard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { classed } from "@tw-classed/react";
import { Transition } from "@headlessui/react";

const CardDivider = classed.div("h-[0.4px] mx-4 z-[3] bg-shark-50", {
  variants: {
    small: {
      true: "top-[230px]",
      false: "top-[250px]",
    },
  },
});
const QuestButtonWrapper = classed.div(
  "absolute z-[5] duration-300 top-[-12px] left-1/2 transform -translate-x-1/2",
  {
    variants: {
      small: {
        true: "translate-y-[230px]",
        false: "translate-y-[250px]",
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
  "relative duration-300 rounded-b-0 border !border-[0.8px] !border-shark-50 overflow-hidden",
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
  const extraSmallDevice = window.innerWidth <= 375;

  const CardDetail = () => {
    return (
      <div className="flex flex-col relative">
        <div className="flex flex-col gap-2 bg-shark-970 z-[2]">
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
        <span className="block mt-4 font-dm-sans font-normal text-base">
          No active quests.
        </span>
      );
    }
    return (
      <div className="h-full flex flex-col gap-4 mt-4">
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
    <div className="relative w-full max-w-[300px] mx-auto">
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

      <QuestButtonWrapper small={extraSmallDevice}>
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
      </QuestButtonWrapper>

      <div className="relative px-4">
        <CardDivider
          small={extraSmallDevice}
          className={cn("absolute left-0 right-0")}
        />
        <CardArcWrapper rounded={!showQuest}>
          <CardArcImage
            className={cn(
              `duration-500 h-full`,
              showQuest
                ? "scale-0 opacity-0 rounded-t-full"
                : "scale-105 opacity-100",
              extraSmallDevice ? "h-[230px]" : "h-[250px]"
            )}
            style={{
              backgroundImage: `url(${cardBackImage})`,
            }}
          />

          <div
            className={cn(
              "absolute top-0 duration-200",
              showQuest ? "scale-105 delay-300" : "scale-0 delay-0"
            )}
          >
            <CollectionQuestContent />
          </div>

          <Card.Content
            className={cn("relative !border-none !bg-shark-970 !pb-2 top-0", {
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
