import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { Filters } from "@/components/Filters";
import { Input } from "@/components/ui/Input";
import { MESSAGES } from "../../messages";
import React, { useState } from "react";
import { PowerCard } from "@/components/cards/PowerCard";
import { JubmojiPower } from "../../types";
import Link from "next/link";
import { useFetchPowers } from "@/hooks/useFetchPowers";
import { Placeholder } from "@/components/Placeholder";
import { Message } from "@/components/Message";
import { InfoModal } from "@/components/modals/InfoModal";
import { useGetPowerLockedStatus } from "@/hooks/useFetchPowers";

type PowerCardDetailProps = {
  power: JubmojiPower;
};

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

const PowerCardDetail = ({ power }: PowerCardDetailProps) => {
  const { data: { locked: powerIsLocked } = {} } = useGetPowerLockedStatus(
    power.quest.id
  );

  return powerIsLocked === undefined || powerIsLocked ? (
    <PowerCard
      title={power.name}
      description={power.description}
      powerType={power.powerType}
      locked={powerIsLocked}
      disabled={powerIsLocked}
      shortDescription
      ellipsis
    />
  ) : (
    <Link href={`/powers/${power.id}`}>
      <PowerCard
        title={power.name}
        description={power.description}
        powerType={power.powerType}
        locked={powerIsLocked}
        disabled={powerIsLocked}
        shortDescription
        ellipsis
      />
    </Link>
  );
};

export default function PowersPage() {
  // const [selectedOption, setSelectedOption] = useState("all");
  const [infoModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: isLoadingPowers, data: powers = [] } = useFetchPowers();

  // const filteredItems =
  //   selectedOption === "all" ? powers : filterItems(powers, selectedOption);
  // const hasItemsForActiveOption = filteredItems?.length > 0;

  return (
    <>
      <InfoModal isOpen={infoModalOpen} setIsOpen={setIsModalOpen} />
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
        <Input placeholder="Find a zk proof to use" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="grid grid-cols-1 gap-6">
          {/* <Filters
            defaultValue="all"
            object={PowerOptionsMapping}
            onChange={setSelectedOption}
            disabled={isLoadingPowers}
          /> */}
          <div className="flex flex-col gap-4">
            {isLoadingPowers ? (
              <PlaceholderContent />
            ) : (
              <>
                {powers.length === 0 ? (
                  <Message>{MESSAGES.NO_RESULTS}</Message>
                ) : (
                  <>
                    {powers?.map((power: JubmojiPower) => (
                      <PowerCardDetail power={power} key={power.id} />
                    ))}
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
