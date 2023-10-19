import AppHeader from "@/components/AppHeader";
import Card from "@/components/Card";
import { Icons } from "@/components/Icons";
import Options from "@/components/Options";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { Power, PowerOptionsMapping, powers } from "@/lib/dev_demo";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import React, { useState } from "react";

export default function PowersPage() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [infoModalOpen, setIsModalOpen] = useState(false);

  const filteredItems =
    selectedOption === "all" ? powers : filterItems(powers, selectedOption);

  const hasItemsForActiveOption = filteredItems?.length > 0;

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
          />
          <div className="flex flex-col gap-2">
            {!hasItemsForActiveOption ? (
              <span className="text-base font-normal">
                {MESSAGES.NO_RESULTS}
              </span>
            ) : (
              <>
                {filteredItems?.map(
                  ({ id, name, description, image }: Power) => {
                    return (
                      <Card
                        key={id}
                        title={name}
                        description={description}
                        image={image}
                        percentageProgress={67}
                      />
                    );
                  }
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
