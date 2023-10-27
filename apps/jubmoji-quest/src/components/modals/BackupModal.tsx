import React from "react";
import { Modal, ModalProps } from "./Modal";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";
import { Card } from "../cards/Card";
import { Button } from "../ui/Button";
import { Icons } from "../Icons";

export default function BackupModal({ children, ...props }: ModalProps) {
  return (
    <Modal {...props}>
      <div className="flex flex-col gap-16 items-center justify-center max-w-[232px] w-full mx-auto grow">
        <div className="flex flex-col gap-6 xs:gap-16">
          <Card.Title className="!text-[22px] text-center">
            Back up your collection
          </Card.Title>
          <div className="flex flex-col gap-4 xs:gap-8">
            <GoogleWalletButton />
            <AppleWalletButton />
          </div>
          <div className="flex flex-col gap-4 mt-auto">
            <span className="font-hind-siliguri font-normal text-[13px] text-[#888]">
              Alternatively you can copy/paste the data directly to the
              encrypted messaging or password manager or your choice
            </span>
            <Button icon={<Icons.copy />}>Copy data store</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
