import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import Options from "@/components/Options";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { MESSAGES } from "../../messages";
import React, { useState } from "react";
import { PowerCard } from "@/components/cards/PowerCard";
import { JubmojiPower } from "../../types";
import Link from "next/link";
import { useFetchPowers } from "@/hooks/useFetchPowers";
import { Placeholder } from "@/components/Placeholder";

export const PowerOptionsMapping: Record<
  "ALL" | "STARRED" | "NEW" | "LOCKED",
  string
> = {
  ALL: "All",
  STARRED: "Starred",
  NEW: "New",
  LOCKED: "Locked",
};

const PlaceholderContent = () => {
  return (
    <div className="flex flex-col gap-2">
      <Placeholder.Card size="xs" />
      <Placeholder.Card size="xs" />
      <Placeholder.Card size="xs" />
      <Placeholder.Card size="xs" />
      <Placeholder.Card size="xs" />
    </div>
  );
};

export default function PowersPage() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [infoModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: isLoadingPowers, data: powers = [] } = useFetchPowers();

  // const filteredItems =
  //   selectedOption === "all" ? powers : filterItems(powers, selectedOption);
  // const hasItemsForActiveOption = filteredItems?.length > 0;

  return (
    <>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Powers
      </Modal>
      <div className="flex flex-col">
        <AppHeader
          title="YOUR POWERS"
          actions={
            <button
              onClick={() => setIsModalOpen(!infoModalOpen)}
              type="button"
            >
              <Icons.info />
            </button>
          }
        />
        <Input placeholder="Search your private collection" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="grid grid-cols-1 gap-6">
          <span className="text-lg font-bold text-white">
            Unlocked from quests
          </span>
          <Options
            defaultValue="all"
            object={PowerOptionsMapping}
            onChange={setSelectedOption}
            disabled={isLoadingPowers}
          />
          <div className="flex flex-col gap-2">
            {isLoadingPowers ? (
              <PlaceholderContent />
            ) : (
              <>
                {powers.length === 0 ? (
                  <span className="text-base font-normal">
                    {MESSAGES.NO_RESULTS}
                  </span>
                ) : (
                  <>
                    {powers?.map(
                      ({ id, name, description, powerType }: JubmojiPower) => {
                        return (
                          <Link key={id} href={`/powers/${id}`}>
                            <PowerCard
                              title={name}
                              description={description}
                              powerType={powerType}
                              shortDescription={true}
                            />
                          </Link>
                        );
                      }
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
