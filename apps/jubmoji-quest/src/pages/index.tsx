import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "../hooks/useJubmojis";
import Options from "@/components/Options";
import Link from "next/link";
import { useEffect, useState } from "react";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/modals/Modal";
import { QuestCard } from "@/components/cards/QuestCard";
import { JubmojiQuest } from "@/types";

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
  const [quests, setQuests] = useState<JubmojiQuest[]>([]);

  useEffect(() => {
    const fetchQuests = async () => {
      const response = await fetch("/api/quests");
      if (!response.ok) {
        // Todo: error handling
        console.error("Error while trying to fetch quests.");
        setQuests([]);
      } else {
        const quests = await response.json();
        setQuests(quests);
      }
    };

    fetchQuests();
  }, []);

  const filteredItems =
    selectedOption === "all" ? quests : filterItems(quests, selectedOption);

  const hasItemsForActiveOption = filteredItems?.length > 0;

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
          <Input placeholder="Find a quest to complete" />
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
            />
            <div className="flex flex-col gap-2">
              {!hasItemsForActiveOption ? (
                <span className="text-base font-normal">
                  {MESSAGES.NO_RESULTS}
                </span>
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
                      const percentageProgress =
                        (jubmojis.filter((jubmoji) =>
                          collectionCardIndices.includes(jubmoji.pubKeyIndex)
                        ).length /
                          collectionCardIndices.length) *
                        100;
                      const questImagePath = imageLink;

                      return (
                        <Link key={id} href={questPageUrl}>
                          <QuestCard
                            title={name}
                            description={description}
                            image={questImagePath || ""}
                            percentageProgress={percentageProgress}
                            showProgress
                          />
                        </Link>
                      );
                    }
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
