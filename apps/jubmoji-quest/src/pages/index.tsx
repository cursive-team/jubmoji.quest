import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "../hooks/useJubmojis";
import { Filters } from "@/components/Filters";
import Link from "next/link";
import { useState } from "react";
import { getQuestCollectionCardIndices, isPowerCompleted } from "@/lib/utils";
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
  "ACTIVE" | "ALL" | "OFFICIAL" | "EXPIRED",
  string
> = {
  ACTIVE: "Active",
  ALL: "All",
  OFFICIAL: "Official",
  EXPIRED: "Expired",
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("ACTIVE");
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [assistedTapModal, setAssistedTapModal] = useState(false);
  const { data: jubmojis = [] } = useJubmojis();

  const { isLoading: isLoadingQuests, data: quests = [] } = useFetchQuests();

  const viewableQuests = quests?.filter((quest) => {
    const questCardIndicesFilter = [
      ...quest.prerequisiteCards.map((card) => card.index),
      ...getQuestCollectionCardIndices(quest),
    ];
    return (
      quest.isAlwaysVisible ||
      jubmojis?.some((jubmoji) =>
        questCardIndicesFilter.includes(jubmoji.pubKeyIndex)
      )
    );
  });

  const expiredQuests: JubmojiQuest[] = [];
  const officialQuests: JubmojiQuest[] = [];
  const nonOfficialActiveQuests: JubmojiQuest[] = [];
  viewableQuests?.forEach((quest) => {
    if (new Date(quest.endTime) < new Date()) {
      expiredQuests.push(quest);
    } else if (quest.isOfficial) {
      officialQuests.push(quest);
    } else {
      nonOfficialActiveQuests.push(quest);
    }
  });

  let filteredQuests: JubmojiQuest[];
  switch (selectedOption) {
    case "ACTIVE":
      filteredQuests = [...officialQuests, ...nonOfficialActiveQuests];
      break;
    case "OFFICIAL":
      filteredQuests = officialQuests;
      break;
    case "EXPIRED":
      filteredQuests = expiredQuests;
      break;
    default:
      filteredQuests = [
        ...officialQuests,
        ...nonOfficialActiveQuests,
        ...expiredQuests,
      ];
      break;
  }

  const hasItemsForActiveOption = filteredQuests?.length > 0;

  const QuestContent = () => {
    return (
      <>
        {!hasItemsForActiveOption ? (
          <Message>{MESSAGES.NO_RESULTS}</Message>
        ) : (
          <>
            {filteredQuests?.map(
              ({
                id,
                name,
                description,
                imageLink,
                powers,
                endTime,
              }: JubmojiQuest) => {
                const questPageUrl = `/quests/${id}`;

                const questImagePath = imageLink;

                const numPowersCompleted = powers.filter((power) =>
                  isPowerCompleted(power, jubmojis)
                ).length;

                const endDateFormattedTime = new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                  timeStyle: "medium",
                }).format(new Date(endTime));
                const endDateLabel =
                  new Date(endTime) < new Date()
                    ? `Ended on ${endDateFormattedTime}`
                    : `Ends on ${endDateFormattedTime}`;

                return (
                  <Link key={id} href={questPageUrl}>
                    <QuestCard
                      title={name}
                      description={description}
                      image={questImagePath || ""}
                      numPowersCompleted={numPowersCompleted}
                      numPowersTotal={powers.length}
                      showProgress
                      ellipsis
                    >
                      <div className="flex flex-col gap-1">
                        <div className="mr-auto">
                          <span className="text-shark-400 text-[13px] font-dm-sans">
                            {endDateLabel}
                          </span>
                        </div>
                      </div>
                    </QuestCard>
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
            <Filters
              defaultValue="ACTIVE"
              object={QuestTagMapping}
              onChange={setSelectedOption}
              disabled={isLoadingQuests}
            />
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
