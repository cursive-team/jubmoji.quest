// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
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
import { cn } from "@/lib/utils";
import { bigIntToHex } from "babyjubjub-ecdsa";
import {
  NfcCardRawSignature,
  PublicMessageSignature,
  cardPubKeys,
  createProofInstance,
  getMessageHash,
} from "jubmoji-api";
import toast from "react-hot-toast";

const ContentWrapper = classed.div("flex flex-col gap-6 mt-3");
const ContentDescription = classed.div("font-dm-sans text-center");
const ButtonWrapper = classed.div("flex flex-col mt-6 gap-6");

type CardOptionProps = {
  label: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const CardOption = ({
  label,
  description,
  disabled,
  onClick,
}: CardOptionProps) => {
  return (
    <Card.Base
      onClick={onClick}
      className={cn("p-4 !items-start !flex-row justify-between", {
        "opacity-50": disabled,
      })}
    >
      <div>
        <Card.Title>{label}</Card.Title>
        <Card.Description className="!text-shark-300">
          {description}
        </Card.Description>
      </div>
      {disabled ? <>🔜™️</> : <Icons.arrowRight />}
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
  "new-manifestation": "Commit to a dream, goal, or resolution.",
  "reveal-manifestation": "Type exact manifestation to reveal!",
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
            Hold your card to phone to sign-in
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
            Sign-in & post
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

export default function ClubPage() {
  const [signTweetModal, setSignTweetModal] = useState(false);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [typeOfTweet, setTypeOfTweet] = useState<TypeOfTweet | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tweetLink, setTweetLink] = useState<string>();
  const [manifestations, setManifestations] = useState<Map<string, string>>();

  const [tweetManifest, setTweetManifest] = useState("");
  const [tweetReplyLink, setTweetReplyLink] = useState("");

  const [tweetPosted, setTweetPosted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getManifestations = async () => {
      const response = await fetch("/api/clubManifestations");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const posts = await response.json();
      const manifestations = new Map();
      for (const clubPost of posts) {
        manifestations.set(clubPost.postText, clubPost.tweetId);
      }
      setManifestations(manifestations);
    };

    if (!manifestations) {
      getManifestations();
    }
  }, [manifestations]);

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
          {/* <CardOption
            label="🦤 Jubmoji team"
            description="Anon member of jubmoji team"
          /> */}
          <CardOption
            label="💨 Vapor"
            description="Anon cardholder, 1 day expiry"
            disabled
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
      setSignTweetModal(true);
    };

    const confirmDisabled =
      tweetManifest?.length === 0 ||
      (typeOfTweet === "reveal-manifestation" &&
        manifestations &&
        !manifestations.get(standardSHAHash(tweetManifest)));

    return (
      typeOfTweet && (
        <ContentWrapper>
          <ContentDescription>
            {tweetManifest.length !== 0 &&
            manifestations &&
            typeOfTweet === "reveal-manifestation"
              ? manifestations.get(standardSHAHash(tweetManifest))
                ? "Matching manifestation found!"
                : "No matching manifestation found!"
              : tweetPlaceholderTextMap[typeOfTweet]}
          </ContentDescription>
          <div className="flex flex-col gap-6">
            <Textarea
              title={tweetInputTextMap[typeOfTweet] + "*"}
              placeholder={"Type here..."}
              cols={5}
              value={tweetManifest}
              onChange={(e) => setTweetManifest(e?.target?.value)}
            />
            {typeOfTweet !== "reveal-manifestation" && (
              <Input
                title="Tweet to reply to"
                placeholder="Paste optional link..."
                value={tweetReplyLink}
                onChange={(e) => setTweetReplyLink(e?.target?.value)}
              />
            )}
            {typeOfTweet !== "normal-tweet" && tweetManifest && (
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
            <Button
              onClick={() => {
                setCurrentStepIndex(1);
                setTweetManifest("");
                setTweetReplyLink("");
              }}
            >
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
    let replyId = undefined;
    if (tweetReplyLink) {
      const match = tweetReplyLink.match(/\/status\/(\d+)/);
      if (match) {
        replyId = match[1];
      }
    }
    if (
      typeOfTweet === "reveal-manifestation" &&
      manifestations &&
      manifestations.get(standardSHAHash(tweetManifest))
    ) {
      replyId = manifestations.get(standardSHAHash(tweetManifest));
    }

    // make the right tweet text
    let tweetText = tweetManifest;
    if (typeOfTweet === "new-manifestation") {
      tweetText = standardSHAHash(tweetManifest);
    }

    // taking correct hash
    const signedData = JSON.stringify({
      tweetText,
      replyId,
      typeOfTweet,
    });
    const messageHash = bigIntToHex(getMessageHash(signedData));

    // sign tweet
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

      // match public key to index
      const retrievedPubKeyIndex = cardPubKeys.findIndex(
        (key) => key.pubKeySlot1 === res.publicKey // Use secp256k1 key here, which is in slot 1
      );

      const proofInstance = createProofInstance(PublicMessageSignature, {
        randStr: "",
      });
      const proof = await proofInstance.prove({
        message: signedData,
        rawSig: res.signature.raw,
        pubKeyIndex: retrievedPubKeyIndex,
      });
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signedData,
          rawSig: res.signature.raw,
          pubKeyIndex: retrievedPubKeyIndex,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Tweet sent!");

      const tweetInfo = await response.json();

      setTweetLink(tweetInfo.link);
      setSignTweetModal(false);
      setTweetPosted(true);
      setTweetReplyLink("");
      setCurrentStepIndex(0);
      setIdentity(null);
      setManifestations(undefined); // force refresh of internal hash table
    } catch (error) {
      console.error(error);
      toast.error("Update failed, please try again or exit.");
    }
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
      <div className="flex flex-col grow h-full p-4">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/logo.svg"
            width={120}
            height={120}
            alt="logo"
            className="mx-auto mt-8"
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
              <CardOption
                label="👀 View tweet"
                onClick={() =>
                  window.open(tweetLink ?? "https://twitter.com", "_blank")
                }
              />
              {typeOfTweet === "new-manifestation" && (
                <CardOption
                  label="💾 Copy & save manifestation"
                  onClick={() => {
                    navigator.clipboard.writeText(tweetManifest);
                    toast.success("Copied!");
                  }}
                />
              )}
              <CardOption
                label="📮 Post again"
                onClick={() => {
                  setTweetManifest("");
                  setTypeOfTweet(null);
                  setTweetPosted(false);
                }}
              />
              <CardOption
                label="📝 Leave feedback"
                onClick={() => window.open("https://t.me/vivboop", "_blank")}
              />
            </div>
          </ContentWrapper>
        )}
      </div>
    </>
  );
}

ClubPage.getInitialProps = () => {
  return { showFooter: false };
};
