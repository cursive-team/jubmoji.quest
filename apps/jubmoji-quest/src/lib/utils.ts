import { JubmojiPower, JubmojiQuest } from "@/types";
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

export function getQuestCollectionCardIndices(quest: JubmojiQuest): number[] {
  return quest.powers
    .flatMap((power) => power.collectionCards.map((card) => card.index))
    .reduce(
      (unique: number[], index: number) => {
        if (!unique.includes(index)) {
          unique.push(index);
        }
        return unique;
      },
      quest.collectionCards.map((card) => card.index)
    );
}

export function getNumCardsToCollect(
  proofType: $Enums.ProofType,
  proofParams: Prisma.JsonValue
): number {
  const proofParamsObj = proofParams as Prisma.JsonObject;
  switch (proofType) {
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      return proofParamsObj.N as number;
    default:
      return 1;
  }
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
