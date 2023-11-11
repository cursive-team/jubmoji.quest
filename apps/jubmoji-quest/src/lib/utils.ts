import { JubmojiPower } from "@/types";
import { $Enums, Prisma } from "@prisma/client";
import clsx, { ClassValue } from "clsx";
import { Jubmoji } from "jubmoji-api";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterItems<T>(items: T[], filter: string) {
  return items.filter((item) => {
    const itemString = JSON.stringify(item).toLowerCase();
    return itemString.includes(filter.toLowerCase());
  });
}

export function isPowerCompleted(
  power: {
    proofType: $Enums.ProofType;
    proofParams: Prisma.JsonValue;
    collectionCards: { index: number }[];
  },
  jubmojis: Jubmoji[]
): boolean {
  switch (power.proofType) {
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      const proofParams = power.proofParams as Prisma.JsonObject;
      return (
        power.collectionCards.filter((card) => {
          return jubmojis.some((jubmoji) => {
            return jubmoji.pubKeyIndex === card.index;
          });
        }).length >= (proofParams.N as number)
      );
    default:
      return power.collectionCards.some((card) => {
        return jubmojis.some((jubmoji) => {
          return jubmoji.pubKeyIndex === card.index;
        });
      });
  }
}
