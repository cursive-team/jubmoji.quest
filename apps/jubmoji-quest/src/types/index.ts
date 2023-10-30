import { Prisma, Card, Quest, Power, $Enums, QRCode } from "@prisma/client";

export type InputSize = "sm" | "md" | "lg";

export interface BackupState {
  type: "google" | "apple" | "copypaste" | "whatsapp" | "none";
  serialNum?: string;
  backedUpPubKeyIndices?: number[];
}

export type JubmojiCollectionCard = Card & {
  collectsFor: {
    id: number;
    name: string;
    description: string;
    startTime: Date | null;
    endTime: Date | null;
  }[];
};

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

export type JubmojiPower = Power & {
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
