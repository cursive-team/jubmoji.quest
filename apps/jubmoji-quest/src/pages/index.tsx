import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "../hooks/useJubmojis";
import Options from "@/components/Options";
import Link from "next/link";
import { useState } from "react";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/modals/Modal";
import { QuestCard } from "@/components/cards/QuestCard";
import { JubmojiQuest } from "@/types";
import { useFetchQuests } from "@/hooks/useFetchQuests";
import { Placeholder } from "@/components/Placeholder";

export const QuestTagMapping: Record<
  "ALL" | "IN_PROGRESS" | "COMPLETED" | "STARRED" | "OFFICIAL" | "COMMUNITY",
  string
> = {
  ALL: "All",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  STARRED: "Starred",
  OFFICIAL: "Official",
  COMMUNITY: "Community",
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const { data: jubmojis = [] } = useJubmojis();

  const { isLoading: isLoadingQuests, data: quests = [] } = useFetchQuests();

  const filteredItems =
    selectedOption === "all" ? quests : filterItems(quests, selectedOption);

  const hasItemsForActiveOption = filteredItems?.length > 0;

  const QuestContent = () => {
    return (
      <>
        {!hasItemsForActiveOption ? (
          <span className="text-base font-normal">{MESSAGES.NO_RESULTS}</span>
        ) : (
          <>
            {filteredItems?.map(
              ({
                id,
                name,
                description,
                collectionCards,
                imageLink,
              }: JubmojiQuest) => {
                const questPageUrl = `/quests/${id}`;

                const collectionCardIndices = collectionCards.map(
                  (card) => card.index
                );

                const questImagePath = imageLink;

                const collected = jubmojis.filter((jubmoji) =>
                  collectionCardIndices.includes(jubmoji.pubKeyIndex)
                ).length;

                const collectionTotalItems = collectionCardIndices.length;

                return (
                  <Link key={id} href={questPageUrl}>
                    <QuestCard
                      title={name}
                      description={description}
                      image={questImagePath || ""}
                      collected={collected}
                      collectionTotalItems={collectionTotalItems}
                      showProgress
                    />
                  </Link>
                );
              }
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Jubmoji quest
      </Modal>
      <div>
        <AppHeader
          title={
            <div className="flex justify-between w-full items-center">
              <Link href="/">
                <AppHeader.Title>Quests</AppHeader.Title>
              </Link>
              <button
                onClick={() => setIsModalOpen(!infoModalOpen)}
                className="ml-auto"
              >
                <Icons.info />
              </button>
            </div>
          }
        />
        <div className="grid grid-cols-[1fr_120px] justify-between gap-2">
          <Input placeholder="Find a quest to complete" type="search" />
          <Button
            icon={<Icons.plus className="text-black" />}
            size="sm"
            variant="blue"
          >
            Assisted tap
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-1 gap-6">
            <span className="text-lg font-bold text-white">Begin a quest!</span>
            <Options
              defaultValue="all"
              object={QuestTagMapping}
              onChange={setSelectedOption}
              disabled={isLoadingQuests}
            />
            <div className="flex flex-col gap-2">
              {isLoadingQuests ? (
                <>
                  <Placeholder.Card />
                  <Placeholder.Card />
                  <Placeholder.Card />
                </>
              ) : (
                <QuestContent />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
