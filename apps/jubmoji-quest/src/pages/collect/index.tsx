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
  useFetchCards,
} from "@/hooks/useFetchCards";
import Image from "next/image";
import { PowerTypeIconMapping } from "@/components/cards/PowerCard";

const OnboardSection = ({ jubmoji }: { jubmoji: JubmojiCardProps }) => {
  return (
    <Onboarding>
      <Card.Base centred>
        <Card.Header spacing="sm">
          <span className="my-auto text-[60px] leading-none">
            {jubmoji.emoji}
          </span>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Yay, you got a jubmoji!
          </Card.Title>
          <Card.Description font="giorgio">
            You have just collected a Jubmoji, a memento that’s unique and
            verifiable
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <div className="flex flex-col gap-4">
            <span className="text-[40px]">{jubmoji.emoji}</span>
          </div>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title font="giorgio" size="md">
            It lives in your browser
          </Card.Title>
          <Card.Description centred font="giorgio">
            Our server never sees your collection as your data lives in a
            temporary store in your browser.
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <Button
            icon={<Icons.download className="text-black" />}
            className="max-w-[150px]"
            variant="blue"
          >
            Back up!
          </Button>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Make sure to back up!
          </Card.Title>
          <Card.Description font="giorgio">
            You can use a mobile wallet, password manager, or an E2EE messaging
            app!
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-left">Collect:</span>
            <Image
              height={20}
              width={100}
              className="w-full"
              src="/images/collection-items.svg"
              alt="collection items"
            />
          </div>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Complete quests!
          </Card.Title>
          <Card.Description font="giorgio">
            Quests involve collecting some set of jubmojis and unlocking a power
            at the end.
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <div
            className={`grid grid-flow-col gap-4 grid-cols-[${
              Object.keys(PowerTypeIconMapping).length
            }]`}
          >
            {Object.entries(PowerTypeIconMapping).map(([key, icon]) => {
              console.log(key);
              return <span key={key}>{icon}</span>;
            })}
          </div>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm" centred>
          <Card.Title centred font="giorgio" size="md">
            Use your new powers!
          </Card.Title>
          <Card.Description font="giorgio" centred>
            Get event tickets, discounts, or post verifiably by making a ZK
            proof of completing a quest!
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

  const { data: jubmojiCollectionCards = [], isLoading } = useFetchCards();
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
    async function getJubmojiFromUrl() {
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
      await addJubmoji(realJubmoji);
      setCollectedJubmoji(realJubmoji);
      if (card) {
        setCollectedCard(card);
      }
    }

    if (typeof window !== "undefined") {
      getJubmojiFromUrl();
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
      onClose={() => {
        router.push(`/jubmojis?pubKeyIndex=${collectedCard?.pubKeyIndex}`); // redirect to `/jubmojis` when modal is closed
      }}
    >
      <div className="my-auto flex flex-col gap-8">
        {showOnboarding ? (
          collectedCard && <OnboardSection jubmoji={collectedCard} />
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
