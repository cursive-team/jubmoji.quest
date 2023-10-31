import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "../hooks/useJubmojis";
import { Filters } from "@/components/Filters";
import Link from "next/link";
import { useState } from "react";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import { Input } from "@/components/ui/Input";
import { QuestCard } from "@/components/cards/QuestCard";
import { JubmojiQuest } from "@/types";
import { useFetchQuests } from "@/hooks/useFetchQuests";
import { Placeholder } from "@/components/Placeholder";
import { Message } from "@/components/Message";
import { InfoModal } from "@/components/modals/InfoModal";
import { AssistedTapModal } from "@/components/modals/AssistedTapModal";

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
  const [assistedTapModal, setAssistedTapModal] = useState(false);
  const { data: jubmojis = [] } = useJubmojis();

  const { isLoading: isLoadingQuests, data: quests = [] } = useFetchQuests();

  const filteredItems =
    selectedOption === "all" ? quests : filterItems(quests, selectedOption);

  const officialQuests: JubmojiQuest[] = [];
  const otherQuests: JubmojiQuest[] = [];
  filteredItems?.forEach((quest) => {
    if (quest.name.includes("OFFICIAL")) {
      officialQuests.push(quest);
    } else {
      otherQuests.push(quest);
    }
  });

  const allQuests = [...officialQuests, ...otherQuests];

  const hasItemsForActiveOption = filteredItems?.length > 0;

  const QuestContent = () => {
    return (
      <>
        {!hasItemsForActiveOption ? (
          <Message>{MESSAGES.NO_RESULTS}</Message>
        ) : (
          <>
            {allQuests?.map(
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
                      ellipsis
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
      <InfoModal isOpen={infoModalOpen} setIsOpen={setIsModalOpen} />
      <AssistedTapModal
        isOpen={assistedTapModal}
        setIsOpen={setAssistedTapModal}
      />
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
            icon={<Icons.plus className="text-black !text-[8px]" />}
            size="tiny"
            variant="blue"
            className="font-semibold"
            onClick={() => setAssistedTapModal(true)}
          >
            Assisted tap
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-1 gap-6">
            {/* <Filters
              defaultValue="all"
              object={QuestTagMapping}
              onChange={setSelectedOption}
              disabled={isLoadingQuests}
            /> */}
            <div className="flex flex-col gap-4">
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
