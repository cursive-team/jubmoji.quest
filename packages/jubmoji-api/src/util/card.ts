import { cardPubKeys } from "../data";

export const getCardPubKeyFromIndex = (index: number): string => {
  return cardPubKeys[index].pubKeyJub;
};
