import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import {
  Jubmoji,
  NonceSignature,
  cardPubKeys,
  getJubmojiFromNonceSignature,
} from "jubmoji-api";
import { addJubmoji } from "@/lib/localStorage";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/ui/Button";
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
import { CollectionCardArc } from "@/components/cards/CollectionCardArc";
import { useJubmojis } from "@/hooks/useJubmojis";
import { SimpleCard } from "@/components/cards/SimpleCard";
import { HUNT_TEAM_JUBMOJI_PUBKEY_INDICES } from "@/constants";

enum CollectStatus {
  UNKNOWN = "Unknown",
  IN_INCOGNITO = "You're in an incognito tab. Please copy this link into a non-incognito tab in order to save your Jubmojis!",
  ALREADY_COLLECTED = "You've already collected this jubmoji.",
  ALREADY_ON_TEAM = "You're already on a scavenger hunt team.",
  ZERO_TAP = "Your card has now been initialized! Please tap again to collect its first jubmoji.",
  FIRST_COLLECT = "First collect",
  STANDARD = "Standard",
}

const OnboardSection = ({ jubmoji }: { jubmoji: JubmojiCardProps }) => {
  return (
    <Onboarding>
      <Card.Base centred>
        <Card.Header spacing="md">
          <span className="my-auto text-[40px] leading-none pt-[32px] pb-[22px]">
            {jubmoji.emoji}
          </span>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Yay, you got a jubmoji!
          </Card.Title>
          <Card.Description font="dm">
            {`This is a digital memento of an in-person experience that's unique
            and verifiable.`}
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <div className="flex flex-col gap-4">
            <Image
              src="/images/onboarding-privacy.svg"
              alt="onboarding browser"
              width={180}
              height={120}
              sizes="100vw"
            />
          </div>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            It lives in your browser
          </Card.Title>
          <Card.Description centred font="dm">
            Our server never sees your collection. Your data lives in temporary
            browser storage.
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header className="!py-12">
          <Button
            icon={<Icons.download className="text-baby-blue-default" />}
            className="max-w-[150px]"
            variant="blue-outline"
          >
            Back up!
          </Button>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Make sure to back up!
          </Card.Title>
          <Card.Description font="dm">
            You can use a mobile wallet, password manager, or an E2EE messaging
            app!
          </Card.Description>
        </Card.Content>
      </Card.Base>
      <Card.Base centred>
        <Card.Header>
          <Image
            height={120}
            width={190}
            sizes="100vw"
            src="/images/onboarding-collect.svg"
            alt="onboarding collect"
          />
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm">
          <Card.Title centred font="giorgio" size="md">
            Embark on quests
          </Card.Title>
          <Card.Description font="dm">
            Collect specific jubmojis on quests to unlock powers!
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
              return <span key={key}>{icon}</span>;
            })}
          </div>
        </Card.Header>
        <Card.Content className="!gap-4" spacing="sm" centred>
          <Card.Title centred font="giorgio" size="md">
            Use your new powers!
          </Card.Title>
          <Card.Description font="dm" centred>
            Make zk proofs about your private collection to verifiably post or
            unlock tickets and discounts
          </Card.Description>
        </Card.Content>
      </Card.Base>
    </Onboarding>
  );
};

