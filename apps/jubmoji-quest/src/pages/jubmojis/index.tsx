import AppHeader from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import JumboCard from "@/components/JumboCard";
import { Modal } from "@/components/modals/Modal";
import { Input } from "@/components/ui/Input";
import { useJubmojis } from "@/hooks/useJubmojis";
import { classed } from "@tw-classed/react";
import React, { useEffect, useState } from "react";

const JubmoNavItem = classed.div(
  "block p-2 w-[32px] h-16 rounded cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-shark-600 mx-2 first:ml-0 mx-2 last:mr-0",
        false: "bg-shark-900",
      },
    },
  }
);

const JumboNavWrapper = classed.div(
  "grid grid-flow-col auto-cols-max h-20 py-[6px] gap-[1px] px-2 fixed left-0 rigth-0 bottom-[80px] w-full overflow-scroll"
);

const JumbojiNav = () => {
  const [active, setActive] = React.useState<number | undefined>(undefined);

  const jubmojis = Array.from(Array(12).keys());

  const onSelectJubmoji = (jubmoji: any, index?: number) => {
    setActive(index);
  };

  return (
    <JumboNavWrapper>
      {jubmojis?.map((jubmoji, index) => {
        const isActive = index === active;

        return (
          <JubmoNavItem
            key={index}
            active={isActive}
            onClick={() => onSelectJubmoji(jubmoji, index)}
          />
        );
      })}
    </JumboNavWrapper>
  );
};
export default function JubmojisPage() {
  const { data: jubmojis = [] } = useJubmojis();
  const [infoModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={infoModalOpen} setIsOpen={setIsModalOpen}>
        Info for Jubmojis
      </Modal>
      <div className="flex flex-col">
        <AppHeader
          title="YOUR JUBMOJIS"
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
        <div className="my-4">
          <JumboCard
            label="Meaning of Jummoji"
            icon="🎉"
            edition={10}
            owner="kalidou"
            questName="Jubmoji Quest"
            cardBackImage="/images/card-back-image.png"
            actions={<span>backed up</span>}
          />
        </div>
        <div className="mt-auto">
          <JumbojiNav />
        </div>
      </div>
    </>
  );
}
