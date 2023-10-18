import { cardPubKeys } from "../mockData";

export const getCardPubKeyFromIndex = (index: number): string => {
  return cardPubKeys[index].pubKeyWeierstrass;
};
