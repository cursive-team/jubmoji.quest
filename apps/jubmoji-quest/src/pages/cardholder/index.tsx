// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import { Textarea } from "@/components/ui/Textarea";
import { useFetchCards } from "@/hooks/useFetchCards";
import { useRouter } from "next/navigation";

enum CardholderActions {
  EDIT_CARD_DETAILS,
  PROPOSE_QUEST,
  PSEUD_X_POST,
  PSEUD_TELEGRAM_POST,
  JOIN_TG_GROUP,
}

const cardholderActionDetails: Record<
  CardholderActions,
  {
    title: string;
    buttonText: string;
    descriptionText: string;
    entryFields?: { field: string; size: "big" | "small" }[];
    redirect?: string;
  }
> = {
  [CardholderActions.EDIT_CARD_DETAILS]: {
    title: "Cardholder edit portal",
    buttonText: "Begin",
    descriptionText:
      "Press begin, then hold your card to your phone as pictured.",
  },
  [CardholderActions.PSEUD_X_POST]: {
    title: "Pseudonymous X Post",
    buttonText: "Begin",
    descriptionText:
      "Press begin, then hold your card to your phone as pictured.",
  },
  [CardholderActions.PSEUD_TELEGRAM_POST]: {
    title: "Pseudonymous Telegram Message",
    buttonText: "Begin",
    descriptionText:
      "Press begin, then hold your card to your phone as pictured.",
  },
  [CardholderActions.PROPOSE_QUEST]: {
    title: "Quest proposal portal",
    buttonText: "Verify cardholder",
    descriptionText:
      "Press verify, then hold your card to your phone as pictured.",
    redirect: "/quest-proposal",
  },
  [CardholderActions.JOIN_TG_GROUP]: {
    title: "Join cardholder TG group",
    buttonText: "Verify cardholder",
    descriptionText:
      "Press verify, then hold your card to your phone as pictured.",
    redirect: "https://t.me/+gD_iKIoH2w1lMDUx",
  },
};

export default function CardholderEditPage() {
  const router = useRouter();
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

        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <Message>{`Cardholder powers (need 2 taps)`}</Message>

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

              {/* <div
                onClick={() =>
                  setCardholderAction(CardholderActions.PSEUD_X_POST)
                }
              >
                <PowerCard
                  title="Pseudonymous X post"
                  description="Cardholders can post to X using their jubmoji identity"
                  powerType="TWITTER"
                />
              </div> */}

              <Message>{`Cardholder gated (need 1 tap)`}</Message>

              <div onClick={() => router.push("/club")}>
                <PowerCard
                  title="JUBMOJI-CLUB"
                  description="Post on Twitter using your jubmoji identity"
                  powerType="TWITTER"
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
                  setCardholderAction(CardholderActions.JOIN_TG_GROUP)
                }
              >
                <PowerCard
                  title="Join cardholder TG group"
                  description="Group where updates are sent & feedback can be shared"
                  powerType="TELEGRAM"
                />
              </div>

              <Message>{`Open to all`}</Message>

              <Link href="/card-request">
                <PowerCard
                  title="Apply to be a cardholder"
                  description="Describe what you'd like to do with your card during Devconnect"
                  powerType="QR_CODE"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

enum CardholderTapModalState {
  UNLOCKING,
  EDITING,
  CONFIRMING,
}

interface CardholderTapModalProps extends ModalProps {
  action: CardholderActions;
}

