export type MessageSignature = Record<
  number,
  {
    message: string;
    sig: string;
    pubKeyIndex: number;
  }
>;

export const messageSignatures: MessageSignature = {
  0: {
    message: "A random message",
    sig: "30440220026f68310f7ec028afbdae45558533a17e2a1d8bad0f66c700f44310e89a8ca90220000c663a91b1563aca45630a57af82d80b2eab85419d88cc717dff66f14dfe44",
    pubKeyIndex: 0,
  },
  1: {
    message: "A random message",
    sig: "30440220026f68310f7ec028afbdae45558533a17e2a1d8bad0f66c700f44310e89a8ca9022001fa3fb7b9e0043a5bf52ef7a689bf2482951124474cd27ad4dab6ae4a2e409a",
    pubKeyIndex: 1,
  },
  2: {
    message: "A random message",
    sig: "30440220026f68310f7ec028afbdae45558533a17e2a1d8bad0f66c700f44310e89a8ca9022003f8572246e6d47c256cdb4d640e4b0eafa4c6f21ef7b84386a33a5e8d3b216f",
    pubKeyIndex: 2,
  },
};
