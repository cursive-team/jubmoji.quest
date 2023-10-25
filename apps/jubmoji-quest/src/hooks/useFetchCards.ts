import { JubmojiCollectionCard } from "@/types";
import { Jubmoji, cardPubKeys } from "jubmoji-api";
import { useQuery } from "react-query";
import { useJubmojis } from "./useJubmojis";

type JubmojiCardMap = Record<number, JubmojiCollectionCard>;

export const useFetchCards = () => {
  return useQuery(
    ["cards"],
    async (): Promise<JubmojiCardMap> => {
      const response = await fetch("/api/cards");

      if (!response.ok) {
        console.error("Could not fetch Jubmoji cards.");
        return []; //
      }

      const collectionCards: JubmojiCollectionCard[] = await response.json();
      const collectionCardMap: Record<number, JubmojiCollectionCard> = {};
      collectionCards.forEach((card) => {
        collectionCardMap[card.index] = card;
      });

      return collectionCardMap;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

/**
 * Get list of the collected cards with all the information
 * @returns JubmojiCardProps
 */
export const useFetchCollectedCards = () => {
  const { isLoading, data: jubmojiCollectionCards = [] } = useFetchCards();
  const { isLoading: isLoadingJubmojis, data: jubmojis = [] } = useJubmojis();

  return useQuery(
    ["collectedCards", jubmojis?.length],
    async () => {
      // get all jubmojis collected infos
      const collectedPubKeys = Object.entries(jubmojis).map(
        ([_index, { pubKeyIndex }]) => pubKeyIndex
      );

      const collectedJubmojis =
        collectedPubKeys.map((pubKeyIndex) => {
          return getJubmojiCardByPubIndex(jubmojiCollectionCards, pubKeyIndex);
        }) ?? [];
      return collectedJubmojis;
    },
    {
      enabled: !isLoading && !isLoadingJubmojis,
    }
  );
};

export const getJubmojiCardByPubIndex = (
  cards: JubmojiCardMap,
  pubKeyIndex: Jubmoji["pubKeyIndex"]
): JubmojiCardProps | null => {
  if (!cards[pubKeyIndex]) {
    return null;
  }

  // Emoji is fixed in hardware and fetched from hardcoded card metadata file
  const { emoji } = cardPubKeys[pubKeyIndex];
  // Name, owner, and collectsFor are set by the current cardholder and fetched from the backend
  const { name, owner, collectsFor, description, index } = cards[pubKeyIndex];
  // Image path is fetched from the hardcoded card image map for offline use
  const imagePath = cardPubKeys[pubKeyIndex].imageBlobUrl;

  return {
    emoji,
    name,
    owner,
    description,
    collectsFor,
    imagePath,
    index,
    pubKeyIndex,
  };
};

export interface JubmojiCardProps {
  emoji?: any;
  name: string;
  owner: string;
  description: string;
  collectsFor?: any[];
  imagePath: string;
  index: number;
  pubKeyIndex: number;
}
