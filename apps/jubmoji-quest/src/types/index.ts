import { Prisma, Card, Quest, Power, $Enums, QRCode } from "@prisma/client";

export type InputSize = "sm" | "md" | "lg";

export interface BackupState {
  type: "google" | "apple" | "copypaste" | "whatsapp" | "none";
  serialNum?: string;
  backedUpPubKeyIndices?: number[];
}

export interface NullifiedSigs {
  quests: Record<number, string[]>; // questId -> nullified Jubmoji signatures
  powers: Record<number, string[]>; // powerId -> nullified Jubmoji signatures
}

export type JubmojiCollectionCard = Card & {
  prerequisitesFor: JubmojiQuestPreview[];
  collectsFor: JubmojiQuestPreview[];
};

export type JubmojiQuestPreview = {
  id: number;
  name: string;
  description: string;
  startTime: Date | null;
  endTime: Date | null;
};

export type JubmojiQuest = Quest & {
  prerequisiteCards: { index: number }[];
  collectionCards: { index: number }[];
  powers: {
    id: number;
    name: string;
    description: string;
    powerType: $Enums.PowerType;
    proofType: $Enums.ProofType;
    proofParams: Prisma.JsonValue;
    prerequisiteCards: { index: number }[];
    collectionCards: { index: number }[];
  }[];
};

export type JubmojiPower = Power & {
  prerequisiteCards: { index: number }[];
  collectionCards: {
    index: number;
  }[];
  quest: {
    id: number;
    name: string;
    description: string;
    proofType: $Enums.ProofType;
    proofParams: Prisma.JsonValue;
    imageLink: string | null;
    prerequisiteCards: { index: number }[];
    collectionCards: {
      index: number;
    }[];
  };
};

export type JubmojiQRCodeData = QRCode & {
  power: JubmojiPower;
};
