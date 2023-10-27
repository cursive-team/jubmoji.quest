import React from "react";
import { Modal, ModalProps } from "./Modal";
import { FAQS } from "@/common/infoFaqs";
import { Collapse } from "../ui/Collapse";

const InfoModal = ({ isOpen, setIsOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose}>
      <div className=" flex flex-col gap-12">
        <span className="text-[36px] font-giorgio text-center">
          ABOUT <br /> JUBMOJI.QUEST
        </span>
        <div className="grid grid-cols-1 gap-4">
          {FAQS?.map(({ title, description }, index) => {
            const titlePrefix = index + 1 < 10 ? `0${index + 1}` : index + 1;
            title = `${titlePrefix}. ${title}`;

            return (
              <Collapse key={index} title={title} description={description} />
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

InfoModal.displayName = "InfoModal";
export { InfoModal };
