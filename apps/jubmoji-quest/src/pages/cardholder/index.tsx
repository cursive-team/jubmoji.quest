// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { useEffect, useRef, useState } from "react";
import MobileDetect from "mobile-detect";
import { InfoModal } from "@/components/modals/InfoModal";
import { AppHeader } from "@/components/AppHeader";
import { Icons } from "@/components/Icons";
import { PowerCard } from "@/components/cards/PowerCard";
import { Message } from "@/components/Message";
import { Modal, ModalProps } from "@/components/modals/Modal";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  getRandomNullifierRandomness,
  getMessageHash,
  PublicMessageSignature,
  createProofInstance,
  cardPubKeys,
  NfcCardRawSignature,
} from "jubmoji-api";
import { bigIntToHex } from "babyjubjub-ecdsa";

enum CardholderActions {
  EDIT_CARD_DETAILS,
  PROPOSE_QUEST,
  RECOMMEND_CARDHOLDER,
  PSEUD_X_POST,
  PSEUD_TELEGRAM_POST,
}

const cardholderActionDetails: Record<
  CardholderActions,
  {
    title: string;
    buttonText: string;
    entryFields: { field: string; size: "big" | "small" }[];
  }
> = {
  [CardholderActions.EDIT_CARD_DETAILS]: {
    title: "Cardholder edit portal",
    buttonText: "Unlock editing",
    entryFields: [
      { field: "Card Number", size: "big" },
      { field: "Card Name", size: "big" },
    ],
  },
  [CardholderActions.PROPOSE_QUEST]: {
    title: "Quest proposal portal",
    buttonText: "Unlock proposal",
    entryFields: [
      { field: "Quest Name", size: "big" },
      { field: "Quest Description", size: "small" },
    ],
  },
  [CardholderActions.RECOMMEND_CARDHOLDER]: {
    title: "New cardholder recommendation portal",
    buttonText: "Unlock recommendation",
    entryFields: [
      { field: "Cardholder Name", size: "big" },
      { field: "Cardholder Details", size: "small" },
    ],
  },
  [CardholderActions.PSEUD_X_POST]: {
    title: "Pseudonymous X Post",
    buttonText: "Unlock posting",
    entryFields: [{ field: "Post Content", size: "big" }],
  },
  [CardholderActions.PSEUD_TELEGRAM_POST]: {
    title: "Pseudonymous Telegram Message",
    buttonText: "Unlock messaging",
    entryFields: [{ field: "Message Content", size: "big" }],
  },
};

interface CardholderTapModalProps extends ModalProps {
  action: CardholderActions;
}

const CardholderTapModal = ({
  action,
  isOpen,
  setIsOpen,
}: CardholderTapModalProps) => {
  const md = useRef<any>();
  useEffect(() => {
    md.current = new MobileDetect(window?.navigator?.userAgent);
  }, []);
  const deviceImage = md?.current?.is("iPhone")
    ? "/images/tap-phone-ios.png"
    : "/images/tap-phone-android.png";

  const initialTap = async () => {
    const initMessage = getRandomNullifierRandomness();
    const messageHash = bigIntToHex(getMessageHash(initMessage));
    let command = {
      name: "sign",
      keyNo: 1,
      digest: messageHash,
    };

    let res: {
      input: { digest: string };
      signature: { raw: NfcCardRawSignature };
      publicKey: string;
    };
    try {
      // --- request NFC command execution ---
      res = await execHaloCmdWeb(command, {
        statusCallback: (cause: any) => {
          if (cause === "retry") {
            toast.error("Tapping failed, please try again.");
          } else {
            console.log("Tapping status", cause);
          }
        },
      });

      const proofInstance = createProofInstance(PublicMessageSignature, {
        randStr: "",
      });
      const pubKeyIndex = cardPubKeys.findIndex(
        (key) => key.pubKeySlot1 === res.publicKey // Use secp256k1 key here, which is in slot 1
      );
      const proof = await proofInstance.prove({
        message: res.input.digest,
        rawSig: res.signature.raw,
        pubKeyIndex,
      });
      const { verified } = await proofInstance.verify(proof);

      if (verified) {
        toast.success("Cardholder verified!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Tapping failed, please try again.");
    }
  };

  console.log(action);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-center my-auto">
        <div className="w-[331px] leading-tight">
          <Card.Title centred className="!font-[22px] mt-16 mb-2">
            {cardholderActionDetails[action].title}
          </Card.Title>
          <span className="font-dm-sans text-[16px] text-shark-400">
            Tap unlock, then hold your card to your phone as pictured.
          </span>
        </div>
        <Image
          src={deviceImage}
          width={180}
          height={200}
          alt="tap card"
          className="mx-auto py-12"
        />
        <div className="flex flex-col gap-8">
          <Button variant="secondary" onClick={initialTap}>
            {cardholderActionDetails[action].buttonText}
          </Button>
          <span className=" font-dm-sans ">
            {`If you still can't tap, check out our `}
            <u>
              <a href="https://pse-team.notion.site/Card-tapping-instructions-ac5cae2f72e34155ba67d8a251b2857c">
                troubleshooting guide
              </a>
            </u>
            {"."}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default function CardholderEditPage() {
  const [infoModalOpen, setIsModalOpen] = useState(false);
  const [cardholderAction, setCardholderAction] = useState<CardholderActions>();

  return (
    <>
      <InfoModal isOpen={infoModalOpen} setIsOpen={setIsModalOpen} />

      {cardholderAction !== undefined && (
        <CardholderTapModal
          action={cardholderAction}
          isOpen={cardholderAction !== undefined}
          setIsOpen={() => setCardholderAction(undefined)}
        />
      )}

      <div>
        <AppHeader
          title="CARDHOLDER HOME"
          actions={
            <button
              onClick={() => setIsModalOpen(!infoModalOpen)}
              type="button"
            >
              <Icons.info />
            </button>
          }
        />
        <Message>
          {`Every cardholder action is gated by two separate NFC taps to protect your card data.`}
        </Message>
        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <div
                onClick={() =>
                  setCardholderAction(CardholderActions.EDIT_CARD_DETAILS)
                }
              >
                <PowerCard
                  title="Edit card details"
                  description="Change your jubmoji display"
                  powerType="REDIRECT"
                />
              </div>

              <div
                onClick={() =>
                  setCardholderAction(CardholderActions.PROPOSE_QUEST)
                }
              >
                <PowerCard
                  title="Propose a quest"
                  description="Cardholders can propose quests for the community"
                  powerType="REDIRECT"
                />
              </div>

              <div
                onClick={() =>
                  setCardholderAction(CardholderActions.RECOMMEND_CARDHOLDER)
                }
              >
                <PowerCard
                  title="Recommend a new cardholder"
                  description="Existing cardholders can vouch for new cardholders and experiences"
                  powerType="QR_CODE"
                />
              </div>

              <div
                onClick={() =>
                  setCardholderAction(CardholderActions.PSEUD_X_POST)
                }
              >
                <PowerCard
                  title="Pseudonymous X post"
                  description="Cardholders can post to X using their jubmoji identity"
                  powerType="TWITTER"
                />
              </div>

              <div
                onClick={() =>
                  setCardholderAction(CardholderActions.PSEUD_TELEGRAM_POST)
                }
              >
                <PowerCard
                  title="Pseudonymous Telegram message"
                  description="Cardholders can message on TG using their jubmoji identity"
                  powerType="TELEGRAM"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
