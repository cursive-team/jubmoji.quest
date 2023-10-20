import { HaLoNoncePCD } from "@pcd/halo-nonce-pcd";
import { Card, Quest, Power, $Enums } from "@prisma/client";

export type InputSize = "sm" | "md" | "lg";

export interface Sigmoji {
  emojiImg: string;
  PCD: HaLoNoncePCD; // PCD storing the card's signature
  ZKP: string; // Serialized ZKP.
}

export interface BackupState {
  type: "google" | "apple" | "copypaste" | "none";
  serialNum: string;
}

export type JubmojiCard = Card;

export type JubmojiQuest = Quest & {
  prerequisiteCards: { index: number }[];
  collectionCards: { index: number }[];
  powers: {
    id: number;
    name: string;
    description: string;
    powerType: $Enums.PowerType;
  }[];
};

export type JubmojiPower = Power;
