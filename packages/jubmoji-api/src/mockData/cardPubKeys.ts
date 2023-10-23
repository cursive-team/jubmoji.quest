export type CardPubKey = {
  index: number;
  pubKeyWeierstrass: string;
  pubKeyEdwards: string;
  name: string;
  emoji: string;
  unicode: string;
};

export const cardPubKeys: Record<string, CardPubKey> = {
  0: {
    index: 0,
    pubKeyWeierstrass:
      "0407258C81D3DE9F17FFADFCD8CE1CBCAD83027A7FD0A3221FF03CFD1DFBE0CDDE04D68FC27A9F3F0A0BF480326CE5DCD2A9CBFCA34D4098E6A60DA4AE64281950",
    pubKeyEdwards:
      "0407db8c679bdc8b1a4db4965cd260e11081acbaf6e5d333d34a8b4d7129285bce22bda7ca19e6d7eadf3e87dea9ded3d85a50a632f7da0c40b81c0fe220d71bcd",
    name: "package",
    emoji: "📦",
    unicode: "U+1F4E6",
  },
  1: {
    index: 1,
    pubKeyWeierstrass:
      "040902129E2195B5DEDC2F9B060E846CE6FF6B6A32794A5BA22F3FA03B068F90A52635451C65448273303F2D403F92FF57FD10A67B1B956B3258A1AA5F4F88B5CB",
    pubKeyEdwards:
      "0407db8c679bdc8b1a4db4965cd260e11081acbaf6e5d333d34a8b4d7129285bce22bda7ca19e6d7eadf3e87dea9ded3d85a50a632f7da0c40b81c0fe220d71bcd",
    name: "amphora",
    emoji: "🏺",
    unicode: "U+1F3FA",
  },
};
