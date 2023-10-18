import AppHeader from "@/components/AppHeader";
import Card from "@/components/Card";
import Options from "@/components/Options";
import { Power, PowerOptionsMapping, powers } from "@/lib/dev_mockData/demo";
import { filterItems } from "@/lib/utils";
import { MESSAGES } from "@/messages";
import React, { useState } from "react";

export default function PowersPage() {
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredItems =
    selectedOption === "all" ? powers : filterItems(powers, selectedOption);

  const hasItemsForActiveOption = filteredItems?.length > 0;

  return (
    <div>
      <AppHeader title="YOUR POWERS"></AppHeader>
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
    </div>
  );
}
