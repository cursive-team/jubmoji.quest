import { JubmojiCollectionCard } from "@/types";
import { Jubmoji, cardPubKeys } from "jubmoji-api";
import { useQuery } from "react-query";

type JubmojiCardMap = Record<number, JubmojiCollectionCard>;

export const useCards = () => {
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
  const { name, owner, collectsFor } = cards[pubKeyIndex];
  // Image path is fetched from the hardcoded card image map for offline use
  const imagePath = cardPubKeys[pubKeyIndex].imageBlobUrl;

  return {
    emoji,
    name,
    owner,
    collectsFor,
    imagePath,
  };
};

export interface JubmojiCardProps {
  emoji?: any;
  name: string;
  owner: string;
  collectsFor?: any[];
  imagePath: string;
}
