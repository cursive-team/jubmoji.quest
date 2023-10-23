import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import {
  Jubmoji,
  NonceSignature,
  cardPubKeys,
  getJubmojiFromNonceSignature,
} from "jubmoji-api";
import { addJubmoji } from "@/lib/localStorage";
import { Card } from "@/components/cards/Card";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Modal } from "@/components/modals/Modal";
import { Onboarding } from "@/components/Onboarding";
import {
  JubmojiCardProps,
  getJubmojiCardByPubIndex,
  useCards,
} from "@/hooks/useCards";
import Image from "next/image";

const OnboardSection = () => {
  return (
    <Onboarding>
      <Card.Base centred>
        <Card.Header spacing="sm">
          <span className="my-auto text-[96px] leading-none">
            <Image
              src="/images/hedgehog.png"
              height={96}
              width={96}
              alt="hedgehog"
            />
          </span>
        </Card.Header>
        <Card.Content spacing="sm">
          <Card.Title font="giorgio" size="md">
            Congrats!
          </Card.Title>
          <Card.Description font="giorgio">
            You now hold a tangible memory of a one-of-a-kind experience
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <div className="flex flex-col gap-4">
            <Image
              src="/images/hedgehog.png"
              height={72}
              width={72}
              alt="hedgehog"
            />
            <Button
              icon={<Icons.download className="text-white" />}
              rounded
              size="sm"
            >
              Back up!
            </Button>
          </div>
        </Card.Header>
        <Card.Content spacing="sm">
          <Card.Title font="giorgio" size="md">
            You are the only one that can see your collection
          </Card.Title>
          <Card.Description centred font="giorgio">
            Make sure you back it up!
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header></Card.Header>
        <Card.Content spacing="sm">
          <Card.Title font="giorgio" size="md">
            lorem ipsum
          </Card.Title>
          <Card.Description font="giorgio">
            Lorem ipsum dolor sit amet consectetur. Fringilla amet egestas.
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header></Card.Header>
        <Card.Content spacing="sm" centred>
          <Card.Title font="giorgio" size="md">
            Itching to understand how your data remains private?
          </Card.Title>
          <Card.Description font="giorgio" centred>
            Find out more{" "}
            <Link className="text-baby-blue-default" href="/">
              here.
            </Link>
          </Card.Description>
        </Card.Content>
      </Card.Base>
    </Onboarding>
  );
};

export default function CollectJubmojiPage() {
  const router = useRouter();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: jubmojiCollectionCards = [], isLoading } = useCards();
  // used to check if user collected already something
  const [isFirstCollect, setIsFirstCollect] = useState(false);
  const [collectedJubmoji, setCollectedJubmoji] = useState<Jubmoji>();
  const [collectedCard, setCollectedCard] = useState<JubmojiCardProps>();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // ensure users do not go to rest of app if they are in incognito
  const alertIncognito = async () => {
    const isIncognito = await detectIncognito();
    if (isIncognito.isPrivate) {
      alert(
        "Please copy this link into a non-incognito tab in order to save your Jubmojis!"
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(location.hash.slice(1));
      const sig = getHaLoArgs(urlParams);
      if (!sig) {
        router.push("/");
        return;
      }
      const realJubmoji = getJubmojiFromNonceSignature(sig);
      const card = getJubmojiCardByPubIndex(
        jubmojiCollectionCards,
        sig.pubKeyIndex
      );
      setCollectedJubmoji(realJubmoji);
      if (card) {
        setCollectedCard(card);
      }
      addJubmoji(realJubmoji); // async function, need to be careful
    }
  }, [params, router, jubmojiCollectionCards]);

  const onShowOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      closable={!isFirstCollect}
    >
      <div className="my-auto flex flex-col gap-8">
        {showOnboarding ? (
          <OnboardSection />
        ) : (
          <>
            {isLoading ? (
              <Card.Base className="h-[260px]" loading />
            ) : (
              <>
                {collectedCard && (
                  <CollectionCard
                    className="text-center"
                    label={collectedCard.name}
                    icon={collectedCard.emoji}
                    owner={collectedCard.owner}
                    edition={collectedJubmoji?.msgNonce}
                    size="sm"
                    centred
                    canFlip={false}
                  />
                )}
              </>
            )}
            {isFirstCollect ? (
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={onShowOnboarding}
              >
                What is this??
              </Button>
            ) : (
              <div className="flex flex-col gap-8">
                <Link href="/">
                  <Button
                    icon={<Icons.arrowRight className="text-black" />}
                    iconPosition="right"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    Back to app
                  </Button>
                </Link>
                <Button
                  variant="transparent"
                  disabled={isLoading}
                  onClick={onShowOnboarding}
                >
                  What is this??
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

function getHaLoArgs(params: URLSearchParams): NonceSignature | undefined {
  const pkN = params.get("pkN");
  const rnd = params.get("rnd");
  const rndsig = params.get("rndsig");

  if (!pkN || !rnd || !rndsig) {
    return undefined;
  }

  const strippedPkN = pkN.substring(4);
  let pubKeyIndex = -1;
  for (const [index, card] of Array.from(cardPubKeys.entries())) {
    if (card.pubKeyJub.toLowerCase() === strippedPkN.toLowerCase()) {
      pubKeyIndex = index;
      break;
    }
  }
  if (pubKeyIndex === -1) {
    return undefined;
  }

  return {
    nonce: parseInt(rnd?.substring(0, 8), 16),
    rand: rnd.substring(8),
    sig: rndsig,
    pubKeyIndex,
  };
}
