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
    async (): Promise<JubmojiCardProps[]> => {
      // get all jubmojis collected infos
      const collectedPubKeys = Object.entries(jubmojis).map(
        ([_index, { pubKeyIndex }]) => pubKeyIndex
      );

      const collectedJubmojis =
        collectedPubKeys.map((pubKeyIndex) => {
          return getJubmojiCardByPubIndex(jubmojiCollectionCards, pubKeyIndex);
        }) ?? [];

      return collectedJubmojis as JubmojiCardProps[];
    },
    {
      enabled: !isLoading && !isLoadingJubmojis,
    }
  );
};

export const getJubmojiCardByPubIndex = (
  cards: JubmojiCardMap,
  pubKeyIndex: Jubmoji["pubKeyIndex"]
): JubmojiCardProps | undefined => {
  if (!cards[pubKeyIndex]) {
    return undefined;
  }

  const { emoji, imageBlobUrl: imagePath } = cardPubKeys[pubKeyIndex];
  // Name, owner, and collectsFor are set by the current cardholder and fetched from the backend
  const { name, owner, collectsFor, description, index } = cards[pubKeyIndex];

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
