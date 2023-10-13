export type CardPubKey = Record<
  number,
  {
    pubKeyWeierstrass: string;
    pubKeyEdwards: string;
    index: number;
    name: string;
    imagePath: string;
  }
>;

export const cardPubKeys: CardPubKey = {
  0: {
    pubKeyWeierstrass:
      "042ead1f974bd008262022c1d30b01389c99ceb63b614a28a9d340b517a6d858bc2ee8241c4a0d8dcf9048ea97d124a60b16c9f27313178dceba434fc54ca10e23",
    pubKeyEdwards:
      "041f41270b21a6236fe77038c2ae95dfba5dc18b0075ce0d8774c05682da30b6052516e6ad11d596c1231dce1bee1c9e6763a95c5d57944478b4dabc3a8ad56a5c",
    index: 0,
    name: "robot",
    imagePath: "robot.png",
  },
  1: {
    pubKeyWeierstrass:
      "04084cf324ba282ce6dcdc02a45a34cc03ded34f04645f2e7757deef01d9d3d13c05b4565b3680e35f26f9bfb7d07f1b9880ace5c870b90ec758b2a08e3ad72ecd",
    pubKeyEdwards:
      "04197eab2816d5b87a1a86bbac17dc0e2b52985fd7a3226a22f26701f10632402c2092b99e12b519a33c9f6b031f4221ec0f3ad8c6cb4e79a9d68cc428e5396ae0",
    index: 1,
    name: "invader",
    imagePath: "invader.png",
  },
  2: {
    pubKeyWeierstrass:
      "043033efb3b7a4881ba88a5b0d09ed2578a43ca4d437edfcfc9d754b3f13a0cc0a1c60a88f163b2af7ee1c3d369f74e0b43ddcd5323ca275b02117ed7bef52fe0d",
    pubKeyEdwards:
      "04199d748a85b2f4e1978f9bd9b99423e71508220d8db602beddc942db360640b20965b98f3c4c7b23664064bf6afb79de663196833c76ce9573199ab529984b3d",
    index: 2,
    name: "ninja",
    imagePath: "ninja.png",
  },
};
