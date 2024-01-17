import Image from "next/image";
import { Modal, ModalProps } from "@/components/modals/Modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { classed } from "@tw-classed/react";
import { Card } from "@/components/cards/Card";
import { Icons } from "@/components/Icons";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import MobileDetect from "mobile-detect";
import Head from "next/head";
import { sha256 } from "js-sha256";

const ContentWrapper = classed.div("flex flex-col gap-6 mt-3");
const ContentDescription = classed.div("font-dm-sans text-center");
const ButtonWrapper = classed.div("flex flex-col mt-6 gap-6");

type CardOptionProps = {
  label: string;
  description?: string;
  onClick?: () => void;
};

const CardOption = ({ label, description, onClick }: CardOptionProps) => {
  return (
    <Card.Base
      onClick={onClick}
      className="p-4 !items-start !flex-row justify-between"
    >
      <div>
        <Card.Title>{label}</Card.Title>
        <Card.Description className="!text-shark-300">
          {description}
        </Card.Description>
      </div>
      <Icons.arrowRight />
    </Card.Base>
  );
};

type Identity = "cardholder" | "collector" | "vapor";
type TypeOfTweet =
  | "new-manifestation"
  | "reveal-manifestation"
  | "normal-tweet";

const tweetInputTextMap: Record<TypeOfTweet, string> = {
  "new-manifestation": "Manfestation",
  "reveal-manifestation": "Previous manifestation",
  "normal-tweet": "Tweet",
};

const tweetPlaceholderTextMap: Record<TypeOfTweet, string> = {
  "new-manifestation": "Dreams, goals, resolutions, confessions...",
  "reveal-manifestation": "Exact pre-image of prior manifestation...",
  "normal-tweet": "What's on your mind?",
};

