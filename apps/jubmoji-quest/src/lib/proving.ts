import { JubmojiPower } from "@/types";
import { Prisma, $Enums } from "@prisma/client";
import { VerificationResult } from "babyjubjub-ecdsa";
import {
  Jubmoji,
  JubmojiInCollection,
  JubmojiInCollectionWithNonce,
  Leaderboard,
  NUniqueJubmojisInCollection,
  ProofClass,
  ProvingState,
  TeamLeaderboard,
  createProofInstance,
  getCardPubKeyFromIndex,
} from "jubmoji-api";

// Minimal set of JubmojiQuest fields needed for proving and verification
// These fields define the configuration for a proving instance
export interface JubmojiQuestProofConfig {
  proofType: $Enums.ProofType;
  proofParams: Prisma.JsonObject;
  prerequisiteCards: {
    index: number;
  }[];
  collectionCards: {
    index: number;
  }[];
}

export interface CreateJubmojiQuestProofInstanceArgs {
  config: JubmojiQuestProofConfig;
  overrideSigNullifierRandomness?: string; // If we want to use a sigNullifierRandomness different from the quest's
  pathToCircuits?: string;
  onUpdateProvingState?: (provingState: ProvingState) => void;
}

export interface CreateJubmojiQuestProofArgs {
  config: JubmojiQuestProofConfig;
  jubmojis: Jubmoji[];
  overrideSigNullifierRandomness?: string;
  pubKeyNullifierRandomness?: string;
  pathToCircuits?: string;
  onUpdateProvingState?: (provingState: ProvingState) => void;
}

export interface VerifyJubmojiQuestProofArgs {
  config: JubmojiQuestProofConfig;
  serializedProof: string;
  pathToCircuits?: string;
}

// Creates a proof instance from any quest parameters
// Exact proof type is based on quest proofType parameter
export const createJubmojiQuestProofInstance = ({
  config,
  pathToCircuits,
  onUpdateProvingState,
}: CreateJubmojiQuestProofInstanceArgs): ProofClass<any, any> => {
  const proofParams = config.proofParams as Prisma.JsonObject;
  const prerequisiteCardIndices = config.prerequisiteCards.map(
    (card) => card.index
  );
  const prerequisitePubKeys = prerequisiteCardIndices.map((index) =>
    getCardPubKeyFromIndex(index)
  );
  const collectionCardIndices = config.collectionCards.map(
    (card) => card.index
  );
  const collectionPubKeys = collectionCardIndices.map((index) =>
    getCardPubKeyFromIndex(index)
  );
  const sigNullifierRandomness = proofParams.sigNullifierRandomness as string;

  switch (config.proofType) {
    case $Enums.ProofType.IN_COLLECTION:
      return createProofInstance(JubmojiInCollection, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
        onUpdateProvingState,
      });
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      return createProofInstance(JubmojiInCollectionWithNonce, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
        onUpdateProvingState,
      });
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      const N = proofParams.N as number;
      return createProofInstance(NUniqueJubmojisInCollection, {
        collectionPubKeys,
        N,
        sigNullifierRandomness,
        pathToCircuits,
        onUpdateProvingState,
      });
    case $Enums.ProofType.LEADERBOARD:
      return createProofInstance(Leaderboard, {
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
        onUpdateProvingState,
      });
    case $Enums.ProofType.TEAM_LEADERBOARD:
      return createProofInstance(TeamLeaderboard, {
        teamPubKeys: prerequisitePubKeys,
        collectionPubKeys,
        sigNullifierRandomness,
        pathToCircuits,
        onUpdateProvingState,
      });
    default:
      throw new Error("Invalid proof type.");
  }
};

// Generates a proof from any quest parameters
// Exact proof type is based on quest proofType parameter
export const createJubmojiQuestProof = async ({
  config,
  jubmojis,
  overrideSigNullifierRandomness,
  pubKeyNullifierRandomness,
  pathToCircuits,
  onUpdateProvingState,
}: CreateJubmojiQuestProofArgs): Promise<string> => {
  const proofClass = createJubmojiQuestProofInstance({
    config,
    overrideSigNullifierRandomness,
    pathToCircuits,
    onUpdateProvingState,
  });
  const prerequisitePubKeys = config.prerequisiteCards.map((card) =>
    getCardPubKeyFromIndex(card.index)
  );
  const collectionCardIndices = config.collectionCards.map(
    (card) => card.index
  );
  const proofJubmojis = jubmojis.filter((jubmoji) => {
    return collectionCardIndices.includes(jubmoji.pubKeyIndex);
  });

  let proofArgs;
  switch (config.proofType) {
    case $Enums.ProofType.IN_COLLECTION:
      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proofArgs = {
        jubmoji: proofJubmojis[0],
      };
      break;
    case $Enums.ProofType.IN_COLLECTION_NONCE:
      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proofArgs = {
        jubmoji: proofJubmojis[0],
      };
      break;
    case $Enums.ProofType.N_UNIQUE_IN_COLLECTION:
      proofArgs = {
        jubmojis: proofJubmojis,
      };
      break;
    case $Enums.ProofType.LEADERBOARD:
      proofArgs = {
        pubKeyNullifierRandomness,
        jubmojis: proofJubmojis,
      };
      break;
    case $Enums.ProofType.TEAM_LEADERBOARD:
      const teamJubmojiList = jubmojis.filter((jubmoji) => {
        return prerequisitePubKeys.includes(
          getCardPubKeyFromIndex(jubmoji.pubKeyIndex)
        );
      });
      if (teamJubmojiList.length === 0) {
        throw new Error("You are not a member of any team!");
      }
      const teamJubmoji = teamJubmojiList[0]; // In the future, we can allow users to choose which team they represent
      if (proofJubmojis.length === 0) {
        throw new Error("You don't have any Jubmojis in this quest!");
      }
      proofArgs = {
        teamJubmoji,
        collectionJubmojis: proofJubmojis,
      };
      break;
    default:
      throw new Error("Invalid proof type.");
  }

  const proof = await proofClass.prove(proofArgs);
  return JSON.stringify(proof);
};

// Verifies a proof from any quest parameters
// Exact proof type is based on quest proofType parameter
export const verifyJubmojiQuestProof = async ({
  config,
  serializedProof,
  pathToCircuits,
}: VerifyJubmojiQuestProofArgs): Promise<VerificationResult> => {
  const proof = JSON.parse(serializedProof);
  const proofClass = createJubmojiQuestProofInstance({
    config,
    pathToCircuits,
  });

  return await proofClass.verify(proof);
};

// Retrieves quest proof parameters from a JubmojiPower
export const jubmojiPowerToProofConfig = (
  power: JubmojiPower
): JubmojiQuestProofConfig => {
  const prerequisiteCards =
    power.prerequisiteCards.length > 0
      ? power.prerequisiteCards
      : power.quest.prerequisiteCards;
  const collectionCards =
    power.collectionCards.length > 0
      ? power.collectionCards
      : power.quest.collectionCards;

  return {
    proofType: power.proofType,
    proofParams: power.proofParams as Prisma.JsonObject,
    prerequisiteCards,
    collectionCards,
  };
};
