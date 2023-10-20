import AppHeader from "@/components/AppHeader";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "@/hooks/useJubmojis";
import Options from "@/components/Options";
import Link from "next/link";
import { useEffect, useState } from "react";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/modals/Modal";
import { QuestCard } from "@/components/cards/QuestCard";
import { JubmojiQuest } from "@/types";
import { $Enums } from "@prisma/client";

export const QuestTagMapping: Record<
  $Enums.CardTag & "ALL" & "IN_PROGRESS" & "COMPLETED" & "STARRED",
  string
> = {
  ALL: "All",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  STARRED: "Starred",
  OFFICIAL: "Official",
  ROLES: "Roles",
  APPLICATIONS: "Applications",
  COMMUNITY: "Community",
  DEV_TOOLS: "Dev Tools",
  INFRASTRUCTURE: "Infrastructure",
  PRIVACY: "Privacy",
  PERSONAL: "Personal",
};

const BackupSection = () => {
  const { isLoading: isLoadingJubmojis, data: jubmojis } = useJubmojis();

  const hasJubmojis = jubmojis && jubmojis.length > 0 && !isLoadingJubmojis;

  if (isLoadingJubmojis) return <div>Loading...</div>;
  if (!hasJubmojis) return null;
  return (
    <div className="flex flex-col gap-2">
      <GoogleWalletButton />
      <AppleWalletButton />
    </div>
  );
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
                <span className="uppercase text-lg font-semibold text-white">
                  Quests
                </span>
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

                      return (
                        <Link key={id} href={questPageUrl}>
                          <QuestCard
                            title={name}
                            description={description}
                            image={
                              // Todo: Logic for fetching quest images
                              "https://media.ouest-france.fr/v1/pictures/MjAyMDExNjM1YzM2YmMwMDFhMWU4OGIyZWZmZWE4NDFjNjE1OGM?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=02df95003367f42bb49fd488be9f07a97e5294d1f3f8f9d3a28180aec795da6e"
                            }
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
