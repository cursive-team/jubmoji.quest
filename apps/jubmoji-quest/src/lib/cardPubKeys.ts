export type CardPubKeyInterface = Record<
  string,
  {
    primaryPublicKeyRaw: string;
    primaryPublicKeyHash: string;
    secondaryPublicKeyRaw: string;
    secondaryPublicKeyHash: string;
    tertiaryPublicKeyHash: string | null;
    address: string;
    edition_number: number;
    image: string;
  }
>;

export const cardPubKeys: CardPubKeyInterface = {
  "0xc86a09a518d4534e5f7a8b4973b2af1a6ce0b23a898f6a39e7675fe467b3631d": {
    primaryPublicKeyRaw:
      "04ff3850dedfd21e2880fc4709e954513fdd876c4cbdffd54673d738f12f9cd03750cf0965d61d7306c199206645cf54d168c229e1e883879aba49f8711f26fc9a",
    primaryPublicKeyHash:
      "0xc86a09a518d4534e5f7a8b4973b2af1a6ce0b23a898f6a39e7675fe467b3631d",
    secondaryPublicKeyRaw:
      "041941f5abe4f903af965d707182b688bd1fa725fd2cbc648fc435feb42a3794593275a2e9b4ad4bc0d2f3ecc8d23e3cf89da889d7aa35ce33f132d87b5bb5c393",
    secondaryPublicKeyHash:
      "0xa8c91b3f39aed181e4c412dec1b0cd62de5724c0931d39a530c3434a96475209",
    tertiaryPublicKeyHash: null,
    address: "0x470385041A360EE2150b33a061876E4ABb692426",
    edition_number: 1,
    image: "robot.png",
  },
  "0x3c7fb8f194562ba0b93f7ee1ffe4edd5b40d2371579f59883cc8b5762d03e5a2": {
    primaryPublicKeyRaw:
      "043216a81f8a4cebad8c8d88727d662280efbbbf820b5f37d9bf61c73a92b6f98ff77a5efb200a88a85d4daaf2e0e7ac603e7fd0fd55f5b947757d2ea0b1468613",
    primaryPublicKeyHash:
      "0x3c7fb8f194562ba0b93f7ee1ffe4edd5b40d2371579f59883cc8b5762d03e5a2",
    secondaryPublicKeyRaw:
      "049ae9f2ec6a4db43f0e081a436f885b0d3f5753a45b00d2f2e3da38956848c4ff0205d89e14a2e36976bfe033407dbce6b48261d84d201277de0c3b82f08ddb09",
    secondaryPublicKeyHash:
      "0xa0dc2194efafae25bbb20ea748c622c674a83bc28e30e2b133e47d7172bfaf2d",
    tertiaryPublicKeyHash: null,
    address: "0x1fc30A073b3Ac07f531D5fab1d1B520e5872De4F",
    edition_number: 2,
    image: "invader.png",
  },
  "0x743569e21ba14de63bc6ca3c2e0a7a63a8cb2558a6b8af5b77d30283f334ed34": {
    primaryPublicKeyRaw:
      "04f9a0cae4422e5158aee4ea53786f802b5ed078264e5c340c3a9b36d51282cbd2eeb6d7191060ce7fabf8f404e160b4047dff6c7cb9495659ed8d8e83c59cab81",
    primaryPublicKeyHash:
      "0x743569e21ba14de63bc6ca3c2e0a7a63a8cb2558a6b8af5b77d30283f334ed34",
    secondaryPublicKeyRaw:
      "04b5fe0a16bd7524cdcbd00d6c886d25370faf94ab16b20a101cc9ec4147e7b67c3a2853db205a993e1b826b01f49f48b35af795a0ed1ea1a7ea0d849794a71c73",
    secondaryPublicKeyHash:
      "0x2b78f7aaa517610c8ff8661a36121850213c0644b950a04ca12891b8f06a08a2",
    tertiaryPublicKeyHash: null,
    address: "0xb797c9835f80858987A66784ef7Ce513A2e5daE2",
    edition_number: 3,
    image: "ninja.png",
  },
  "0xebd6e049df3b26ef9ae637fe190aedd324b53fb4a971aa88fcd9f1054cf5423f": {
    primaryPublicKeyRaw:
      "0494f9dc44272a5f70dfc5d26b1542c8acedaf4c3d328d6968eab4232c739482c5eceabfe45c46368a9b5af40f84ee39cccc057a8849ecf173af3322344cb5de9c",
    primaryPublicKeyHash:
      "0xebd6e049df3b26ef9ae637fe190aedd324b53fb4a971aa88fcd9f1054cf5423f",
    secondaryPublicKeyRaw:
      "044d9d03f3266f24777ac488f04ec579e1c4bea984398c9b98d99a9e31bc75ef0f13a19471a7297a6f2bf0126ed93d4c55b6e98ec286203e3d761c61922e3a4cda",
    secondaryPublicKeyHash:
      "0x6642aadb610171a450e09e367ad93b8b1a83a97d79d0f49af0468cbd6df4f5d2",
    tertiaryPublicKeyHash: null,
    address: "0x0E3c6c0884953F0acE63ce16b6bbA4D10F6c133F",
    edition_number: 4,
    image: "turtle.png",
  },
  "0x068f94ea995262b7d405a7896a99609ffe1ed5b3889bc160155d83e23705d293": {
    primaryPublicKeyRaw:
      "04db2acb0f73479160e4b430623844edf7046036793a9ed8dcf30ad4c8d3aac125a8b9730c0df2aa597fdf1e2e37dbc2cfe86d45d4642c29587415c3eb8672bacc",
    primaryPublicKeyHash:
      "0x068f94ea995262b7d405a7896a99609ffe1ed5b3889bc160155d83e23705d293",
    secondaryPublicKeyRaw:
      "04bec2217da234b56487f52f43d8b12ca2133abbe37b841b9b1214df222308a949ff7cb2feb7274d9fb4ab12e13861c5c9a57591e9078f9c6356de31af21ad63c9",
    secondaryPublicKeyHash:
      "0x10149d64ffab8d0e525be55ff0fe783e28731fa2f432d1a19019dbb40004df82",
    tertiaryPublicKeyHash: null,
    address: "0x10693c31b2bBEA34f4a08ab640983a0c9B530452",
    edition_number: 5,
    image: "pizza.png",
  },
  "0x9a83aaeac3fa6611c75ee9bb5e19fa77c4a57f315f7a54b9fd2bad4537436f62": {
    primaryPublicKeyRaw:
      "04708145b993551d6bc2cc0baa1961b10af31c903e8936e91c3e1ec5bed6a47d766f4b633f7bdb5b4c7b93400d3bdaac06e8d55a439facc4d38749d0a67dba6e5a",
    primaryPublicKeyHash:
      "0x9a83aaeac3fa6611c75ee9bb5e19fa77c4a57f315f7a54b9fd2bad4537436f62",
    secondaryPublicKeyRaw:
      "04cf92e6ba430b9850fb9d32f37205cd0824ffacf9d67db38dada0e38a22722556b376390fecda5c3672e1b1a96d10c758841623f709420bb4c778d8620aa21694",
    secondaryPublicKeyHash:
      "0x2e28b2539a49779af7c6a572131476328bd51d07512d30711f6e00727d28e06d",
    tertiaryPublicKeyHash: null,
    address: "0x401112374873C1e2eE9b9D87d155e77d6453E902",
    edition_number: 6,
    image: "pinata.png",
  },
  "0xc151a66289777ba16f549c483940ae22c1c398467ef85e193fcac40b2668b653": {
    primaryPublicKeyRaw:
      "049f0f8bbd975c6b1e2e5ad7d2902330c819b57a7cafa6a482ef1fa35f7942fcf09a555abd7fa2ddd8c7c40a26c81e641dd001d1bfaa76b6f0fe203685661e927d",
    primaryPublicKeyHash:
      "0xc151a66289777ba16f549c483940ae22c1c398467ef85e193fcac40b2668b653",
    secondaryPublicKeyRaw:
      "04791c766d5bc25d6c83a90b7eca85a48f37ea1b31611be991360813ee62f8299dc1e81299e48e25c547189fd4e04ee90b95878ef20f92cbebaec04a066a777139",
    secondaryPublicKeyHash:
      "0x35319334fa322589dbda021ad779348efc4fb9c59e855c92388dea6be778f7f5",
    tertiaryPublicKeyHash: null,
    address: "0x2270028f844260E67c63d2A30a6e2A4a7Ea1Edb2",
    edition_number: 7,
    image: "unicorn.png",
  },
  "0x989b39733197e7b2e5ae5b84de9e4d7c2e475a9fe13c621255de777449648f3a": {
    primaryPublicKeyRaw:
      "04a6764787179d6979ffe4a34b37adc6f9625246a9343b3b47664dbfcf65bdaba2b911552fa7d8ea39335c2c8023e505e26bc574a89d6c437047559c48b5f65ae4",
    primaryPublicKeyHash:
      "0x989b39733197e7b2e5ae5b84de9e4d7c2e475a9fe13c621255de777449648f3a",
    secondaryPublicKeyRaw:
      "04a4d3ba66949c0f769306725f17c82c4c3dce73aafd450269c1bc15032c86669089cedd3e3d1750bf4dfbabb825598b64bec0117a845da742489de6863fc46d51",
    secondaryPublicKeyHash:
      "0x3f3bf4cae70d0a6cf4c5a2cff8e0cdb1baec2ecd7e7a40b446ea2d96fd881500",
    tertiaryPublicKeyHash: null,
    address: "0xdAE798400aCF0725e05CB15CdD80aC366fcF77d2",
    edition_number: 8,
    image: "mushroom.png",
  },
  "0xb45b7543d8f643605910e3657ac1fd9e1284dbf67ea37fd4e80a29c739a5e3a9": {
    primaryPublicKeyRaw:
      "04208ea4983d938b8f47a652775d9749ccc84b96705a9af556360e5649d31236f1e39b8ec43fb7d7dde7748222cef65b12efa174a6d2c45932065ca422b5c0ea5c",
    primaryPublicKeyHash:
      "0xb45b7543d8f643605910e3657ac1fd9e1284dbf67ea37fd4e80a29c739a5e3a9",
    secondaryPublicKeyRaw:
      "04cdd710aa77c6b1af2c2ccd1c93755f377ffc5ba6bcc0bf4af33ba7d3759f3d5003b6cdda73c6e55412359e7eb7ca81c3c2b55aeec8806a3f145d54c43220b018",
    secondaryPublicKeyHash:
      "0x95228e0680a6b68284f79fba3b6707d69d32ff4d22a3b2fea2f1f07b8662b81a",
    tertiaryPublicKeyHash: null,
    address: "0x1dA0C9E23fF24a07Fa4e365C74E2819d95944182",
    edition_number: 9,
    image: "soccer.png",
  },
  "0x4b4dd1221c45419d06bb51adb58f8b33ab59264bce16fe28cb17a6279d0aa909": {
    primaryPublicKeyRaw:
      "04d3235f00a28aca5fc9d7cb57affa9a45ae2a8f3536c42ccf33bcae398ef6637ad55983ea1458dd948243f305fed29afd6df52c45416e16d4d2a3bb468d5f8512",
    primaryPublicKeyHash:
      "0x4b4dd1221c45419d06bb51adb58f8b33ab59264bce16fe28cb17a6279d0aa909",
    secondaryPublicKeyRaw:
      "044abb1bb39ba1fedc81493974887e03ed30585c188df4adb0f8b695a196c413da2ecf46ff32d9eae2121966d8c6e357297b5b6445f2afde33ca712176d78951fe",
    secondaryPublicKeyHash:
      "0x871de2bde24c4020324a1b77f0eb2657f0f8004c1d47770dec215c478d20d6c1",
    tertiaryPublicKeyHash: null,
    address: "0xa1e935b7e9E229d727b73aD9797D54d79118035D",
    edition_number: 10,
    image: "pumpkin.png",
  },
  "0x956e6323b6c5c005638f3bb0ca0dfb158d371d722f8fc75ab36ae0c139b43bea": {
    primaryPublicKeyRaw:
      "044c26fb09e3a90715a03e12eafd5729d55aa9e691ade35ff9bee987b4d8a05b7a871d8740c70590e0a66a80fcf9c8b6bf4f9072bfa0c92d481c341b1065d43464",
    primaryPublicKeyHash:
      "0x956e6323b6c5c005638f3bb0ca0dfb158d371d722f8fc75ab36ae0c139b43bea",
    secondaryPublicKeyRaw:
      "049970ceae967468c3255424ba5e42d7e1cb7a16573c128f8ba9441b8bfa6d90fd3a6a16a977eb095d3275222cf91ad10ab7eba7ddf02fcd66f357c85b4cd8458a",
    secondaryPublicKeyHash:
      "0xfb7c9565398f74d59255595fa30aa241ff1827ce79ccede36b256772abebccba",
    tertiaryPublicKeyHash: null,
    address: "0x09c0dEBF9e1CAE0a3496f4cd00626C77F0936213",
    edition_number: 11,
    image: "avocado.png",
  },
  "0x17f8bc0c55c3a8ca24316df5750133cc17ef8bcf4ba1d487a294d2a2e78ca92f": {
    primaryPublicKeyRaw:
      "0400809e3ea096f9e236e2328ce190373904ed63b46998c7dd1a615fbc4a663f94a7d3fb5900fc4d34a41b70a7c4d4f8a19ed228ce4b200a6923dbc8489dba6064",
    primaryPublicKeyHash:
      "0x17f8bc0c55c3a8ca24316df5750133cc17ef8bcf4ba1d487a294d2a2e78ca92f",
    secondaryPublicKeyRaw:
      "0490c6feefdcd01aa8c3b288f4e53d80576aaacb14eee826389ae214ae7c00a2c9d97cb0b30bd265a0be83f5c57c1ac432c1cd325c56c9706a720e24d7221320bf",
    secondaryPublicKeyHash:
      "0x966a86ae001b995239c65b104bea61263efc15b5f08f207233a91f7a262b8454",
    tertiaryPublicKeyHash: null,
    address: "0xa4bAbEcBD4fCFd0e3E460B6c4C9cdA31a239Ee89",
    edition_number: 12,
    image: "nerd.png",
  },
  "0x0aea5bbe0062e222da2c0466e4131a90211d036abdcbbb6e0e41064d2d3fa2a3": {
    primaryPublicKeyRaw:
      "0476e705e2e1de44814ed03bec8f19267a7da74fc7b1abd5af4d3ce79ed59f606b3793338eb48cde7e70fd7f654fb3cbdd44f32466251326b5591c9f1bfeaa99bb",
    primaryPublicKeyHash:
      "0x0aea5bbe0062e222da2c0466e4131a90211d036abdcbbb6e0e41064d2d3fa2a3",
    secondaryPublicKeyRaw:
      "04f71b0e58de50fa4fe784da180c0ec1b6d91df3f1c0076a35d88fa8e27c9ede90299e5a54532bbbe8124351f8b001157ae30e927146315e86fdf716b3800bf571",
    secondaryPublicKeyHash:
      "0x322e8c45df717bbaf5063508503982dbe9389f81f81e9bb9a8f0ca059c6d694d",
    tertiaryPublicKeyHash: null,
    address: "0xefCc898bB6E1c0c7D27E2e46598d92253979C5f1",
    edition_number: 13,
    image: "ghost.png",
  },
  "0x822c86fe5a352ac05ec2d1dd40da557f910d9eb49bb36ee7e4121043a624a243": {
    primaryPublicKeyRaw:
      "04741d592a48f4051816c649f4d43da148270f68e813655abec79ee4e17d7d1e5f127ecc0f5b3a2495babd39fc0baa8398dddb7505e4b2f21e24b6e74bb726fe7e",
    primaryPublicKeyHash:
      "0x822c86fe5a352ac05ec2d1dd40da557f910d9eb49bb36ee7e4121043a624a243",
    secondaryPublicKeyRaw:
      "04275bc2f41f1b4187d7748bd872b2b6c723644519d565df2befd762cab09f0ef9763a386eeae6c0a8ca4d84e42ee4d7f2014cbfc5f66d5d6ff2c55caedff9e091",
    secondaryPublicKeyHash:
      "0x25b883a05c65530ec950c568d78c6e4d19a1c3a0c34523e20cf9b8aef7ca2a35",
    tertiaryPublicKeyHash: null,
    address: "0x23adDF617ad7CafB08788F25e9f69Bc4e4cad5b3",
    edition_number: 14,
    image: "cowboy.png",
  },
  "0xffb8b70a3b529703db1dadf44364e7baaabe0ad614400f916fa0a41470696441": {
    primaryPublicKeyRaw:
      "0475c7dffa11e747230c6d29e76ff455803f904ade08625f405e025b827494c281e69de0e566c8ac5af78ccc6792a6110dff69b6472fe1e9fc8faaec10c3c1b127",
    primaryPublicKeyHash:
      "0xffb8b70a3b529703db1dadf44364e7baaabe0ad614400f916fa0a41470696441",
    secondaryPublicKeyRaw:
      "0487dc90c8abb34118dc55fd90988411d4de6e3672d4a4ba90034794a95a54e7bd5671269c8cc7432ce63df7a38e7192a0db77420d6f456b04daed632f83b9d7d3",
    secondaryPublicKeyHash:
      "0xf66d6f91da3080fd082afd6ead2a9a102737df035ff0fd2c9a101e10bc94a8ee",
    tertiaryPublicKeyHash: null,
    address: "0xb864478e6368b487bd140e6E0a98a32C752c005b",
    edition_number: 15,
    image: "alien.png",
  },
  "0x886d870c580a1afd981f6febb241bf90c516bf794ac609cbc285d54eed073da5": {
    primaryPublicKeyRaw:
      "047dc457f8b71358f3d2614ef3ac3b1f3c66cb33680cca6e9eaea44379edbba3247ae4e984b00fc359017612c2cd1c0ad02fba0712ee140aae76ac796fdfad57e5",
    primaryPublicKeyHash:
      "0x886d870c580a1afd981f6febb241bf90c516bf794ac609cbc285d54eed073da5",
    secondaryPublicKeyRaw:
      "045cbc3903ff68627cf6b146e0ea6896415c54821ca2ac6ba4e704db90fe9cfc9b47112316d05e9db577c82248d520a8368397dd9ea386bf8d02da80a8b5d8098a",
    secondaryPublicKeyHash:
      "0x2288dc9eff2075cdd9fb8cbec2d970da9c41f3e1013188c947ccbb673402df16",
    tertiaryPublicKeyHash: null,
    address: "0xAC8849a3F22ACEae6A16d5263DB9B8F16b3afcd4",
    edition_number: 16,
    image: "icecream.png",
  },
  "0x49d12d11723fde46b24df767a96aff4b419ea39999437a1ddf7bda2919ad399f": {
    primaryPublicKeyRaw:
      "04c4ad15e6a02554e41d57a9cd006971e6a94218d09695e3a20917e221d51877c8b4f1973f7037127b1b102cada29a4bb46307d8d4d4473a5be970b5864a6c7d06",
    primaryPublicKeyHash:
      "0x49d12d11723fde46b24df767a96aff4b419ea39999437a1ddf7bda2919ad399f",
    secondaryPublicKeyRaw:
      "04c837ebd9afa2797839e7a8640bf12a0067e5419b5f70dbd606b7617f95942723201d240c687e6e887a55f8ce0ced1366ece4f54405acdbd11be9a141990d0195",
    secondaryPublicKeyHash:
      "0x12bb7ece528e114b309bed2f19e52874d1177aa7705ad71d574dbb0919652ecf",
    tertiaryPublicKeyHash: null,
    address: "0x4630Ea1c39C13e4565537095212Da78b06727044",
    edition_number: 17,
    image: "fairy.png",
  },
  "0x1d50e02e15f5ad40afeb6956433ad4a1f4d6b9b5493d0c26fe112716beeb1005": {
    primaryPublicKeyRaw:
      "04c987a8ebb06eaac32b24c007a759bc82d06141f0fc5f693596b85cf6b3efe4dbefabbf7e639abf9b1c051dae6002df68195f428a272da89d0eec9219485a80cc",
    primaryPublicKeyHash:
      "0x1d50e02e15f5ad40afeb6956433ad4a1f4d6b9b5493d0c26fe112716beeb1005",
    secondaryPublicKeyRaw:
      "040dbf74e1578fec614ed6de5252a18ef39f4950290860dd867d60b99eb97f13041ae801f14d17dbb21208ba557e1fad3ff7c05a66b267f1f7bf61ec0ef2ac2640",
    secondaryPublicKeyHash:
      "0x873f76df2989212347dbdb870379dfe783be95facdbad3fe0df80eafab00e9e4",
    tertiaryPublicKeyHash: null,
    address: "0x8a9C12e9114048EDeBC236Be51249b3630605E80",
    edition_number: 18,
    image: "butterfly.png",
  },
  "0x7f4ebc55033b1b6d8e58c581fd7bbfb8f2f8a45b6196ad526b20814f8ccc2c9e": {
    primaryPublicKeyRaw:
      "041f9c82c0b65bd9a53a4bc8c9bfe23be148984d76a1a1d056d92cc8adf6694382865b36f9753f35b897cecced7b10c59a43e6c3aecacbfc362bb4cecd6d1bc321",
    primaryPublicKeyHash:
      "0x7f4ebc55033b1b6d8e58c581fd7bbfb8f2f8a45b6196ad526b20814f8ccc2c9e",
    secondaryPublicKeyRaw:
      "044e714f50b78e233139e3c68123d5f84fac79be809a3c16a42561c0cb6d78085cdf08c6a0a654b99df4034fe768caba0a77a52f6996530ef06587379674bc0d69",
    secondaryPublicKeyHash:
      "0x3ae0770c1dbdb83a14726414838c9a7cc8bb0929aea6a643dcdd886ba0ee6c8e",
    tertiaryPublicKeyHash: null,
    address: "0xa762d8d3553D3Db3988CAFFe17d952045cf49e7A",
    edition_number: 19,
    image: "bubbles.png",
  },
  "0x387c43d07a38e7139db397f8003b4359d9eff82ca4ad6aab88dbabf2f8652f1e": {
    primaryPublicKeyRaw:
      "042571b4af17b0ff9cb6f4d5527a1ca5dbe8d016d65e9dd91eac092fd9316d7918b0fc8cb69bd8afc05cf852296707a2b131e9fe9c567a1db42713d70d8730aac7",
    primaryPublicKeyHash:
      "0x387c43d07a38e7139db397f8003b4359d9eff82ca4ad6aab88dbabf2f8652f1e",
    secondaryPublicKeyRaw:
      "0435ecb77b5e54260fc7d01c99ff2209a57467c0dd07f3af586c46b0d52cefdbf0e78f415747d4e91a80ab48eb12d103b705ac38a445b2acea273cefb041982308",
    secondaryPublicKeyHash:
      "0x190539ed6bd5d5ac7f64c2a57aa8278eda38e46849bb6ed11606a2fd1f859b4c",
    tertiaryPublicKeyHash: null,
    address: "0xe145d8ddC646F62FDA9E3070991A206c6EeDddE2",
    edition_number: 20,
    image: "dolphin.png",
  },
  "0x4bd4cf685e0cc3561a45a5f0af70241ec836a33255b73acef28ec7a6ac8d01da": {
    primaryPublicKeyRaw:
      "04fc5d86b9d83c901e96551b612701f65138823f666fd28e7b2547f8f0b146076ca9113702f646b8fdef91610059cf561973fa98e10070ba8ba548503bc7902e10",
    primaryPublicKeyHash:
      "0x4bd4cf685e0cc3561a45a5f0af70241ec836a33255b73acef28ec7a6ac8d01da",
    secondaryPublicKeyRaw:
      "04814583328d53c99394b741354a7aa1f7da7eb9ad050e453540c5aef0d5316b451bc884559650a88a743f35677f0f5c4e67180553a651ef53e252c68c73a79ce3",
    secondaryPublicKeyHash:
      "0x7955ab214a7a2d59244c5aeb76fed789dfa478cfc77615584cc525dd2189188d",
    tertiaryPublicKeyHash: null,
    address: "0x5B7961D5a28D3aaf6339Bc438C89d5824b668Cf5",
    edition_number: 1,
    image: "head-exploding.png",
  },
  "0x74820eb5539f0f0cea20a4e3a6f42af0c2a864d09844fa9a87cf0c407bc9dcfa": {
    primaryPublicKeyRaw:
      "0416bc6092bacf26781c7536ab7c70d910dc1a7823f5cdb46a9a081843bbfef90390748b66e97f2cdce309fe497986b3ade17f30a506b74b2e33714989bad81796",
    primaryPublicKeyHash:
      "0x74820eb5539f0f0cea20a4e3a6f42af0c2a864d09844fa9a87cf0c407bc9dcfa",
    secondaryPublicKeyRaw:
      "04ae5b0ebf63cecd39cee620712c8e490918eb269aecd173a5ec04d381722df569b472653e98972e15aad4fa6f58287c5e576220d2aeb43ed0294cadc9df08abac",
    secondaryPublicKeyHash:
      "0x95420d5b2b40066aab9552840b8ea85f9793959517cbe3b23599cb804d135c86",
    tertiaryPublicKeyHash: null,
    address: "0xc026D86156776919E701CA2B8B3a0B8Fbe75721B",
    edition_number: 2,
    image: "squirrel.png",
  },
  "0xd356c4371f6a10e6ff0d73dbfb811057990d7e7cdb807119cf963bd22fe056e5": {
    primaryPublicKeyRaw:
      "0492822f375cffb3af4aebe6b263f96da645ac871f78df88744264dc5f6ee5379772977e13ecd5d155aef56adfeda1e88b9b7094765dcefb2dd01e23c9a6899665",
    primaryPublicKeyHash:
      "0xd356c4371f6a10e6ff0d73dbfb811057990d7e7cdb807119cf963bd22fe056e5",
    secondaryPublicKeyRaw:
      "040b5950039a5b7f5d60b1b17e4e688ab263225a0d0fc164865cf947cec1366acb9d46eef0dad397c29f4e7f62076c7d1dd04c1b6612dd6e4b3d5fa9f0db117c76",
    secondaryPublicKeyHash:
      "0x6da324fa6a8d74beb9576880793c91a22028d6809ca8517f222edb3f3607fd9c",
    tertiaryPublicKeyHash: null,
    address: "0x6476770355E549bc308E7715e3Fb99a503996180",
    edition_number: 3,
    image: "cookie.png",
  },
  "0x26fd28ade9ee435cb49adc8167a13d5e6cae50e0ebf12515a51311b482d47ff7": {
    primaryPublicKeyRaw:
      "04af6d0eae5fd2b561fb5a86382808ea137d5b2e5df92184a6990e5d5c672db940e2282c70359354987437e9fbb1007e395d05629f8f9888492107f5299a11321d",
    primaryPublicKeyHash:
      "0x26fd28ade9ee435cb49adc8167a13d5e6cae50e0ebf12515a51311b482d47ff7",
    secondaryPublicKeyRaw:
      "042b9603d4195eecf79519222d299c55c170a097892fa401ad894174fd43144a87b5484c6a4d200517248ea6907100baac0c3e13a495aedf0015b4e73d7a91c800",
    secondaryPublicKeyHash:
      "0x8d06735d24c4b0a676b508ddac797ea844b1c529a23d5988f00f1cdb8af19e36",
    tertiaryPublicKeyHash: null,
    address: "0xc9d8F0A18D8056E7B3F3729cb5C939DeF8E05b45",
    edition_number: 4,
    image: "crystal-ball.png",
  },
  "0xf4aaf38cbcc745e673e27d7abe9b91c47035e27b46adc849ed4d37d831161f13": {
    primaryPublicKeyRaw:
      "04399d894a766c3f66122234c608a5ebd508b16dcc3b092d6b8ac18e3fde4061b31799d26419cf476fe334831296429bdf807b2f02661cf8f4eb2938c062ec4958",
    primaryPublicKeyHash:
      "0xf4aaf38cbcc745e673e27d7abe9b91c47035e27b46adc849ed4d37d831161f13",
    secondaryPublicKeyRaw:
      "040306bbf644e9df5e9c624d7d7b35d28dfbc489d4cdc158cf2c9d8ba9cb8771bc69e8c8c6d8b9a53d6ae1066d519fb0d7c66b72776bcfbde1034efebb9e923544",
    secondaryPublicKeyHash:
      "0x5a4b1bbb413a9ec60cf38e71f062740ed65cde58027b99d18baa94c95fefa735",
    tertiaryPublicKeyHash: null,
    address: "0x1db42299d25950Ae2f0CCbA2e578a2932dFEAB4D",
    edition_number: 5,
    image: "magic-wand.png",
  },
  "0x2b8ec41fb0d140fe82558aff77ec1af11b245d7b7ef40030cdc6d9403a879c90": {
    primaryPublicKeyRaw:
      "04400c35ec256f8500bfb3f2dc4d74c2613747290d9f890a3f1ed35bf2b1059a3c4604195ba2498370535531dce2086d9d792feebe24233afae37ea79ffbfbbb2a",
    primaryPublicKeyHash:
      "0x2b8ec41fb0d140fe82558aff77ec1af11b245d7b7ef40030cdc6d9403a879c90",
    secondaryPublicKeyRaw:
      "04253eb83fdd65e35b32dd8310e5938852a537e25e5ac56075a1c0138d3d47f77af19439f4789fdd6a94a4c18c5ea968d9af81a4db65e61b9281d512f132d6d903",
    secondaryPublicKeyHash:
      "0x52b7abc1580400ce7d9260f8b5ef1c7192124c864c59f92323b31f64a15f7fe9",
    tertiaryPublicKeyHash: null,
    address: "0xD976649C0d4545D52AfB2C05A2eab5f06c400d40",
    edition_number: 6,
    image: "boba.png",
  },
  "0x022196bb3695077556dcd193e6b5b8320f18c6f7d8ac5ad2b4574c7aca1b458e": {
    primaryPublicKeyRaw:
      "041fdb4c1fc722b6c9d9aa34f678b7f6c7a31a626b32967e42e4177f579d6eea0ca4d8f926a3851647d58c679aa2d33d92aebe267c4b8a8f717482e180f1482922",
    primaryPublicKeyHash:
      "0x022196bb3695077556dcd193e6b5b8320f18c6f7d8ac5ad2b4574c7aca1b458e",
    secondaryPublicKeyRaw:
      "040e1edaf138c82fdee96a2e8f0584a6c44c8d083e34bbe4c7302423679e3d236113077233def82994f1c6e19467427080b2ee8623c7e9e8f7ba26df7c9ca1d6da",
    secondaryPublicKeyHash:
      "0x44e8da5faa55865898660216543de1e866a361526733b2de69ad7ae93a9b0dbf",
    tertiaryPublicKeyHash: null,
    address: "0x759Db844706f0924De09450DDF5e52F1C9a17E45",
    edition_number: 7,
    image: "skull.png",
  },
  "0x05560c2209790f5e2283f91bba7572c9d28632a3ca504f55a3b315f066c5c95e": {
    primaryPublicKeyRaw:
      "0474ee192b8306b643b69940384b5978edc7b66ebdfaea7e73b9031f2f8da51831ef6b130e0dc7b09840edcff052eeea3ccfe202e24c8c08a7d759e514aac47af2",
    primaryPublicKeyHash:
      "0x05560c2209790f5e2283f91bba7572c9d28632a3ca504f55a3b315f066c5c95e",
    secondaryPublicKeyRaw:
      "04f5671f45076b3cffb5cc39b3e2467015dd3fcec395d07ce630626e1388f43431b992b0f8521c12ee0981c8dc17c6e899bb4906d9757569cff950937b08abf015",
    secondaryPublicKeyHash:
      "0xc3ab1346bd5236f05f8f26a7b35afb3be1938b65192a77a1a2052c3157cdd0d4",
    tertiaryPublicKeyHash: null,
    address: "0x27338ba55F40B568E62E73EEd2CF02025d57088C",
    edition_number: 8,
    image: "sloth.png",
  },
  "0x9128b96b008cb3ae92bef20b3a39ba8bbb35d729a66d51cf99f657124de3174a": {
    primaryPublicKeyRaw:
      "04e08e95e56ebd78b314a85472f33e5477a4ece82638b9ebaf512a2e84af0d86251e47eeef25d47d60766b3bb58e4d83f3d2ab2e6eaf7fa27e2df8bfac03d7e9ac",
    primaryPublicKeyHash:
      "0x9128b96b008cb3ae92bef20b3a39ba8bbb35d729a66d51cf99f657124de3174a",
    secondaryPublicKeyRaw:
      "04fb555ebebc95a418838616f3e551eab14feb0464906c611aa8144b0b11259b8e5f81d2ef92cdc022ce017c9e3d3952fcc05ccedb9b83ea4da10552fd3bf44f1e",
    secondaryPublicKeyHash:
      "0x620e18a0ea1f44017a431413f783257ec4ec48a2758ac87abafa256740b34dbf",
    tertiaryPublicKeyHash: null,
    address: "0xA7089Ea555a5342DdeCf659B7179849a5206399E",
    edition_number: 9,
    image: "eyes.png",
  },
  "0x97f86cd238c3d811e6bb9d55419c9bd3c3a131b925ddbdee4694efc5ac94de31": {
    primaryPublicKeyRaw:
      "04dcc931fc832975a9d7a0b9c7254f934a323a79d4a18bfc1a8bcfce109f02171532e573ba02a86cda2c0193e4843ecf56ccb8a87f37a45395d81e78f34ab68294",
    primaryPublicKeyHash:
      "0x97f86cd238c3d811e6bb9d55419c9bd3c3a131b925ddbdee4694efc5ac94de31",
    secondaryPublicKeyRaw:
      "04c20cc07e19fe0412c232ae69589f8c4f7e0dd9f5443df9ee8fd0ef7d8cfc9092fdfb8ceae259ec5a3fd1c8143c8377b215845b21ca89d5b2a2324b9231623b62",
    secondaryPublicKeyHash:
      "0x56c91c2d14db4c0de55d070e3064056f9d6b370ad0d09b404854647ee522404e",
    tertiaryPublicKeyHash: null,
    address: "0x16cDC497fEadcA0F8EFd4524ea75F711dDdcfC33",
    edition_number: 10,
    image: "handshake.png",
  },
  "0x4723c0a33b3d0cce47c49dc57a4ec79359a5a05abae53a61864f58a6b51c5ed0": {
    primaryPublicKeyRaw:
      "043896ab6920d04a4e43e7f810f3dbf0732b5d872718abe0d94e1dc25e7a1a01f688e8363489c1acfdf6a8a6ad9f0d929eb5c746494de8389bf9e674ad7b6dfc92",
    primaryPublicKeyHash:
      "0x4723c0a33b3d0cce47c49dc57a4ec79359a5a05abae53a61864f58a6b51c5ed0",
    secondaryPublicKeyRaw:
      "04b679ebcd6b328b0654fd040b7f327efae2f14a6dd20e103013c90f527212900e640a8fc1e9b595feb3db2d69ba477dd00638b078b76501d0183187639a6fd376",
    secondaryPublicKeyHash:
      "0x4535b2a4a0bf513a690b87a6dc4f1550cad32e2246b546277040366ee120e5b3",
    tertiaryPublicKeyHash: null,
    address: "0x5A65AFe11008bfb2860551cc9aee290E90146561",
    edition_number: 11,
    image: "blue-swirl.png",
  },
  "0xba6aa9695426ce050957d2bc85d3e0665e224d48dae4f31a9d93d61b81542987": {
    primaryPublicKeyRaw:
      "049ee6e7e06dad62ab2c74017f3044827c8c9913664db0767e10c6e875606c98e42ac5314bb319d38abf96a0fc6079f23e89b40db89a08e988b4316716fa5e4ab4",
    primaryPublicKeyHash:
      "0xba6aa9695426ce050957d2bc85d3e0665e224d48dae4f31a9d93d61b81542987",
    secondaryPublicKeyRaw:
      "04ddaf8c2c9c6f12db6455d5cdcae27cf92551f574d1fdeca48aa7ba19c54e9b5d6f7089d825fff4d9918509c026b2fa19ecb05286f8c268e84ae0cc926cceac6d",
    secondaryPublicKeyHash:
      "0x52963b71317db073a369f8d5ecc629761378c386dfef6a9224becfc701cd0729",
    tertiaryPublicKeyHash: null,
    address: "0xc361dE30041e7190f201705dC475D9184Def555e",
    edition_number: 12,
    image: "lollipop.png",
  },
  "0x278ea05bd99ac4816163c11bccefd7adabed0bb93362b8efc5c434c62fcfbe5b": {
    primaryPublicKeyRaw:
      "04939aa8768998da82bad7f1d36de73864dade1519d5f8451ac7f66f591d4f3e8459f09050cbb0deb889ca733dfba4ce0e434f7ac31649e49641b32583b26d983f",
    primaryPublicKeyHash:
      "0x278ea05bd99ac4816163c11bccefd7adabed0bb93362b8efc5c434c62fcfbe5b",
    secondaryPublicKeyRaw:
      "04aacecf1aac4584a56601a4864588549804d4b17b421296b30305b2bfececbd5975620f5d4f3902ce4c5cccbd3561910a7afe7e7c190091e8ec8af307e5e36d9b",
    secondaryPublicKeyHash:
      "0x2e9cafee1674327247c12ecbc87f31984471b972a9b799707cef7f3220065f28",
    tertiaryPublicKeyHash: null,
    address: "0xC0754c73e63F5D518C9e9eF4024E8e2C3EDe1A38",
    edition_number: 13,
    image: "angry-cat.png",
  },
  "0xc71549c89253932683a9b590870266bd3211a783dc87a0f5297b148b3d028b55": {
    primaryPublicKeyRaw:
      "0483bdf60adc283fb868bfe4647d2f22b23bc4d4b1d291a0588217b082bff271e4462b06248a011d3a36a2b6709bb31b9fb28560bb3fd9d86eff1d4f10762fd2e3",
    primaryPublicKeyHash:
      "0xc71549c89253932683a9b590870266bd3211a783dc87a0f5297b148b3d028b55",
    secondaryPublicKeyRaw:
      "0439f5dde559078ec8355c360f0dba6ef95b7ab2528810bac2cfd491ca3a950e9a3754195712ad158e5e3f9551d8e0b51cd9017438931d1a4d5db8336a946b2cc5",
    secondaryPublicKeyHash:
      "0x2f8fc4fff027c37409ad5ec4dc8428db4027e71a084be0c02ed946a134fb50fb",
    tertiaryPublicKeyHash: null,
    address: "0xC0741485866382D61A99F077Ca5eB323fFE8Fc58",
    edition_number: 14,
    image: "poop.png",
  },
  "0x8f64b5c51bd725359354085f4c77819bad49c8bba6f07b7f784d0fa30c860fb6": {
    primaryPublicKeyRaw:
      "04f78e88165c5c22066110acf7e8a999953ec0be09e04d9b763f564ce46e4d38760010f5d6f43734e6d2e9b02d66bc3e2425c955552069050a6cc844cdaa1c046f",
    primaryPublicKeyHash:
      "0x8f64b5c51bd725359354085f4c77819bad49c8bba6f07b7f784d0fa30c860fb6",
    secondaryPublicKeyRaw:
      "04c5d692686843af56b8381375238dba00782b449be014d17e4b33f731ad46ead39b783f6d53c42ad5448732ab28b2b98f63b474a3378b9fb191595e2249b6a30e",
    secondaryPublicKeyHash:
      "0xa606240f1d0c49ebad5be3808234f19ae02a1a5cd0e3da97372778cb806051fe",
    tertiaryPublicKeyHash: null,
    address: "0x4902164d7D2459f18C801dD91Ee7703c878b51AA",
    edition_number: 15,
    image: "fingers-crossed.png",
  },
  "0x92705b9508c360cfd91cccf9906681ea1ba9a90bd3b59ac45f2ffd103426f9dd": {
    primaryPublicKeyRaw:
      "04f832d3f1820e871ab1ee4230cd9e7e64ca2c36a4bd1ea14b573a86c2293b8ca1dc12796c138ebb5c2555f803b29fe8b706dfbfd943ba6ffb9f5861c41676c4e2",
    primaryPublicKeyHash:
      "0x92705b9508c360cfd91cccf9906681ea1ba9a90bd3b59ac45f2ffd103426f9dd",
    secondaryPublicKeyRaw:
      "041953b2ad1c29d883284d7b0af20467d79b322f4d0091b2c231c361ad16af9ecc2801c117b3a0ca1bf2db045a378687e83ae88278069fe4850f14d13c41c74b02",
    secondaryPublicKeyHash:
      "0x198e6065be9f14fe0571dd70ce87a7dc89a89f10b2f562c3d8094ed1cde95331",
    tertiaryPublicKeyHash: null,
    address: "0x46C79830a421038E75853eD0b476Ae17bFeC289A",
    edition_number: 16,
    image: "baby-angel.png",
  },
  "0x72a5c4abdabb0548817ac3532ac01b48320b798568eae78c086511da3375ff28": {
    primaryPublicKeyRaw:
      "04c695bc8db617a6f3b51f4acd1966a9b735c08217f303893190a9c2fcb5414595eb5991797e384b924f328ce419f7abeabc4eedd1f43f2efb2a5d4ef2a3967012",
    primaryPublicKeyHash:
      "0x72a5c4abdabb0548817ac3532ac01b48320b798568eae78c086511da3375ff28",
    secondaryPublicKeyRaw:
      "0496de2db759c0a6bd0b7ac3dc256cfa95ab4a1b4e4554e1be687a6af2c0864afa82bffd0989cc7eeeec9e404267c956ac9e46bd696661b6c28536a2d45c0ec876",
    secondaryPublicKeyHash:
      "0x2bcd55b89ef363281504594025f5a96c8c515c07d152440509081553b974d723",
    tertiaryPublicKeyHash: null,
    address: "0x0F623230f8ec5c01Ac75a3DD3545F62887F8F9f3",
    edition_number: 17,
    image: "clown.png",
  },
  "0x3c7b9c4646f439ede21f7f7baeca346d44823cbb0e24e04a17abe86232360691": {
    primaryPublicKeyRaw:
      "041b7d3061a367103a5df8bc245d82be04bfbce82ace8b7d3c83db7691f4cb645057d251d88565fff9dacdb320ff973f919ea878e07fa95ba725dfed7ac4b0e2f7",
    primaryPublicKeyHash:
      "0x3c7b9c4646f439ede21f7f7baeca346d44823cbb0e24e04a17abe86232360691",
    secondaryPublicKeyRaw:
      "04d200e99fec98599473167224c29116003828448e129bf7721d755e6ef98188d16f6f786d1b79ae5e2336007cd4dd298689d4619550d38f2fb8d07526feecee9f",
    secondaryPublicKeyHash:
      "0x683e3c6bfe4ea466b7370f9d0fb6b374b138033bb55e9dcce0ce21953f94dcc1",
    tertiaryPublicKeyHash: null,
    address: "0x265C8a8ba20048f841fAa6571663c62a6918f920",
    edition_number: 18,
    image: "caterpillar.png",
  },
  "0x925481c7a3c1cf0044613fe16e3bbed965a4ac0900a75358dbae01e032366398": {
    primaryPublicKeyRaw:
      "04953a5211ddd2924293c6d256412e74724df71450239cd24757645e7a680e286f7ccc1ddc8e2d569d4db54e2c4b461152af9127a311ba9b59617cf444a53dbe46",
    primaryPublicKeyHash:
      "0x925481c7a3c1cf0044613fe16e3bbed965a4ac0900a75358dbae01e032366398",
    secondaryPublicKeyRaw:
      "04060174ff00c6b93b0add32243573b90fad96fe7ce7ed396cef49f77616b3a682c1a6e7aa28d02cce4449102c742dfcfd673d846d054e82f05871c6bd4853aa36",
    secondaryPublicKeyHash:
      "0xaa788300a57a2819a985ed5941c846845ece957b70a0359d8209b696873f7e2b",
    tertiaryPublicKeyHash: null,
    address: "0x6188bB7d7FaC0FB97a6AdE6f739815757A1F09c6",
    edition_number: 19,
    image: "palette.png",
  },
  "0x828b975546750653c0d0e058a412c1e5972677541aef84242380a2fa4fb798ea": {
    primaryPublicKeyRaw:
      "0480b5389295899076d8eebc749d84e2bedf1d7ecda6180e9e4ce59b736861711df0dcffd102f3d039e9ba7337cc7b20f97c1d4f867cc1fe6ec6c105c6cba8f27e",
    primaryPublicKeyHash:
      "0x828b975546750653c0d0e058a412c1e5972677541aef84242380a2fa4fb798ea",
    secondaryPublicKeyRaw:
      "04a3ae5686a386576dc4c0ad7a670c96582ecef62435e36ee8267d23ed1af6f286b84005a67d46c23ff45ed1f1211622da8e3b6d2ebeb14acba8b65a2073c68402",
    secondaryPublicKeyHash:
      "0xe6a20adbcbfbc2682eaae8ff92f8f163fdd500c290f9996520f4fef1a4c3fafa",
    tertiaryPublicKeyHash: null,
    address: "0x87FF0334D89C6EC537e7c4e77DceeA3b05D63B9C",
    edition_number: 20,
    image: "dumpling.png",
  },
};
