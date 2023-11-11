import React from "react";
import { Modal, ModalProps } from "./Modal";
import { AppleWalletButton } from "@/components/AppleWalletButton";
import { GoogleWalletButton } from "@/components/GoogleWalletButton";
import { Card } from "../cards/Card";
import { Button } from "../ui/Button";
import { Icons } from "../Icons";
import { useJubmojis } from "@/hooks/useJubmojis";
import { succinctSerializeJubmojiList } from "jubmoji-api";
import toast from "react-hot-toast";
import { APP_CONFIG } from "@/constants";
import Image from "next/image";
import { writeBackupState } from "@/lib/localStorage";

export default function BackupModal({ children, ...props }: ModalProps) {
  const { data: jubmojis } = useJubmojis();

  const handleCopy = async () => {
    if (!jubmojis) return;

    const succinctSerialization = succinctSerializeJubmojiList(jubmojis);
    const copyText =
      "Jubmoji recovery link: " +
      APP_CONFIG.RECOVERY_URL(succinctSerialization);

    await writeBackupState({
      type: "copypaste",
    });

    // Use Clipboard API where available
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(copyText);
        toast.success("Jubmojis added to clipboard");
      } catch (err) {
        toast.error("Failed to copy jubmojis");
      }
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.success("Jubmojis added to clipboard");
      } catch (err) {
        toast.error("Failed to copy jubmojis");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-16 items-center justify-center max-w-[232px] sm:max-w-[320px] w-full mx-auto grow">
        <div className="flex flex-col gap-6 xs:gap-16">
          <Card.Title className="!text-[22px] text-center mx-auto">
            Backup your entire collection
          </Card.Title>
          <div className="flex flex-col gap-4 xs:gap-8">
            <GoogleWalletButton />
            <AppleWalletButton />
            <button
              disabled={!jubmojis}
              onClick={async () => {
                const succinctSerialization = succinctSerializeJubmojiList(
                  jubmojis!
                );
                await writeBackupState({
                  type: "whatsapp",
                });
                const whatsappUrl =
                  "https://wa.me/?text=" +
                  encodeURIComponent(
                    "Jubmoji recovery link: " +
                      APP_CONFIG.RECOVERY_URL(succinctSerialization)
                  );
                window.location.href = whatsappUrl;
              }}
            >
              <Image
                src="/images/whatsapp.svg"
                alt="Backup QR code"
                width={264}
                height={52}
                sizes="100vw"
              />
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-auto">
            <span className="font-hind-siliguri font-normal text-[13px] text-[#888] text-center">
              Alternatively you can copy/paste the recovery link into the
              encrypted messaging app or password manager of your choice!
            </span>
            <Button
              disabled={!jubmojis}
              onClick={handleCopy}
              icon={<Icons.copy />}
            >
              Copy recovery link
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
