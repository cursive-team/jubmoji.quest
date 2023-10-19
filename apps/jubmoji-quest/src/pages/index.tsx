import AppHeader from "@/components/AppHeader";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useJubmojis } from "@/hooks/useJubmojis";
import Card from "@/components/Card";
import Options from "@/components/Options";
import { Quest, QuestOptionsMapping, quests } from "@/lib/dev_demo";
import Link from "next/link";
import { useState } from "react";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/modals/Modal";

const BackupSection = () => {
  const { isLoading: isLoadingSigmojis, data: sigmojis } = useJubmojis();

  const hasSigmojis = sigmojis && sigmojis.length > 0 && !isLoadingSigmojis;

  if (isLoadingSigmojis) return <div>Loading...</div>;
  if (!hasSigmojis) return null;
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

  const filteredItems =
    selectedOption === "all" ? quests : filterItems(quests, selectedOption);

  const hasItemsForActiveOption = filteredItems?.length > 0;

  return (
    <>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Jumbo quest
      </Modal>
      <div>
        <AppHeader
          title={
            <div className="grid grid-cols-[1fr_48px] w-full items-center py-4">
              <Link href="/">
                <div className="flex items-center">
                  <div className="w-[48px]">
                    {/*
                    TODO: Replace with logo when is ready
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixW4vgBDs47UIhecXICevBKR6m-uNNUHprLkyGNYlCyT4gFqZtlPiSJtzmqc&s"
                      height={48}
                      width={48}
                    />
                  */}
                  </div>
                  <div className="mx-auto">
                    <Icons.logo />
                  </div>
                </div>
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
              object={QuestOptionsMapping}
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
                    ({ id, name, description, image }: Quest) => {
                      return (
                        <Card
                          key={id}
                          title={name}
                          description={description}
                          image={image}
                          percentageProgress={67}
                          showProgress
                        />
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
