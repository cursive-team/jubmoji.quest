type QuestType = "official" | "community" | "challenge" | "achievement";
type PowerType = "invitation" | "groups";

export interface Quest {
  id: string;
  name: string;
  description?: string;
  image?: string;
  percentageProgress?: number;
  type: QuestType;
}

export interface Power {
  id: string;
  name: string;
  description?: string;
  image?: string;
  type: PowerType;
}

export const PowerOptionsMapping: Record<QuestType & "all", string> = {
  all: "All",
  quest: "Quest",
  challenge: "Challenge",
};

export const QuestOptionsMapping: Record<QuestType & "all", string> = {
  all: "All",
  quest: "Quest",
  challenge: "Challenge",
  achievement: "Achievement",
  official: "Official",
  community: "Community",
};

export const quests: Quest[] = [
  {
    id: crypto.randomUUID(),
    name: "Find the One Piece",
    description: "Help Luffy to find the One Piece",
    image:
      "https://media.ouest-france.fr/v1/pictures/MjAyMDExNjM1YzM2YmMwMDFhMWU4OGIyZWZmZWE4NDFjNjE1OGM?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=02df95003367f42bb49fd488be9f07a97e5294d1f3f8f9d3a28180aec795da6e",
    type: "official",
  },
  {
    id: crypto.randomUUID(),
    name: "Zuconnect Opening Ceremony Scavenger Hunt Explore the beautiful Zuconnect space!",
    type: "official",
  },
  {
    id: crypto.randomUUID(),
    name: "Collect 3 Jubmojis",
    type: "challenge",
  },
  {
    id: crypto.randomUUID(),
    name: "Zuconnect Opening Ceremony Scavenger Hunt",
    type: "achievement",
  },
];

export const powers: Power[] = [
  {
    id: crypto.randomUUID(),
    name: "Anon post to Twitter",
    description: "Post as any Jubmoji",
    type: "invitation",
  },
];
