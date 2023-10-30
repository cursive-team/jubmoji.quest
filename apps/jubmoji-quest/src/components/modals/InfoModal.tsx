import React from "react";
import { Modal, ModalProps } from "./Modal";
import { FAQS } from "@/common/infoFaqs";
import { Collapse } from "../ui/Collapse";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../Icons";
import { URLS } from "@/constants";

const InfoModal = ({ isOpen, setIsOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose}>
      <div className="flex flex-col gap-12">
        <span className="text-[36px] font-giorgio text-center">
          ABOUT <br /> JUBMOJI.QUEST
        </span>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4">
            {FAQS?.map(({ title, description }, index) => {
              const titlePrefix = index + 1 < 10 ? `0${index + 1}` : index + 1;
              title = `${titlePrefix}. ${title}`;

              return (
                <Collapse key={index} title={title} description={description} />
              );
            })}
          </div>
          <div className="mx-auto text-center">
            <Link
              href={URLS.PSE_DEV}
              target="_blank"
              className="flex flex-col gap-4"
            >
              <Image
                src="/images/pse-logo.png"
                width={80}
                height={80}
                alt="pse logo"
              />
              <span className="text-shark-50 font-dm-sans text-base font-normal">
                pse.dev
              </span>
            </Link>
          </div>
          <div className=" flex flex-col gap-5 items-center">
            <Link
              className="text-shark-50 hover:text-baby-blue-default font-dm-sans text-[13px]"
              href={URLS.GITHUB}
            >
              <div className="flex items-center gap-1 underline">
                <span>Github</span>
                <Icons.externalLink />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

InfoModal.displayName = "InfoModal";
export { InfoModal };
