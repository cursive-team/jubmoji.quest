// This file contains the faqs for info page
import { ReactNode } from "react";

type InfoProps = {
  title: string;
  description?: ReactNode;
};

export const FAQS: InfoProps[] = [
  {
    title: "What is Jubmoji Quest?",
    description: `Jubmoji.quest is place to keep personal, provable digital mementos from people that you meet IRL. Each time you tap a card, you collect a Jubmoji, a unique signature that you can store privately and share as you wish!`,
  },
  {
    title: "What are quests?",
    description: `Quests are challenges to collect special sets of jubmojis. Completing quests gives you the opportunity to wield cool powers (see below) . You can choose to publicly prove your quest scores and compete in leaderboards. Keep completing quests to become a legendary collector in the community!`,
  },
  {
    title: "What are powers?",
    description: `When you complete quests, you can win powers that can take many forms, from tickets to exclusive events, access to private channels on Telegram and Discreetly, the ability to post anonymously on Twitter, and more!`,
  },
  {
    title: "Privacy",
    description: `Unlike on-chain NFTs, all information is collected and stored on your own device. Your jubmoji collection is private and viewable only by you, unless you choose to use a power to publish a proof. You have complete control over whether you want to share this information or not. You read right, you fully own your data!`,
  },
  {
    title: "Back up your data",
    description:
      "All collected jubmojis are stored in your browser's temporary storage, so it's important to back up your data to your mobile wallet or a password manager upon collection of each jubmoji. Then you can  restore your collection if you accidentally close your browser tab.",
  },
  {
    title: `What is the “Jub” in Jubmoji?`,
    description: `"Jub" comes from the term "Baby Jubjub Curve," which is a mathematical equation used to verify data securely.

    We use the Baby Jubjub Curve alongside zero-knowledge proofs (ZKPs) to provide a secure and private way to manage your Jubmojis. ZKPs let you prove something without revealing all information. Simply put, the Baby Jubjub Curve is a special lock for your memories, letting you safely share and verify your jubmojis without giving up your full data and privacy 🗝️🔒!`,
  },
];