const SignTweetModal = ({
  isOpen,
  setIsOpen,
  onSign,
}: ModalProps & { onSign?: () => void }) => {
  const [deviceImage, setDeviceImage] = useState<string>(
    "/images/tap-phone-android.png"
  );
  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.is("iPhone")) {
      setDeviceImage("/images/tap-phone-ios.png");
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="text-center my-auto">
        <div className="w-[331px] leading-tight">
          <Card.Title centred size="md" className="!font-giorgio mt-16 mb-2">
            Hold your card to phone to sign tweet
          </Card.Title>
          <span className="font-dm-sans text-[16px] text-shark-400"></span>
        </div>
        <Image
          src={deviceImage}
          width={180}
          height={200}
          alt="tap card"
          className="mx-auto py-12"
        />

        <div className="flex flex-col gap-8">
          <Button variant="blue" onClick={onSign}>
            Ready to sign
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
export default function InfoPage() {
  const [signTweetModal, setSignTweetModal] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [typeOfTweet, setTypeOfTweet] = useState<TypeOfTweet | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [tweetManifest, setTweetManifest] = useState("");
  const [tweetReplyTo, setTweetReplyTo] = useState("");

  const [tweetPosted, setTweetPosted] = useState(false);

  const router = useRouter();

  const standardSHAHash = (msg: string): string => {
    const hasher = sha256.create();
    return hasher.update(msg).hex();
  };

  const onSelectIdentity = (selectedIdentity: Identity) => {
    if (!selectedIdentity) return;
    setIdentity(selectedIdentity);
    setCurrentStepIndex(1);
  };

  const onSelectTypeOfTweet = (type: TypeOfTweet) => {
    if (!type) return;
    setTypeOfTweet(type);
    setCurrentStepIndex(2);
  };

  const ChooseIdentity = () => {
    return (
      <ContentWrapper>
        <ContentDescription>Use a new identity on Twitter!</ContentDescription>
        <div className="flex flex-col gap-6">
          <CardOption
            label="💁‍♀️ Cardholder"
            description="Tweet as your card's emoji"
            onClick={() => onSelectIdentity("cardholder")}
          />
          {/* <CardOption
            label="Collector"
            description="Tweet as a jubmoji owner"
            onClick={() => onSelectIdentity("collector")}
          /> */}
          <CardOption
            label="💨 Vapor"
            description="Anon cardholder, 1 day expiry"
            onClick={() => onSelectIdentity("vapor")}
          />
        </div>
        <ButtonWrapper>
          <Button onClick={() => router.push("/cardholder")}>
            <div className="flex items-center gap-4">
              <Icons.arrowLeft />
              Back to jubmoji.quest
            </div>
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    );
  };

  const ChooseTypeOfTweet = () => {
    return (
      <ContentWrapper>
        <ContentDescription>Choose a type of tweet!</ContentDescription>
        <div className="flex flex-col gap-6">
          <CardOption
            label="✨ Manifest"
            description="Post a hash of a dream or resolution"
            onClick={() => onSelectTypeOfTweet("new-manifestation")}
          />
          <CardOption
            label="💫 Reveal"
            description="Reveal an earlier hash"
            onClick={() => onSelectTypeOfTweet("reveal-manifestation")}
          />
          <CardOption
            label="🐦 Standard"
            description="Good old 280 characters"
            onClick={() => onSelectTypeOfTweet("normal-tweet")}
          />
        </div>
        <ButtonWrapper>
          <Button onClick={() => setCurrentStepIndex(0)}>
            <div className="flex items-center gap-4">
              <Icons.arrowLeft />
              Back
            </div>
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    );
  };

  const Tweet = () => {
    const onConfirmTweet = () => {
      setIsOpen(false);
      setSignTweetModal(true);
    };

    const confirmDisabled = tweetManifest?.length === 0;
    return (
      typeOfTweet && (
        <ContentWrapper>
          <ContentDescription></ContentDescription>
          <div className="flex flex-col gap-6">
            <Textarea
              title={tweetInputTextMap[typeOfTweet] + "*"}
              placeholder={tweetPlaceholderTextMap[typeOfTweet]}
              cols={5}
              value={tweetManifest}
              onChange={(e) => setTweetManifest(e?.target?.value)}
            />
            <Input
              title="Tweet to reply to"
              placeholder="Paste optional link..."
              value={tweetReplyTo}
              onChange={(e) => setTweetReplyTo(e?.target?.value)}
            />
            {typeOfTweet === "new-manifestation" && tweetManifest && (
              <Input
                size="sm"
                title="Tweet output"
                value={standardSHAHash(tweetManifest)}
                readOnly
              />
            )}
          </div>
          <ButtonWrapper>
            <Button
              variant="blue"
              disabled={confirmDisabled}
              onClick={onConfirmTweet}
            >
              Confirm
            </Button>
            <Button onClick={() => setCurrentStepIndex(1)}>
              <div className="flex items-center gap-4">
                <Icons.arrowLeft />
                Back
              </div>
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      )
    );
  };

  const steps = [ChooseIdentity, ChooseTypeOfTweet, Tweet];

  const onSignTweet = async () => {
    // todo: sign tweet

    // show tweet posted buttons
    setTweetPosted(true);
    setSignTweetModal(false);

    // clear all field that we set before
    setTweetManifest("");
    setTweetReplyTo("");
    setCurrentStepIndex(0);
    setTypeOfTweet(null);
    setIdentity(null);
  };

  return (
    <>
      <Head>
        <title>jubmoji-club</title>
      </Head>
      <SignTweetModal
        isOpen={signTweetModal}
        setIsOpen={setSignTweetModal}
        onSign={onSignTweet}
      />
      <Modal isOpen={true} setIsOpen={() => {}} closable={false}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-8">
            <Image
              src="/images/logo.svg"
              width={120}
              height={120}
              alt="logo"
              className="mx-auto mt-14"
            />
            <span className="text-[28px] font-giorgio text-center">
              JUBMOJI-CLUB
            </span>
          </div>
          {!tweetPosted ? (
            <div>
              {steps?.map((step, stepIndex) => {
                const showStep = currentStepIndex === stepIndex;
                return <>{showStep && step()}</>;
              })}
            </div>
          ) : (
            <ContentWrapper>
              <ContentDescription>Tweet posted!</ContentDescription>
              <div className="flex flex-col gap-6">
                <CardOption label="View tweet" />
                <CardOption label="Post again" />
                <CardOption label="Leave feedback" />
              </div>
            </ContentWrapper>
          )}
        </div>
      </Modal>
    </>
  );
}
