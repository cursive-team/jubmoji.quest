import { HaLoNoncePCD } from "@pcd/halo-nonce-pcd";

export type InputSize = 'sm' | 'md' | 'lg';

export interface Sigmoji {
  emojiImg: string;
  PCD: HaLoNoncePCD; // PCD storing the card's signature
  ZKP: string; // Serialized ZKP.
}

export interface BackupState {
  type: "google" | "apple" | "copypaste" | "none";
  serialNum: string;
}