export default function CollectJubmojiPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: jubmojiCollectionCards = [], isLoading } = useFetchCards();
  const { data: jubmojis } = useJubmojis();

  const [collectedJubmoji, setCollectedJubmoji] = useState<Jubmoji>();
  const [collectStatus, setCollectStatus] = useState<CollectStatus>(
    CollectStatus.UNKNOWN
  );
  const [collectedCard, setCollectedCard] = useState<JubmojiCardProps>();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function getJubmojiFromUrl() {
      const urlParams = new URLSearchParams(location.hash.slice(1));
      const nonceSig = getHaLoArgs(urlParams);
      if (!nonceSig) {
        router.push("/");
        return;
      }
      if (parseInt(nonceSig.sig) === 0) {
        setCollectStatus(CollectStatus.ZERO_TAP);
        return;
      }
      const realJubmoji = getJubmojiFromNonceSignature(nonceSig);
      const card = getJubmojiCardByPubIndex(
        jubmojiCollectionCards,
        nonceSig.pubKeyIndex
      );
      await addJubmoji(realJubmoji);
      setCollectedJubmoji(realJubmoji);
      if (card) {
        setCollectedCard(card);
      }
    }

    if (typeof window !== "undefined" && !isLoading) {
      getJubmojiFromUrl();
    }
  }, [router, isLoading, jubmojiCollectionCards]);

  useEffect(() => {
    if (!jubmojiCollectionCards || !jubmojis || !collectedJubmoji) {
      return;
    }

    const determineCollectState = async () => {
      const isIncognito = await detectIncognito();
      if (isIncognito.isPrivate) {
        setCollectStatus(CollectStatus.IN_INCOGNITO);
        return;
      }

      if (jubmojis.length === 0) {
        setCollectStatus(CollectStatus.FIRST_COLLECT);
        return;
      }

      for (const jubmoji of jubmojis) {
        if (jubmoji.pubKeyIndex === collectedJubmoji.pubKeyIndex) {
          setCollectStatus(CollectStatus.ALREADY_COLLECTED);
          return;
        }
      }

      if (
        HUNT_TEAM_JUBMOJI_PUBKEY_INDICES.includes(collectedJubmoji.pubKeyIndex)
      ) {
        for (const jubmoji of jubmojis) {
          if (HUNT_TEAM_JUBMOJI_PUBKEY_INDICES.includes(jubmoji.pubKeyIndex)) {
            const realTeamCard = getJubmojiCardByPubIndex(
              jubmojiCollectionCards,
              jubmoji.pubKeyIndex
            );
            setCollectedCard(realTeamCard);
            setCollectStatus(CollectStatus.ALREADY_ON_TEAM);
            return;
          }
        }
      }

      setCollectStatus(CollectStatus.STANDARD);
    };

    determineCollectState();
  }, [jubmojiCollectionCards, jubmojis, collectedJubmoji]);

  const onShowOnboarding = () => {
    setShowOnboarding(true);
  };

  const navigateToJubmojis = () => {
    router.push(`/jubmojis?pubKeyIndex=${collectedCard?.pubKeyIndex}`); // redirect to `/jubmojis` when modal is closed
  };

  const renderMainInfo = (status: CollectStatus) => {
    switch (status) {
      case CollectStatus.UNKNOWN:
        return <Card.Base className="h-[260px]" loading />;
      case CollectStatus.ZERO_TAP:
        return (
          <SimpleCard
            className="text-center"
            title={"First tap!"}
            icon={"🔄"}
            description={CollectStatus.ZERO_TAP}
          />
        );
      case CollectStatus.IN_INCOGNITO:
        return (
          <SimpleCard
            className="text-center"
            title={"Incognito detected."}
            icon={"🕵️‍♀️"}
            description={CollectStatus.IN_INCOGNITO}
          />
        );
      case CollectStatus.ALREADY_COLLECTED:
        return (
          <SimpleCard
            className="text-center"
            title={"Already collected."}
            icon={"🤷"}
            description={CollectStatus.ALREADY_COLLECTED}
            size={"sm"}
          />
        );
      case CollectStatus.ALREADY_ON_TEAM:
        return (
          <SimpleCard
            className="text-center"
            title={"Already on team."}
            icon={"🤷"}
            description={CollectStatus.ALREADY_ON_TEAM}
            size={"sm"}
          />
        );
      default: {
        if (!collectedCard || !collectedJubmoji)
          return <Card.Base className="h-[260px]" loading />;
        return (
          <CollectionCardArc
            className="text-center w-full !max-w-none"
            label={collectedCard?.name}
            icon={collectedCard?.emoji}
            owner={collectedCard?.owner}
            edition={collectedJubmoji?.msgNonce}
            pubKeyIndex={collectedJubmoji?.pubKeyIndex}
            cardBackImage={collectedCard?.imagePath}
            size="sm"
            disabled
            preview
          />
        );
      }
    }
  };

  const renderButtons = (status: CollectStatus) => {
    switch (status) {
      case CollectStatus.ZERO_TAP:
        return (
          <Button
            icon={<Icons.arrowRight className="text-black" />}
            iconPosition="right"
            variant="secondary"
            onClick={() => router.push("/")}
          >
            Back to app
          </Button>
        );
      case CollectStatus.FIRST_COLLECT:
        return (
          <Button variant="secondary" onClick={onShowOnboarding}>
            What is this??
          </Button>
        );
      case CollectStatus.STANDARD:
        return (
          <div className="flex flex-col gap-6">
            <Button
              icon={<Icons.arrowRight className="text-black" />}
              iconPosition="right"
              variant="secondary"
              onClick={navigateToJubmojis}
            >
              Back to app
            </Button>
            <Button variant="transparent" onClick={onShowOnboarding}>
              What is this??
            </Button>
          </div>
        );
      case CollectStatus.ALREADY_COLLECTED:
        return (
          <Button
            icon={<Icons.arrowRight className="text-black" />}
            iconPosition="right"
            variant="secondary"
            onClick={navigateToJubmojis}
          >
            Back to app
          </Button>
        );
      case CollectStatus.ALREADY_ON_TEAM:
        return (
          <Button
            icon={<Icons.arrowRight className="text-black" />}
            iconPosition="right"
            variant="secondary"
            onClick={navigateToJubmojis}
          >
            Back to app
          </Button>
        );
    }

    return <></>;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      closable={[
        CollectStatus.ALREADY_COLLECTED,
        CollectStatus.ALREADY_ON_TEAM,
        CollectStatus.STANDARD,
      ].includes(collectStatus)}
      onClose={navigateToJubmojis}
    >
      <div className="my-auto flex flex-col gap-8">
        {showOnboarding ? (
          collectedCard && <OnboardSection jubmoji={collectedCard} />
        ) : (
          <>
            {renderMainInfo(collectStatus)}
            {renderButtons(collectStatus)}
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