const CardholderTapModal = ({
  action,
  isOpen,
  setIsOpen,
}: CardholderTapModalProps) => {
  const {
    isLoading: isLoadingJubmojiCards,
    data: jubmojiCollectionCards = [],
  } = useFetchCards();

  const [modalState, setModalState] = useState(
    CardholderTapModalState.UNLOCKING
  );
  const [pubKeyIndex, setPubKeyIndex] = useState<number>();
  const [meaning, setMeaning] = useState<string>();
  const [telegramLink, setTelegramLink] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const [deviceImage, setDeviceImage] = useState<string>(
    "/images/tap-phone-android.png"
  );
  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.is("iPhone")) {
      setDeviceImage("/images/tap-phone-ios.png");
    }
  }, []);

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
        message: initMessage,
        rawSig: res.signature.raw,
        pubKeyIndex,
      });
      const { verified } = await proofInstance.verify(proof);

      if (verified) {
        toast.success("Cardholder verified!");

        setPubKeyIndex(pubKeyIndex);
        setMeaning(jubmojiCollectionCards[pubKeyIndex].name);
        const cardTelegramLink =
          jubmojiCollectionCards[pubKeyIndex].telegramChatInviteLink;
        if (cardTelegramLink !== null) {
          setTelegramLink(cardTelegramLink);
        }
        const cardWebsite = jubmojiCollectionCards[pubKeyIndex].websiteLink;
        if (cardWebsite !== null) {
          setWebsite(cardWebsite);
        }

        const redirectAfterTap = cardholderActionDetails[action].redirect;
        if (redirectAfterTap) {
          window.location.href = redirectAfterTap;
        } else {
          setModalState(CardholderTapModalState.EDITING);
        }
      } else {
        toast.error("Cardholder verification failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Tapping failed, please try again.");
    }
  };

  const sendTap = async () => {
    const updateData = JSON.stringify({
      meaning,
      telegramLink,
      website,
    });
    const messageHash = bigIntToHex(getMessageHash(updateData));
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

      const retrievedPubKeyIndex = cardPubKeys.findIndex(
        (key) => key.pubKeySlot1 === res.publicKey // Use secp256k1 key here, which is in slot 1
      );
      if (retrievedPubKeyIndex !== pubKeyIndex) {
        toast.error("Tapping with a different card, try again.");
        return;
      }

      const proofInstance = createProofInstance(PublicMessageSignature, {
        randStr: "",
      });
      const proof = await proofInstance.prove({
        message: updateData,
        rawSig: res.signature.raw,
        pubKeyIndex: retrievedPubKeyIndex,
      });
      const { verified } = await proofInstance.verify(proof);

      if (verified) {
        const response = await fetch("/api/updateCard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateData,
            rawSig: res.signature.raw,
            pubKeyIndex,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast.success("Update sent!");
        setIsOpen(false);
      } else {
        toast.error("Cardholder verification failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed, please try again or exit.");
    }
  };

  switch (modalState) {
    case CardholderTapModalState.UNLOCKING:
      return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="text-center my-auto">
            <div className="w-[331px] leading-tight">
              <Card.Title centred className="!font-[22px] mt-16 mb-2">
                {cardholderActionDetails[action].title}
              </Card.Title>
              <span className="font-dm-sans text-[16px] text-shark-400">
                {cardholderActionDetails[action].descriptionText}
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
    case CardholderTapModalState.EDITING:
      return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="flex flex-col gap-4">
            <div className="w-[331px]">
              <Card.Title centred className="!font-[22px] mt-16 mb-2">
                {`Editing ${cardPubKeys[pubKeyIndex!].emoji}`}
              </Card.Title>
            </div>

            <div
              className="w-full h-[200px]"
              style={{
                backgroundImage: `url(${
                  cardPubKeys[pubKeyIndex!].imageBlobUrl
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform:
                  cardPubKeys[pubKeyIndex!].landscapeImage === "checked"
                    ? "rotate(-90deg)"
                    : "none",
              }}
            ></div>

            <span className=" font-dm-sans text-[13px] font-semibold text-shark-50">
              Meaning*
            </span>
            <Textarea
              value={meaning}
              onChange={(event) => setMeaning(event.target.value)}
              placeholder="Edit your jubmoji's meaning"
              rows={1}
            />

            <span className=" font-dm-sans text-[13px] font-semibold text-shark-50">
              Telegram link
            </span>
            <Textarea
              value={telegramLink}
              onChange={(event) => setTelegramLink(event.target.value)}
              placeholder="t.me/username or chat link"
              rows={1}
            />

            <span className=" font-dm-sans text-[13px] font-semibold text-shark-50">
              Website
            </span>
            <Textarea
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              placeholder="Enter relevant website, Twitter, or Github"
              rows={1}
            />

            <div className="flex flex-col gap-8">
              <Button
                variant="secondary"
                onClick={() => {
                  if (meaning) {
                    setModalState(CardholderTapModalState.CONFIRMING);
                  } else {
                    toast.error("Please fill in required fields.");
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      );
    case CardholderTapModalState.CONFIRMING:
      return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="text-center my-auto">
            <div className="w-[331px] leading-tight">
              <Card.Title centred className="!font-[22px] mt-16 mb-2">
                Use card to confirm your submission
              </Card.Title>
              <span className="font-dm-sans text-[16px] text-shark-400">
                Tap confirm, then hold your card to your phone as pictured.
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
              <Button variant="secondary" onClick={sendTap}>
                Confirm
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
  }
};
