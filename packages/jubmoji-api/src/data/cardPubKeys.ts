export type CardPubKey = {
  category: string;
  emoji: string;
  cardName: string;
  unicode: string;
  cardImage?: string;
  imageBlobUrl: string;
  pubKeySlot1: string;
  pubKeySlot2: string;
  pubKeyJub: string; // in Weierstrass form
};

export const cardPubKeys: CardPubKey[] = [
  {
    category: "infrastructure",
    emoji: "📦",
    cardName: "package",
    unicode: "U+1F4E6",
    pubKeySlot1:
      "04f636e4bb92a5d9e9677cdeab99ddc86523b3c5b4b1faec579454eb310a0c8d019ec22a20cf5e82b52f25eadf771daba5665f5ddf5d7a8a6c5dc9b5e1860b68b0",
    pubKeySlot2:
      "0407e903636c8bdc5a0df077fd30f069610af52d3709bf949ae6f47120531137ac1bcb867d01b3ac8ea994f2aa474239a11751b41c5db0a8d3c02a2442be7231ad",
    pubKeyJub:
      "0412523e60d96846642195d836a062f30e46c95b57a474ff7a8a16a29e543f02c100e5faa84aae505a8f3f925b479f89a8165e6bc6b4d5830c7c01f6eff1f4ec7e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/package-oBEbKyUNTLnB5QRcufTMMNyo79MJ4Q",
  },
  {
    category: "infrastructure",
    emoji: "🏺",
    cardName: "amphora",
    unicode: "U+1F3FA",
    pubKeySlot1:
      "04fdde67560ab7039e0b1967b55c10b081f9dc9139f33d2649626d1dfe8f216ffac16af423192f721cc68b4283c5f21212ea16173eca38708acf223e50fce9cd93",
    pubKeySlot2:
      "04e585cacd6ca7b828dcba3ef517c8ff1e6da022bb38377b0df488bf9e68a0d1d36748840166842ade1b3e07e1d2d81fadc1f5c6457bb5b05251939cdd265b0353",
    pubKeyJub:
      "041c6e382eafc869ab86990db1eddf131706e5a809156110f077f9b8cdeedae45004146a92c096bce120c8782ab2ed29f35b585aaadf1fbb99d96a54740acad8c2",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/amphora-jCvMVfXKVExaEXQcNIfW7k7jgOU1mv",
  },
  {
    category: "infrastructure",
    emoji: "🪑",
    cardName: "chair",
    unicode: "U+1FA91",
    pubKeySlot1:
      "04db69a3e24a1dae9663db695bc2fe0bbd191ff8e58977c326c7a69dda17aca5ca79ebf96065b42d55bd23728b882afe812982f50de9da13ed39813043728fb954",
    pubKeySlot2:
      "04c0484fad1dcc95d8e584bb97203a647f5adc1f7f0c39e692bdbdc7e200e32ec68a2c64c2709d0934cf2211436776340a8c05afd7bd06f1c18bc05750461e0efc",
    pubKeyJub:
      "040f727ef69c97f68db604cafaa618bd09731af6ecded93af3d2adc0690e7dcb3f00c7c1b852c034f1ddf11f3dae58f843abda0c8dbb125ebec8e31b7080bb34b1",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/chair-JMchvcgosh3DEzoz1Ny9ekL7o72XL7",
  },
  {
    category: "infrastructure",
    emoji: "🪵",
    cardName: "wood",
    unicode: "U+1FAB5",
    pubKeySlot1:
      "04231b4af763f091a7af3fd6f44bedc2d1e69e454aaabe9b167ef907a7d0e3506a6ee328f0a5e4c932ecef354678ac680bcb6ed6f543f1000d1c2609cdb78b67ba",
    pubKeySlot2:
      "041aa20e6705a7652e966dc9efc22ba3549a2d45cdb587635d847d9e886dbcf71a6b9954f0d7b3a71ebe7a09703738abccc08d5fb5a65617833171fbf0b408b7ea",
    pubKeyJub:
      "042ca92f2f557d8be025a0bcfb261873f559af2e323deae3049d6cbf26b5a7773d0fbaf0063e145a0bdc57ee647728db3c48d472fe1e9ea3b15b3731eb6796effa",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/wood-02IhtSASKk2v2l1YFkHOgayZxATTO9",
  },
  {
    category: "infrastructure",
    emoji: "🪜",
    cardName: "ladder",
    unicode: "U+1FA9C",
    pubKeySlot1:
      "0434967b55b71c33e400dda9d2d30aea218998f62ca1a9b936ac14c1fc076e980941c75b52d9bad3b840f2db7bb87125cf3ae3414005d213e36c5a88b50c29f10c",
    pubKeySlot2:
      "048674bad25019d3f22a234d2a5e7120f58e5b9be22874f77e34b5099e7d658c03c9b85d03ac70757106a7368bc78cdbce5232a356810c20aa1dba0c63d509cc1a",
    pubKeyJub:
      "04209bb1e02d6ed136597aab2ebad415c95f410c5e3abe5967378ce0aaf87478d506ec6de32dd1cf1a8b48051f86c79c34dc5b08550109f70e4719e44ad5f27587",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ladder-M05mRUFvshdgtFQena59OGYOdXJccC",
  },
  {
    category: "infrastructure",
    emoji: "🛤",
    cardName: "railway track",
    unicode: "U+1F6E4",
    pubKeySlot1:
      "042d7d5924a0b38b15531a97c88272ab4452bbb7df4eb2674a3b88b7428b72a64a6478a27994da02af088968cc1187949ee4c721ec01cbf64493578cccb09df306",
    pubKeySlot2:
      "041baf5910271d2ddd5c08633248ac166c63b50049f8f177c02c66596d9aebc2796238d2c6db6b848c0e6bc94fc8c864d223f3eafc840e7a7dcdc4c98c4f77bc47",
    pubKeyJub:
      "040d430f7b48608cd8ed7b90eff094ca8360d85f4ac20a5af9f34b8fd9bc59af060b924fefa75078348dc65df5f1b5d1a55a8bb07717446d6b415e15ceef979c11",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/railway%20track-C3n3jAAzTMaHxVJKrOspSw15OE7YOQ",
  },
  {
    category: "infrastructure",
    emoji: "🪟",
    cardName: "window",
    unicode: "U+1FA9F",
    pubKeySlot1:
      "045c19350ab5a84c5a21e2c422e3c73b698cd8fc08c34df9436883aa71daba4ebb686407c2fe2e7cd12acea1d9cf6bc8a0cc5d7231f4379ae4d1891065c3c1d470",
    pubKeySlot2:
      "041e6153665b529005333f5820cf79ec85e22e37bc5cdf8945fe59d4fa75b966079f55b1ef01ad932c32336dba7ece279e81db59dca30709b90411772a62b09d82",
    pubKeyJub:
      "041751efe545d83b9a963b6df2c630dc150541d959855a750627e907378195341605ab3e2304d7c3e456e647619092296b642d192844226cd33eaef7c4eecc5b1c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/window-sXIdhVVOdNExQJScsstXEP6wrekJsB",
  },
  {
    category: "infrastructure",
    emoji: "🐴",
    cardName: "horse face",
    unicode: "U+1F434",
    pubKeySlot1:
      "04d2ad605a00240de51260af5a48145a4b9743e0e94349b58734f7b73cf56245b8a2ec9299fdb8cab1f1891f1cdbc37d887d9f5ef05618bac427ff801785a52841",
    pubKeySlot2:
      "0406c2efdc15fff84d7fd7aefc072c79195d06728cb41cb6d9f10497326664a272e01c99f711ed7f973963f01900b870cdeeed56ec8d71ae38f98cb24680340c1b",
    pubKeyJub:
      "041c0c338706e39158c2e6710cd95ebe5a18f174fd17ebb6c5bea29d14c20ed1651c06b7e62ceaecd25b4181f43df0f494217b936fe128ee9c04ee8ea21922cc24",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/horse%20face-WLXCImmL1dHa9JfCIMdQj3dDxhaF59",
  },
  {
    category: "infrastructure",
    emoji: "🪹",
    cardName: "empty nest",
    unicode: "U+1FAB9",
    pubKeySlot1:
      "04280b9a5d2d634581fe683decd48041d39a5b95d277828c61d01cae5804a189622c0999e0da83571e5c290383332c7aea4c6c37b5c9daccfc20532ea91754306c",
    pubKeySlot2:
      "047c81cb4fa35411e0076e3a720af8823d31aed3a08cfffb7cfd6aeaf70caa6dff87e033affe9d9610f576eca499cd6286bfc132bd3bfade1379f98d7d9f410576",
    pubKeyJub:
      "041ecf0cdbd794ab51c87a3e44ee39744332a41a34be71c2a0ec24e18cda9029f91f5c980f88340b4ebba8bf18f6cb0c9a4a2d8efa95160c91992284f47e268224",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/empty%20nest-o7TeckHFlEhxoCr4HoVMP5mLKuR3KZ",
  },
  {
    category: "infrastructure",
    emoji: "🧺",
    cardName: "basket",
    unicode: "U+1F9FA",
    pubKeySlot1:
      "0418535a2ae3e48282b156293d9985c0372268bf8002a3b720487213cf4a0a4a7cafeef9179721415e273920956bdc05204153bb36db9bd3f58465349ba50f4154",
    pubKeySlot2:
      "0405adeeb496b4b6c2685e9f1a3ee442469f67411b770a494f67c2666497c639b36a999f020d2864aace2a699135f7c76d9a345704aa737306ab1ab411cf1cbfbb",
    pubKeyJub:
      "042499f2473d2e2d7ddec9cf8f895503f3dc8336efcb0630292511f2232f5febb707811bef78ceac3eaf2973cf3966d9baaebf9575d4e998bcc4365942193f13b4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/basket-tCBmyGJXJQRNkWl1xSp5bQ2E9F5DsT",
  },
  {
    category: "infrastructure",
    emoji: "🚪",
    cardName: "door",
    unicode: "U+1F6AA",
    pubKeySlot1:
      "0420f18eeb69668efad265f3794ccd3b48fcfd9ca009e0d6e1e587e64d2eb2946b5da0176abfdac1fd9c95ad192840debcc1d410fd48abc22c5b8121206a453a8b",
    pubKeySlot2:
      "04a96835645324a61b45b51d0c7818ac4405bfb3c62379987f711d407ccf4783d1afeaeebf8aa32f6fb490797d0b8bc5bf28af74501e17be473138cbbe030bf71c",
    pubKeyJub:
      "04215409d612e54896f3e2ec40493d9a968439808a89c4bc3dff779f9ebbfb08b227d3ea1da74424399f642724bdd649e6fdbedb737174f61b415ff09ff3cc5630",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/door-GHuCLaE2VaL9oFJ5PDbmv6TKJ35KmB",
  },
  {
    category: "infrastructure",
    emoji: "🏗️",
    cardName: "building construction",
    unicode: "U+1F3D7",
    pubKeySlot1:
      "04b3e64176a53a3b04eaee6bafadcdb0564c28092d74717ce2273715f853e4bed7a7faf51585d3df5e71dc014c4876561ac9c532c9e15eaec3a6b5cb5312cc75ca",
    pubKeySlot2:
      "04be965fae176c0c04e50f9d37622562c90d446e4ab20c5d2a10192842f5a9a5af7eaec1a1910228f7d4750069970d5611f6145f7baf2daaee3ecb8ec09b844855",
    pubKeyJub:
      "041ad09796e5baefa45a56feb817618f719a20b805b956d3db4f6efd27893bfd6f2607fc84c0ddbf37fac1e4a7c59a167393d70a62d366ebb37a1ec6f60f767491",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/building%20construction-zlWolyzYdLORPyBuwOZjt0JCv4tvTW",
  },
  {
    category: "community",
    emoji: "🗣",
    cardName: "speaking head",
    unicode: "U+1F5E3",
    pubKeySlot1:
      "04a2673b858d0cf22d8a168c241d597b134cf8b920976e53a9b445fb491dd34b5f6d53a29cec07f2c9378b46174a7d086036679b6635c2540cbc9611f47f797966",
    pubKeySlot2:
      "04b7152b2bdc94387b89182e2226dcbd264725518b8635718115df1e420e0ebbf7e455e1e89a033a091bc71edcb472ee815c51216e90bfa4e93b3fef0cbf35561b",
    pubKeyJub:
      "043025e40984a0d0f720e983d2f8eef530dd2ce7c9bd32fb153596396da6aa0f3020fcfa9ab08390c08b40e490dc2458e6aae9502ccb250aba7e7dbd5edbfdfffd",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/speaking%20head-nQicWfO0KTDRjjlHRinhw3jCoYKCgH",
  },
  {
    category: "community",
    emoji: "🌐",
    cardName: "globe with meridians",
    unicode: "U+1F310",
    pubKeySlot1:
      "0487da13a6228542dde50aabf83e678845e022055380f4dfaec768e92e27909da5f749a6794a53f239fbcd89340a9420f452e0478d5b42544f3548ffcd595dbe19",
    pubKeySlot2:
      "048caee276df4a4fe29bca3597916df7f11ad807e4e9b790038af598bfbcc7ab10606df3114d104e061916ccb4fb545c469fb960e6251d3d40c622a3a0009b62aa",
    pubKeyJub:
      "0423b421472165df8ab52eea32c00fbceab7cea172944707041ec082f46f13ded02055167f91f56dffc156283344801adfb73d07d2b5036084d959e080ef302cc1",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/globe%20with%20meridians-ntHHsoY0lLdDZfd9XjQj1eg2KQbA8V",
  },
  {
    category: "community",
    emoji: "❄️",
    cardName: "snowflake",
    unicode: "U+2744",
    pubKeySlot1:
      "043eaac99e7d0d6eb389bc28ef65fd240692338dbd0390478106030e524d3d0dc3f92922630f7e501915fc13b23d03ddb98dd9698a200e7940a683ef3d0f8fbf5e",
    pubKeySlot2:
      "04d3b938170e5dcf0fa9e833bb9649d0cbb6e4ac6e77b68137cfb61da1d4143805ef77293cfcd3fe73f9fbeb451dc9396242bdbc3de4ce20d43281aba9b4555cf0",
    pubKeyJub:
      "041b76a2b0a7ab5a4634c741fa5b98a6fe54e61e1ac2f61043b43d70289e33325726b2300c053e774c9d25fe2b3dfb087246741e76476b9d8cabf4b4d10996b314",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/snowflake-iVhTwvV0jY3UdukUBAJB2yHoJOmHoi",
  },
  {
    category: "community",
    emoji: "⛲️",
    cardName: "fountain",
    unicode: "U+26F2",
    pubKeySlot1:
      "0414bbe91ece7893251209c4ec8e79fd30157a61715cba151483bdff2b543ddb7996ade8bf0dfef85b0fb41afd78ca38fda4b6e862e34db8ee9489e7c82e9d892f",
    pubKeySlot2:
      "045dcec4e544056904be45e46b2593640acbe11ace5bfe7a7171b3ae2490e6066e514cb26f9fe5eb9834a8bebac682255ba6deef2f0ba1e56cff5b3b3482404c4b",
    pubKeyJub:
      "040a3d7532389f2bd829b2f05c08e4f2cc5314061fa58917e177ef6e015712aa1c2857d2ae4b2b017a648d9681fb0099d80925360787f7fd59cd2565f863388d0c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fountain-ijyY8sp0jmgikLro9xPgARAzFuR7Pp",
  },
  {
    category: "community",
    emoji: "🗺",
    cardName: "world map",
    unicode: "U+1F5FA",
    pubKeySlot1:
      "04f04f32e750658a41601414d11d5ff6c8dc88b14e16e153e5a198fa5abe015684c385ad389286d31948276e8800596e010a4bb53b301e5abfc02831721feb2651",
    pubKeySlot2:
      "0462bf0fc146173ef10052a922b262242dc8280ba335807535206670e6059c6e2ca864fa253dda07d385854f8bb0e57fd138d13b9e060a2ef1001afd6618a9acc3",
    pubKeyJub:
      "04265b6b7dc234576d3c60c9facae572e7dd48f0d5bcd6f6a800c5dc9df27538d715470f5c26f245d9dd5293a41e7480a6d421f8a3a5366f9df7c0832b092a9f47",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/world%20map-pHChUg7Va2w2MN2GMmq4nSYg93kTSX",
  },
  {
    category: "community",
    emoji: "👭🏻",
    cardName: "women holding hands",
    unicode: "U+1F46D",
    pubKeySlot1:
      "047bd96e21ab2ada3370e564bf233554ca9f9a3cd091a95be5b93a6646dd842665e62d3bebc80ad79d95136888122646d4c627ddbbdb1b28363f9140be86b618f9",
    pubKeySlot2:
      "0437788bd3051f482646b712ac42a8afa042794d9c42d5213f0a2ec8211b3bf63dd752017dfdeba9954ac009c6ac408cc12bf211f539611f0a3aa231b43ce44150",
    pubKeyJub:
      "0403aad648afc6e81f15ba48a7afb3e9e1166b9440bfecb5d3d2735f317cae18f32d9d6e96b29e5eb63c7ad39bf302abe6f6c2764b3e70ee71ec11a23ee1566638",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/women%20holding%20hands-WXpeC2en4hvVyIfJ7FRoYovTvaMw9V",
  },
  {
    category: "community",
    emoji: "🪢",
    cardName: "knot",
    unicode: "U+1FAA2",
    pubKeySlot1:
      "04d7c57efeec910d8ddc30151fdfe7fc83db6f2c1ac3d924b29bac7e6f7a934bde1f83af41281ec3abae2fe57536b28d0be6a1f2b48aade1915713c62dbc886ac8",
    pubKeySlot2:
      "047aba51badfe45bcf38eea69c13986aa88f08d93b38196548ceaff04cab7fa6cb70e803edbb14ba6a26f9b2768652c8675f29c8bad44bd049ce2c701123fc5223",
    pubKeyJub:
      "0427b2d7b8098caa2ae3262efe6eee483a05f3b8cf02318da099e1c8b2d54a01511020c1b15efcb7597efccf74e6268ecdd3012f148bbcab4c72a05f8f1b50f9cc",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/knot-oW2U4gmW9IVBe9LENbydGIvNBSvB3t",
  },
  {
    category: "community",
    emoji: "🐦",
    cardName: "bird",
    unicode: "U+1F426",
    pubKeySlot1:
      "040115a2f79a08c98c28773fa7d12f6b969e01c957ead25afbda483861f535b77e40661ae1ac92b7fe42ef75b19f85ebc002bc7e410b683918af05ee32ed22ee9b",
    pubKeySlot2:
      "04c462c83e7d731145ce205995683fc67eed55bed7a97af662af351c66b2e251463b923282f07979dca23b4211dd999a32ac1748980a1fc572cd0213a0b6e5c214",
    pubKeyJub:
      "04246b5842c1370f1743637e0ff508a53e1f95d57ae3d0cd3e5c1417d1216101b30eb27f4590e8036fb8649a09f58ac0e1b3a74784eb8d43a26132b94877b5804b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bird-BBpVlxK5zxbSJzHT8CkP5I1Yubh4EE",
  },
  {
    category: "community",
    emoji: "🦕",
    cardName: "sauropod",
    unicode: "U+1F995",
    pubKeySlot1:
      "042e35fc95a2dedce365c2dd9f28e231f1a57170abf9de4e16b5d4b136ca2a69b77108803067882b8d40680bc2db0b3e1d1cb6dac7b3de71efd4e8a2a2d420aaba",
    pubKeySlot2:
      "04d909dfcb10c7d8a8347363ddc0df884e7c833082cbe586dbbfbda8368659da57fe207dac6af9e6638df3c246496ade45d0061992e71d6d186a3230b0d272f5b3",
    pubKeyJub:
      "04113862159e21e5710241ab90a0d5c4d9b52ceb4825b0cdbe2d5a27767b7d1bdd21e2b5bbee16a7d9c750268989891d744874b0b68d6ef693ed8ce3e777a378ae",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sauropod-NIz1R8SsxCt78uLb04t0tdRlRlvGyQ",
  },
  {
    category: "community",
    emoji: "🌌",
    cardName: "milky way",
    unicode: "U+1F30C",
    pubKeySlot1:
      "04f62af2233871873397542387085bf5a9265168be523c92ee542389d1df67c53fe5a90de82046d16bd478393c1d624a3a6f0d47e5e92fdcb6cb7faa81b2895440",
    pubKeySlot2:
      "048c81a0c89f139fb6a88b64100569aaccaa1b2900970f21ab9ed43804b616c64357e9bd57a8d5d9cbfd5d4246e1046527fc707ff0acbf19facfc626052abdefe2",
    pubKeyJub:
      "041f09cb8d1a0b020cb7c3801c68aa8f65b36c1638d2a51574867919005effcd4103e69874223008bb326c05adf08178d8463aecb8bcb574ebbc309bec8b03027a",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/milky%20way-YT3VBbz4LdJixmIGZLgjKUc6r9frF2",
  },
  {
    category: "community",
    emoji: "🛋",
    cardName: "couch and lamp",
    unicode: "U+1F6CB",
    pubKeySlot1:
      "041c101ffb489cb8959938d0e5e186dc0f4aa6978a08c9c6b0e2f4922ece9728a1f5b28a066f3b62be5b4ca7e0de81386a877d869fdc030ccbec7a1f3a77236039",
    pubKeySlot2:
      "04b013f9a23977e2bd11c4b1098e1b6ce50670ddc111c30d61e4c92b6497fdbfc348b9ee0619fca5c6e14bc1cef4836f6f349b621849eb6da82f4a527212d6a814",
    pubKeyJub:
      "042730df18ea37b6ac6e6097a4885c5d933f4a67096b0074bd91cfeea59175420e225007419c16981fdd9e19a8add5d764c04fb3b41606c50c5c56fb88a3b7b07d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/couch%20and%20lamp-3OpYsXthnt6zySxgj3yKQeOCDIorMT",
  },
  {
    category: "community",
    emoji: "🥣",
    cardName: "bowl with spoon",
    unicode: "U+1F963",
    pubKeySlot1:
      "04e374ccca0c16d90b3d8711127eab91f1431698208f4a6400092766f7b92600c2180792d41b0989d3a61caf2619e5c8e6e1159973bcf35a1544979787d9983049",
    pubKeySlot2:
      "049029c94d282878ddf20b953cd9d06a6b9625c06668e3ee5cf7021b40fb984db51884f897f7ab914e3c2389a277e47798d7a028d7734856d47152c0f6c49fbc8a",
    pubKeyJub:
      "042b2f39f04aa456a23997784bc4d710c043e10e6d829edc1b63e7973c7ca1007d246df616b225d889c9d5d974660641a9eed65d9b6eb2787a7f4b304fe2b7c3ec",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bowl%20with%20spoon-NYTabDSoicpYlcCKknQZvgIhOIaEeW",
  },
  {
    category: "applications",
    emoji: "🎾",
    cardName: "tennis",
    unicode: "U+1F3BE",
    pubKeySlot1:
      "04c87923607863530f49051acb3821baf9844fe0c01cd44ac10fb99c6f9916cca2e0595b83764bc132003bad14a7704ae32886792cb0546796c2e88c158873b820",
    pubKeySlot2:
      "04bdcfbed626cbd51b1a30f377fd2ebca1558500711f991dc5e9640ed7d2205a27d3481520a09f2831d80e344983079353c6640628a60eedbead9c650bda6e1ec4",
    pubKeyJub:
      "0402c81a9612b9022459947b92e90c32dbfa28b189b1eefb1db2e3cb443a240c4f1ab5f69fb32c9766dfb3871bf0034e38e37a57c9c45332d66dc32c18a7828a50",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/tennis-omcoIHAhF5luGnXHjyrBG8qZiGty8f",
  },
  {
    category: "applications",
    emoji: "🎺",
    cardName: "trumpet",
    unicode: "U+1F3BA",
    pubKeySlot1:
      "045f1a89418110c6f137b4a3dafd5812557f8385efdebfbeca7a759355101c5907cee9160010a2143588f9774c45fbe6c2fe7eb82d8820c3b7a61710f94a79d680",
    pubKeySlot2:
      "04a05cd6ab1edee6c8c88632052779b923c9489754f70fbb93836fb7aae3ebddeeda39fe7e692e9fc321b8a13309c3a15beae382af3d874489e882e87d519cbc12",
    pubKeyJub:
      "04002f85d640bf60b23b318e0d76f59b83ac77f45b71b5938061efc777e242adfa202f16371a22ee9234e9ff1af05ae02a9ee96dc9128432c7a0124f73231246e4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/trumpet-i45f8EhmWTsKKBGC5syvAEpH7TkiRd",
  },
  {
    category: "applications",
    emoji: "🎨",
    cardName: "artist palette",
    unicode: "U+1F3A8",
    pubKeySlot1:
      "044ff815feff41ab7e49b72bb0c141770929703bd1e4fdc802788162e64904cac26f406294acd2048ff2e02bd84fd726e8cc4d73a335de6ad1fb13afdcfafc6717",
    pubKeySlot2:
      "04c7c335338198ce72c059a30bd51c1ee7120f676c234a76543141b69c0560a4a55d136f081052c62926d6c41cb1bb5ac73bb2adb9337f9091efc4ba5d934ff9e1",
    pubKeyJub:
      "040266eb6711ddd7b0e458f13291498756204dbc7360c9fa263f17611f7fd28ac1029feae400e3562021e33da340089dee8ff805fbdba0505ce9be841779edf56e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/artist%20palette-M6xfOQo1M3VT955VrROwpdmPFFq8c5",
  },
  {
    category: "applications",
    emoji: "💡",
    cardName: "light bulb",
    unicode: "U+1F4A1",
    pubKeySlot1:
      "04dcbbeddf8f17752565b61a43842bde2ee71ed8c45501a169073e3be9d8dcbc1a97360b667a67681c988ee221594465f27539d26c0bed1aadb42c512734bc3bfc",
    pubKeySlot2:
      "04cccd7b7364deb65de1cd27755456608ff078ec320c40fc4113e6f7c9d33b0ae61211f5ef4e0e152240fef57e091c00d1dd2996ebc3d4d1dd17388d9229140bc8",
    pubKeyJub:
      "040e2b6737d78337da952eed7fbd5cb2eb658565073e3eff8fc4fa33eac3c61c6f04446e5d11c692ef237cc4ea5cbef4e826e545ef288429a3b6350a538e90186d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/light%20bulb-HQkqZAY9RAHdY6zmhiXIMJ9BETd5HW",
  },
  {
    category: "applications",
    emoji: "🌕",
    cardName: "full moon",
    unicode: "U+1F315",
    pubKeySlot1:
      "04f2cf641921b5c95e0fc95d800fa5d75c86832442c6c9a1041c4f5b5d330056839fea40261ad5cd987658f5da0d3baf6480829812cd049710d0dbd963a7015afa",
    pubKeySlot2:
      "0460de1ac78e582d46061348fc843e2519ed32f01b29804baee2759c6036e0f07198342b5331bb88a3c18eb9c4296f14bcdfcca07a98c46981f5f8fa8035e439ef",
    pubKeyJub:
      "04047f0e3eb5db817e455c6e52f322b42c5f8f2cd910acdc18bfd4028ac6b9c8142c76caa4fc0865eb92abc0ff7a221f490d08e70cb4aa180b4c795373a47b3b58",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/full%20moon-fHr8Jga517o6bnrjgEIwI1w7eHic3f",
  },
  {
    category: "applications",
    emoji: "🌼",
    cardName: "blossom",
    unicode: "U+1F33C",
    pubKeySlot1:
      "0432b1ce1f6b8be15b8bbe61d02bcc39869364e968400c2e7842071e9ee801e2f085c181f110feac6a2dab042e039f7b9ef619de984ff67342c3806ef701aba131",
    pubKeySlot2:
      "0416b8dbccaea34fd843fcff22f6053330d42d9d4f204a3c60f326bdf03f7c57a3a70c5797a60e0285ff19eeb1b6f7be1bdec138560232d4b15013508b57330751",
    pubKeyJub:
      "0414bf6ee66c6e49cb4d816473f6227fb8ce8708b4de9363ac529efa130fc0e1962b0fe095cb6c783b37dd7246a01d5230c5b6b61b538563af9231a629a426c40f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/blossom-i5Af6Zqhi2Ilk9uTBNHV2SEdfdeT11",
  },
  {
    category: "applications",
    emoji: "🤫",
    cardName: "shushing face",
    unicode: "U+1F92B",
    pubKeySlot1:
      "042a6a3a0154451405b88c7f5c30e52e8d8c3f0651427008d5ee1d502f1efc85f5e925d1e306f03adf8356ea20ce0c6b6738d9a836e2a4b72e6fde971da205e3ee",
    pubKeySlot2:
      "04644618ebeb3340e4e09ff91057733386259a57a14c8c3008fb3800525380e145a2b7d51b8978d45cf2a69fb7a5c76cdbec8e28cae7d34fc3cb07637429ada8c2",
    pubKeyJub:
      "040753e9bb060bd8851d8b00674388e9e77f8e7904d70bf70ca01af49c07008e5c212714a5083e8e2e4460855a5bf9cc68946fa0a0d250771501250d4483bcb295",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/shushing%20face-giqSKgsrZDmXdaWVDMRrm4HtTKSpJJ",
  },
  {
    category: "applications",
    emoji: "⚡️",
    cardName: "high voltage",
    unicode: "U+26A1",
    pubKeySlot1:
      "0427083c19e31d5883d6e36e26f8c19ddca5caba105e42fb6a7a6acf90dd8190f0ee09996fb619992c77f067c0d98255362dc650abdc7a5bb8b79b5cc3b1002bc9",
    pubKeySlot2:
      "049dd63d6db68fec353c02f05e5a7cce4879bf4ab068104d703c07deda5cb0a752ac63bb752682c4c1dcf69b392abad2c8e0c636b85587223430e6e6c09fe612d3",
    pubKeyJub:
      "0422a3548b68831dbb8294484445a2d0aeaff8d031ed5f19157ac6917042716873091c06cb331275892378444abd05309f4ba158fd96f016b0e3e82d44904a23b8",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/high%20voltage-7E9ilVlZuxTqjd611PinAxLOcN4xSt",
  },
  {
    category: "applications",
    emoji: "🧈",
    cardName: "butter",
    unicode: "U+1F9C8",
    pubKeySlot1:
      "04a759a8da273559b22b81715261f1e354ca06538421feaf21280558f42e451bb860429d60392139eb041c82db5f3f150f785a5d1bd14a1804689c2689bbaf3d5f",
    pubKeySlot2:
      "0408ee03f051968d4e0256574ab8c57ead7b88b0b2d29c365b525903ad9ff20205418c09791cd9b828d87eb5e71fa82050efdd1a9e16b7f621d96864902e6835e9",
    pubKeyJub:
      "040e1f4683954afdc91f3f39d88cb1397a2ff58d7ca8855ddab75c8deada4139891137754cfccb9eb0146fb7580552476d125ae3d248f540f54c16330d193fadf4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/butter-KWkjO0LMugIKLUvnjG2z55x6vHbNty",
  },
  {
    category: "applications",
    emoji: "🐥",
    cardName: "hatching chick",
    unicode: "U+1F423",
    pubKeySlot1:
      "042348f0ee5d9e57d84a920ea3a18f7d2f731b69b791b50c12ae272c15113517ba8bdb97a8992344c89dfbc731644e83db7ccc37df10d920ca010232ab32f7a0b8",
    pubKeySlot2:
      "0474fb4475ef68a48fffab8de373d42021f02941c9354492e155338bca46633ae5187404097dbfe6321bffc22a359391dcdf24f139bd8a409e5880c07bf45c47e1",
    pubKeyJub:
      "041c58bc45a2a0733949dcf9509b0a20500028a3bd864938eb1bb8791a11f0753f25a2a74d4b7b672edcb36e5febb62db2ce85405125efbf3b541efa0a92a36d1d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hatching%20chick-hFyI6Ey7xnmFqXUOAOpGP0tFMLt3rH",
  },
  {
    category: "applications",
    emoji: "🎫",
    cardName: "ticket",
    unicode: "U+1F3AB",
    pubKeySlot1:
      "04a7c876a0b69b25e8c13acc070c89085ce5c8655b23bacc1a67bd3ed3bd88fb10ae90e006b1cf6c5236e615a6b924a38d6e1be7642564c969c49fe28f27c75390",
    pubKeySlot2:
      "043c26cb72ee344017dda441d49e5c20836574f89ef33cd6137ddb75a26cd2a90034374252c5763d58ed5bfb49807837a44d2bfca64f65960d9e9387571dd6e602",
    pubKeyJub:
      "040014e6bb573522319d5c6240a69631f433cffc37dc9dd868ab096b2e20318f971cef99966f619ee9977b737b14d90b9578250b01289869a3210111913618915a",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ticket-TVIRBQIWKl1JpS9hEwKBdbaKbcanLJ",
  },
  {
    category: "applications",
    emoji: "📒",
    cardName: "ledger",
    unicode: "U+1F4D2",
    pubKeySlot1:
      "04fbc54613c523123bb341baea6b11b3261c29333eaf6f2081a3ba9f30bd6c3f32d67a9b6dbd881f82b320642e08a60044cc24b8516e6ba5e1987c54c6d76e103a",
    pubKeySlot2:
      "041847c99fe4a4d9550fcebcd3b6988327f96d141f3f89ec9e784ae4019421c50eac72712f8543b9bece0d334d93adafcb71fc58c35611c40f97d08e599200cd68",
    pubKeyJub:
      "04286d0f5b91d18d1671505bae9a2bf40f21c89edfe62ddbfedff4043ab90fb37325aba55be15f6b1de3b477fa2d3993d0465c5cac75a87ebd4ba96b905650b376",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ledger-sx5HkFKi1wknm8ZdlKuwuTuQVXcRke",
  },
  {
    category: "privacy",
    emoji: "🌑",
    cardName: "new moon",
    unicode: "U+1F311",
    pubKeySlot1:
      "04ccbdd12250209acd6d9610519082f327ef442306b51203c6db2770d11788f0b1df656462deaeb49caaf37d7e92c1e49e18d87c7e10b14b072d6b68ba5341142d",
    pubKeySlot2:
      "043ba9881ed98092737498ba995208f007615a9d582b441c22a9855278876722ffc9677578788591501d28ca7785020d38a53cabff7cd6a514d5d841c6c32409a9",
    pubKeyJub:
      "0403c3232fd423fe1bc8775fc568d02695aaa69741b60e7d5167efc46d85dc59b52eb4839fb0783bcc96c796e2ed5cb2da9661bfad92c4d16c1714d65076e0570f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/new%20moon-KsYUcDZmVlDGTAojlUPuA7tDcZHU4S",
  },
  {
    category: "privacy",
    emoji: "🕳",
    cardName: "hole",
    unicode: "U+1F573",
    pubKeySlot1:
      "049c338dfd16911ad93f48d330df080d0f220e28b388b416b040493a479da02b2bff817a22dab278c75d403353c832ec991d1b4dd60b6fa6e6bfb124135b02e249",
    pubKeySlot2:
      "0478aea6a761ae50a5340c12575b57f5bbc28b978f4be785b5dfe33e797ee1cbb25ea8c26847fe43a186a666e533b65616df38ba3ad278406dc46b8f41007af17e",
    pubKeyJub:
      "040f17877f1f4a5e921186676d88c8ee652330f1dba1d63a4951fe30371d9b02a21789a436559e9d9f4df29f65f2c550afaeb8326520021138f0730ff0ff5be166",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hole-7KW1mvlqh8cb5NToAHgzPq31QyGgTO",
  },
  {
    category: "privacy",
    emoji: "🗝",
    cardName: "old key",
    unicode: "U+1F5DD",
    pubKeySlot1:
      "045dfc7cc036109c1ec3cac85514d2bcf8c95a489366e3907423f47537de020c92b464c996a14c85a9bf668403f40a7b2eb6f4229f7f76017faed737e589f53d22",
    pubKeySlot2:
      "042883b135bf421133d923af50d6b6403a4e3da04dfd30f0edf376f20eff77a035b7f351a1ea4256be2fe1200276919c1814cbb1f7ccb4a4b8db3b0a33de692490",
    pubKeyJub:
      "0400160c1ab412519808186bee0eab0f14702383190d1fe09b13811e5110d0fb272931090c0d61ade651e89d7d9f7f58baf3d049890f973139470d722e82288b35",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/old%20key-nz3zDROZUdSxawyLy8abzFngnxYmjA",
  },
  {
    category: "privacy",
    emoji: "♟",
    cardName: "chess pawn",
    unicode: "U+265F",
    pubKeySlot1:
      "04786d536efa0efcaf45ec80d131ec74277490fc2c3763330453c2ec71dc9b1eb673ad6b242550fce9b536e58cf99598c2ed1a5b5c88b27959bffc785555c1785c",
    pubKeySlot2:
      "04cbe1e05636d705ebea8317734154466d804d827968bab98736a70208bb0ada26e5183bdcf14bbdc16a61781d3170a22cbb6b5a4789dae4ee9175710575993dad",
    pubKeyJub:
      "0404f09a15297630d080cd913743131bb75c890ac9a46609315b48694fe579e8a61e5ddc76bb7fcacdc3d6264721a6929c9109f5d104b71efbd4db2f96703f1528",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/chess%20pawn-7pTXe1QakWX7P6wTIATCue7rCCihgl",
  },
  {
    category: "privacy",
    emoji: "🎩",
    cardName: "top hat",
    unicode: "U+1F3A9",
    pubKeySlot1:
      "04a180e0445bc8fef97c0d5de860c303dbf6b38bd363f235f84f90d4d9e1dbe03184d3370c0544fcad32a621caf293fd32f6cafbc946b2b4c278cd824ea4b8e4f3",
    pubKeySlot2:
      "048f4040da85c905082849c20ff86c9b633527741975501a1d2d2fefc061bbcc79c9de81148ca80296e98e39b4dc7854a0352275002e654850459c5d42e2081889",
    pubKeyJub:
      "040403343bc04a603d96a44eb89862004a9b7af771b9f3cc7bf7929b13301366f31619e42dc8b13754c1c51de93a3d97a26b04896190eeb1f2846df7dc34507d98",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/top%20hat-ZpVqbyiOmoYqOymUvHEBTB5lz20XI6",
  },
  {
    category: "privacy",
    emoji: "🕶",
    cardName: "sunglasses",
    unicode: "U+1F576",
    pubKeySlot1:
      "042aa75937708daef43556223c5354e0d4fbcee19d4cd9c435987f60f08740de05b74e57b00a732e0dae256e9b4b59b3d9e20d6d8827a409bb55f5938c4fe8e50f",
    pubKeySlot2:
      "044d2fc1fcbc586822351884656ccecd30a7602bcf5bad48d0e037b49a6bace3f02bc4302ce87f3c45ca438ce0465a0190199e7bb32a4e822086698c2bdfe1a7c0",
    pubKeyJub:
      "0401b9a4d79f99286effee61171737fdedc4bd0a905c466dd554e733599d815b6b0f01cd12c84d15c7b53e2d17163906c445b824f1b2556655a18aaf9eba1d77e9",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sunglasses-aMKft98qQUAE71j887ufbqiqPSTJLe",
  },
  {
    category: "privacy",
    emoji: "🥷",
    cardName: "ninja",
    unicode: "U+1F977",
    pubKeySlot1:
      "049e602a0252811fa9d18847f1cf1db595328c3fb24f64782421c43c0d2c0a89cdecde5aa70db22c2b578e02ebf381f114f84cfbe58be38ec3be435a2a5a7bbd1e",
    pubKeySlot2:
      "048aaee0937c6247a9a62e59b25aa5226d2178478345854c26e385ac18133505050182dbc22e77b0a427e5b1ea3c60112d9a9b682e1b09be0173a7c06671fec130",
    pubKeyJub:
      "04264f311a5498adc80aa6047777781b9fa4e7b704a17a51913d5f59c254fce91a05cd217fa9be6ce7d88ddd9979769f8221f34cfe6b826ada72553ce0b1189083",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ninja-3QEarnJaj3I7nZR6Cip2wDzvPpIKcp",
  },
  {
    category: "privacy",
    emoji: "🕸",
    cardName: "spider web",
    unicode: "U+1F578",
    pubKeySlot1:
      "04cabacc270c3e3a62a8ec3a00f4ccb17821dddfee8e0b4418cef123881f591afbd5e4db561b50409d8aa0387c91dcebbae9c9ec223dc24a98aa4b894a989f0a4a",
    pubKeySlot2:
      "044f62f34984cb56432d6c4bcf881a374064e86411cdff2890ab33b5b2a872219e461d5773ba62e4aba0136d1219605309d3b531512eef905962ade22ff57afa5e",
    pubKeyJub:
      "042bab8cf2ca68ada266dc6cd428b0be57e9a924b23b0549aa5ceb89e1a34649f61d315fb5e8fb1565c9c0eec8bd7d940eda50efa1837e7dcbc8911208e6f2440d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/spider%20web-v8sQD12Zf5YKuv6YzhQ25V8nOdRT26",
  },
  {
    category: "privacy",
    emoji: "⛓",
    cardName: "chains",
    unicode: "U+26D3",
    pubKeySlot1:
      "04d83052de4d8a4cb5362ce1e85b8df91eeacf5b860b49fbd28f3e95efe80f9d4dce043394e456d1cd410ef3df77248f5f45f8a55e288cc34b40bedcb521e427d4",
    pubKeySlot2:
      "04eeea82b2587330fda686a972f61d8120d7db7f7193dffecc1a14bd28d42ec26f98c693c66b1a2d0444953e689d40dee07451d2134d74f29470628ab8d3ada286",
    pubKeyJub:
      "0428a8555ae44ae2619d2d0cfaef7fa239d2302b766546f86cd265c66f1b0e616822d864d46f91b705cd5edd8ec391e9e8c6ca810b3be2492a2f19ef43279536a4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/chains-nH1s8v3uWy1B53Wt21QkI0u3SL0enD",
  },
  {
    category: "privacy",
    emoji: "🦇",
    cardName: "bat",
    unicode: "U+1F987",
    pubKeySlot1:
      "04485521bead936799ddc548e0cfab6ad510d20b702769501c3f2bd4fc8df8519721be313253a9d6d14b2fb1a9e363acffbca1f19dfc55f49d35fd753d98aa177f",
    pubKeySlot2:
      "04612ba174dd7f87b5ae77cc3a765089e89f307becf6f1805b7ed3f65e8d774e5d9f0c82336ba429115dc52f87c5a15de366886d5d9c77ea29db3ecc1eaa5accc3",
    pubKeyJub:
      "042a5b7b27eb6d272a363e0925f0979e891c4e758379b5d28bbf23c6abf0464f410c74b569a86e53999f9a1c35051492d7dcf618bf2341de972f36a4cb06363e2d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bat-ib9lHQ6MEUjiAXhq1JQSCJkmQDTtUZ",
  },
  {
    category: "privacy",
    emoji: "♣️",
    cardName: "club suit",
    unicode: "U+2663",
    pubKeySlot1:
      "04833a1f58099fbbaade0eeedc3035f6496715dc58ce48fb7717be298bcd6a4aa2a84eafe4556ce67ed38a364dba6d6191ba5c2edb79704aec43215d6adbd639d8",
    pubKeySlot2:
      "041ea788bbff968a38b7ebbfec4676d59ca64806325301c598a711bad84b1793e3d89479c2e770b8553f69bbda3f5f94183d033ed82d595d1c875e648bbad86ec8",
    pubKeyJub:
      "04081a6a3b7b3fe30c738cfe452ebecb660f7af6dd487574847343e7f2ab20f182294b512ea3fd3102326229435a5499fd2f11b1a0bd7fb0ca2d68802f14fa6f6f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/club%20suit-dBntNhfdr8f8f8iXws8bmGF2DIZ6Kz",
  },
  {
    category: "privacy",
    emoji: "🦓",
    cardName: "zebra",
    unicode: "U+1F993",
    pubKeySlot1:
      "04e2177b6bcc12588d318f499300f21ff88fd08818e378edd6c897e431206ef61e304e16756ea5f5e451938848b1d620ce4189a347d59f7004ef165e68347e3a84",
    pubKeySlot2:
      "042b11e0edbc91d346122dde7dd9f53c188940518a64980490f8f2a6fc28ffbe537c5625a5117285b79611ebecf32a94e1f3f5bd87101a4f7b51227d90b5a21826",
    pubKeyJub:
      "040a78511c93f6ebaae0e38d13ed0889952151fb857c6e10db67d8eba3257a71392b6579f3651ff84ea7f63dc5e8d0e6e59781b97657b8d388c4b754b37b3b5e0b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/zebra-GaHlR0sIy2GG73fvagJJGIrFJcs23K",
  },
  {
    category: "dev tools",
    emoji: "🔨",
    cardName: "hammer",
    unicode: "U+1F528",
    pubKeySlot1:
      "04a742a61009757e11d3836d57f35a2989b07b4d8d7926a11ee50c96880a2f07e8fa83c9098fc839600fa54a7dbd3ecb8d2fd397575e78c4b5b68e72436053a231",
    pubKeySlot2:
      "04ee7d2ceedc6e737548435052cdb7c018bd7cfd7ed75fe8f0ccad4ab4779520660c4ff7a87ec0e1e27d86d7c6f610b64e3638158673091b3eca7b07d7ccdccdb9",
    pubKeyJub:
      "0429aa8e5b4b502d380afc91a7881cc3a101a0779c748cbf43c7ce45f8548a644d17cc4ebcb06727f7e8d492a7c0865f013a9bf9e1fe5711e0c59b920545f36da5",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hammer-mfK9FMpox69Yjs2J5kdQTeUkIw3h5s",
  },
  {
    category: "dev tools",
    emoji: "🐏",
    cardName: "ram",
    unicode: "U+1F40F",
    pubKeySlot1:
      "04e3a716c49c52068ab5c9e6c9f33575c5eae6817dbb69eee5590660dbb13309665f81067972cec0dda4ebcaa33c6833a32ad54452631106670289a305f485ae52",
    pubKeySlot2:
      "0460671d119c927274de02f54dd07810a95e3b2cf4d5b0ba8549ed273731dd44fc74ba3271a2de431244b86d231af7a1500301b00e6b2a4522de19053f01acc0dd",
    pubKeyJub:
      "0401d7f374b1fd69a0c858145243d374c548ad612a4538692d67370a268ea0b24300e0151a8f2e99fb64ad196c959f8182a10e272f323c44baea75bc6b06c0118c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ram-gsBMZL24ygMzbqONUBDa4oVbC4gU4V",
  },
  {
    category: "dev tools",
    emoji: "🔧",
    cardName: "wrench",
    unicode: "U+1F527",
    pubKeySlot1:
      "048cc44017de22f9828a8b4a441f2653ac2dccfbff69f2c1768d91db62b371008d4bf575a93c7d50ca415b0fde08552df810a3bea64b181cdd155240ce08b45971",
    pubKeySlot2:
      "04d3236080197450fccac3de0d5f5ca3c3bb06a9a951158c053fef82039a2b9e4263464cc326a0bd8ac26102d7d94063d9b6c148238cdd921bd0cbda80ffab3263",
    pubKeyJub:
      "0416b4d4f631ceef5c6ca0cf9e9d65f07f692ad202e0fe30da5776b20a9287549c0f848702a5fdba87aabb3488e351476caa8d06669326b0552ae3eedc1aab4189",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/wrench-1WCYzu0P3a9djGe9jm9yaz8ortnz3t",
  },
  {
    category: "dev tools",
    emoji: "📉",
    cardName: "chart decreasing",
    unicode: "U+1F4C9",
    pubKeySlot1:
      "04cb2a020dc753fe51580a8914f3430bf014da91ae66cc69b2581c29f97441abd115b732e7e0b0465a5fcaa383bd50d14e371b079c52429ac7c927c8d9c6705515",
    pubKeySlot2:
      "04117eeea6d696bcd098d2f18359e806c1d8bc8ede80c17febad11db88c98b670e28cd7ee741ddfaea6174ab403fd885c1c8e1b58a092ac4d36758c437a5d9d2e1",
    pubKeyJub:
      "0403a3bf364825e32af785d1691bd4248e39457090955ea2fff4e2e6ec1f7372b2271bcf23718d930ef8a21c22876487989eda2c2a64740910ec237ef9d100e62c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/chart%20decreasing-D9SC9dHC5lb8WOSP9FgKJJkTB6ijpt",
  },
  {
    category: "dev tools",
    emoji: "📩",
    cardName: "envelope with arrow",
    unicode: "U+1F4E9",
    pubKeySlot1:
      "04bc9413e98134ac6358a940cbe53e03e8db0c59ebee04fd036fc7271dd5760d019d85ea92752b503a95e2e1cec699b0f14d95f5d89705687935376b67c680317d",
    pubKeySlot2:
      "04cb67f8efa2faf19650751f0c68dd70d8513d7d6b204ea9beec182541f983ca94f8540cbb25314f1b422ad39082adcb4367cf638c8f87b9e6ce86678a5af82c25",
    pubKeyJub:
      "0415bc55f3587f871e5daf783ed2901d29f7e903abc6236a6a94b0134459b781f80313c706f73d4cf0ca855848e67b5cb9926b7b73b025ff81ac4f7c517dff3fad",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/envelope%20with%20arrow-eJvzQV7boLLGTvtcWezplJt7agKOyE",
  },
  {
    category: "dev tools",
    emoji: "🖱️",
    cardName: "computer mouse",
    unicode: "U+1F5B1",
    pubKeySlot1:
      "04eb55eea58d006a9cb0304f526052163c28bd593993ce556787928f0c4f0c127083c7e08be0ccf0554f74f905ed128ddb7f1ec70ba7715d47b80b27cfcdd00b9c",
    pubKeySlot2:
      "045390378bef6a0757d060090014a0237c406f04c054659df7ee1c419022b50bfffe6d670863471a02168edb61e1637d717d57ddf9a921f2b408f961ee8a1fe941",
    pubKeyJub:
      "0412425cb153a452e68ffaa438fd5bb3e2018736b1f115a103120462e64679a8de29952b44f5de2d18f82e6afe44c5d32bcfade7d9d8861454b602c4901b8f0a08",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/computer%20mouse-UNarx73ky72Vy2aH4FuShWKpgdOwD7",
  },
  {
    category: "dev tools",
    emoji: "⛏",
    cardName: "pick",
    unicode: "U+26CF",
    pubKeySlot1:
      "0412bf26877d533041bda8b6fefd32104ef2b4344dd42c16661539c55f19f750cee61d84bf4a0d367cac67d31c9d30125e65bdbd3acd93452bc35e5131cb3e1276",
    pubKeySlot2:
      "04bd9a8ab90973b60ab108d9495a3050eb4d607856f821e3dd13bc5d2d93b60748acfe229982aa9f5c161df0045b10def92b2ce51c2b6c96761791a3499f8b4322",
    pubKeyJub:
      "0423ef9e0f972f71c1d879a3a3c913be3944c07df9577c0100e2790748f469ea721d5f2ae14f01c53d2bd7975cde06b5fcd9f89141444e2a0b3f83747dfe03812d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/pick-wiBwYi9P2hv2VVIgIFV4tRkXbrqwf7",
  },
  {
    category: "dev tools",
    emoji: "✂️",
    cardName: "scissors",
    unicode: "U+2702",
    pubKeySlot1:
      "042c0a9f8f64b6e6e795416d0f144ca47e3c53401be3da7e299798e0ba9ff4928e3e814a80ad975ee0d454d1a3f5125239cd98959f51bf8659e69b45bd9e9df4eb",
    pubKeySlot2:
      "0400f63bcbdbb7360b0e69351636aa8713adfe44f9409e985c6178c6f79c196d61ad8ba0033c4ee8f650810ca8937b3b76ccc995c2f530e6b105335ba2083f7190",
    pubKeyJub:
      "04203f83aebb1385060e098946516a049d1667a2d751fecfa1f4a8f0327ad3c29d18eb09bc05401e7f4c6fb8faeab09f2750299d531201ea55cb300d35345f4ab4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/scissors-o74Yx1iHlFZ3Ywpazz1Ppd1e1928ck",
  },
  {
    category: "dev tools",
    emoji: "👓",
    cardName: "glasses",
    unicode: "U+1F453",
    pubKeySlot1:
      "04983d90306b81bf80cdac43d8cea50246b528ce970578ad503c6228c7cb06f53ace011b20178b88d37036e97575d58b83d1bb9a3cd1f190e3cb9324122a205e68",
    pubKeySlot2:
      "0443e72f07023a5d2c7fd9be691b940ca4bb02a77dd579704f1f98addfe74a83007dc1da5001508b42f2a466da85930a1f5686c1af550c38737eb2b68c9137ad59",
    pubKeyJub:
      "0415ee4086dccaaaeb428fb6d507a297e76ba70ba62d892818b8a5c98e531435dd2075b7f01e18c16bb20f801712d74f2c56e34fd1ee584fef53b5df228a2c116e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/glasses-qA6RuxAPJSdUWjA9GHXA4lcUWeRPvl",
  },
  {
    category: "dev tools",
    emoji: "🪚",
    cardName: "carpentry saw",
    unicode: "U+1FA9A",
    pubKeySlot1:
      "042329e4d90ad9cd80deeb3b550e88008a9dfc1e0e24cebbc27b38e1577ec8b2b6bea20d7f9f501d195b8bfa9414118a64828f61bc22f21e83ab6685694484244f",
    pubKeySlot2:
      "049b83b3c658f7f55f606a43262a3db2a08b3e3247d1c0c38178fb1419d0b533cb7c94c1256d1f231bd6b01c550f606196b4381724ec71ec1fa04c2fcefee18d0e",
    pubKeyJub:
      "041706b36f20b2d9b202e330c5d2f2ce4f6c8e5d9f7b000076fb4077ce965eacab14e92ea88810b5f9ce29d7b65762b6a28528f5c6086f9aa35844cdbc2c56f7f6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/carpentry%20saw-sDu6PdG7hldVAwx5wSNAWqpPeLmlak",
  },
  {
    category: "dev tools",
    emoji: "🎲",
    cardName: "game die",
    unicode: "U+1F3B2",
    pubKeySlot1:
      "048e3931d1f6e7e9f1d806de9af460858a20913359c027126851777aa27583de1c15c4857e244458e651911b92c4bdbbf313453ed6224b9701255321fd38638406",
    pubKeySlot2:
      "04819bf126260a3dccded9f1263b2edc8a1caa8db6da885ed5ccf315843f021ab7f4ec2734d21d947a8326bfdeeb5825b6a591316e1642644f358abc088cb60bfb",
    pubKeyJub:
      "042c5470375327d03c0be259d5304b8eff62cc7a67ab5181ad4158e04893e6b1bb0da4725f2a8d0e0ccfee2afb3ed958cd4431911ef91e6e26661a296ee7243f98",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/game%20die-3VuNytFhPb7jRuj3bWbYzRXVK4LcRS",
  },
  {
    category: "dev tools",
    emoji: "🪡",
    cardName: "sewing needle",
    unicode: "U+1FAA1",
    pubKeySlot1:
      "04426d93f2d033f0054ba590e763f1b98f7973fe9bb67a25a2d991cb018a21e3a25e38fe021b257374ad548200310af584b515084592d10848b6e6919ea3e0cf7d",
    pubKeySlot2:
      "046574500cfad176924e011322b91f46fe26c39cb10a660331a9c88edff741f1d88f7ea605549cc32298e77e614773f7513a2758e0f311b17c41fc14e80a83faf6",
    pubKeyJub:
      "04000b411e9d25ea493a9d0f877c34f818558103c76e1225a376da9557d38163e6058f2a71fbd990fbd3154eb39f747191ee0461400c3dd0f70c81206d9761e260",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sewing%20needle-Sjhz9SkJSWGm8KCkk59GquP3gKRNw4",
  },
  {
    category: "roles community builder",
    emoji: "🐠",
    cardName: "tropical fish",
    unicode: "U+1F420",
    pubKeySlot1:
      "042d75c91524b66aaec1f2ec6a4b417b210df1b35a9033b2fd75c14b3822b7a38080861b85c9734e23964878117084ebbfcc79be418dbcb07c47d20a200cc140bb",
    pubKeySlot2:
      "0448abffb76d23142cba5416f7b79c6cc3747bb21200f2badf1e7eb3a61b7a45fe52fece4fe6b437c0f6fc1f732f9a7545cb2e517f0aad5db63df20f61bad3edca",
    pubKeyJub:
      "04062f916166291ec08ae382f78a8d3f2ea8daa881a2cf7725fff67e98a68ef2230bced292eaf7c27b367b39a09c0d8b36c84c097ab844dc23e189472200924f44",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/tropical%20fish-YTANqLRIQ8X3rnvU2LHHNV0UpCsevz",
  },
  {
    category: "roles local explorer",
    emoji: "🐈",
    cardName: "cat",
    unicode: "U+1F408",
    pubKeySlot1:
      "04b8ca961f9c8e89cf24fef5108b269dcf5c82b990c6dc89a7e2dc82f13e2836a8b92877291df518ca8b734f4d3830a82bb2267529062769370bd87c8d34d52a49",
    pubKeySlot2:
      "04e07bf768bbaaa09644f263e16cd15d59f873853d002d1f980c49125f370b832c2e4d65993647234f5a3bbc6e14bd2eb17c43082ff8f99e1e88bfa510082a5c10",
    pubKeyJub:
      "041adc1e8f69813b79e63af1e2d42d4e71495a8ee584023bec71129f3d8c4fff290dda03e9f906cb6e9a08db541324e4c2d5f5da87f51749936a497ed8a900564b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cat-yF6k0ZcLUnv0r251zlboqol4ajhjpH",
  },
  {
    category: "roles social butterfly",
    emoji: "🦋",
    cardName: "butterfly",
    unicode: "U+1F98B",
    pubKeySlot1:
      "046bebef2a8fb84d244c8636ef83568d97e8ab5338d7850556a62fa66366bbb0cefefb05080783caa5cfe7eec34cb36f7869728b4da7e4a3d7aa4dbd6bc739d302",
    pubKeySlot2:
      "04512c1b0cae2d0acba2543ac3774cb0ed1da299e8c47835cb253e3207d768fb8fc92099de46fc66fe9562230084df5288e2cd184afc5d4ce6daaa2da60c38650c",
    pubKeyJub:
      "041d05f4e227f1fcd5bd0d795aa049a5568f019bf6edcde3307ec885edfb1521a22ac7a156f996e7cda0a4493fdab7325198d21dd0be986076845b2ed7b4a05af1",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/butterfly-PTmwc9HpMhsuq9iKD6vOiDE1rmDKpB",
  },
  {
    category: "roles investor",
    emoji: "🐂",
    cardName: "ox",
    unicode: "U+1F402",
    pubKeySlot1:
      "04265abc5dab5de0f40b39adf31ade522662d24780b294c37a12f8d00b8572125aacbb8548927068f33581dc2a00ad57f137677b1ed94ae6b464d848d0579f7059",
    pubKeySlot2:
      "04c4bd1cf7be5f3d9e57fefa31e17c44fe122892732c636abf20281d3c25840e9114f05367e09bc11e0c68c54c9168bbbf082f42b5746af2eb0a123fe9fdd3c12a",
    pubKeyJub:
      "041659e9d3f7448e6df73c0a4dc630792fd68d721c82b4395c12379f727b59033801827f129011fdcb0ecc1d94726abefbb4d8d9b14a6309b6a26d081327efbe5d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ox-vS3lHDnWpUm0e5PuwgRPBneoq7wb3I",
  },
  {
    category: "roles organizer",
    emoji: "🐝",
    cardName: "honeybee",
    unicode: "U+1F41D",
    pubKeySlot1:
      "04460f57602e22e83cc1d7329517012ab41b74a24f0c23ecd00fd8736dafca7a253cda5173d8ada81bc16ab5edacb328e677122cc04b0de3fcc58f7a6404427914",
    pubKeySlot2:
      "04a4fb550d73a1279fbf5f7fa104bc53e68f8cf86edef89945c33874679c1877224253c7c3d32c5ee091a0a2a23e3c8138c98eee2e45bcc1a7a95bb7f3c508f51b",
    pubKeyJub:
      "04272221f7be309b97f8d876c7e36d2bbe816852b791e1aaffa76e6f8a08f345752904e5452060e07a9b1c519a5bc1ab653ab0d55539b6c1c764ad7eabc4421682",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/honeybee-uHEx7gT6fLi2zfmzfD4knrm0i69aQ6",
  },
  {
    category: "roles learner",
    emoji: "🐢",
    cardName: "turtle",
    unicode: "U+1F422",
    pubKeySlot1:
      "0411298f213485e0d4ef910577410a0676ec2d33fb8e692fb81226bc70ec919d64e59f9d71d18078896b5209d188b3b671acb6af807b7622881c3ea5987489df00",
    pubKeySlot2:
      "0436ace0d0481487b5d2eb908cc4a10cc61edf0184aca2a50f09f9302eccd137104f3a26e135b6ef3742a3a9b44f1b852b545878ea9007f664bd7e2aa88e76dca7",
    pubKeyJub:
      "04002b06a9edeca00186aeb4379af8d4c241b7755b6c0f9e467e75536e06009f9d0e945fb6521a9119f2d0fad3e25e73525d64a622e5cbeea828d248257a20c0f0",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/turtle-9JhGvEn5ExKQWCSoHIeop26okZzUJo",
  },
  {
    category: "roles builder",
    emoji: "🦫",
    cardName: "beaver",
    unicode: "U+1F9AB",
    pubKeySlot1:
      "042a53a473710dee6348ac8d20d01d303abc8b25e8afe624ff084754a6ac69cc0b94cfb6c845745447523f5cb037ae942bec748f72154fee0dc18a3d0b5b903d9d",
    pubKeySlot2:
      "049f190d861777685bc887ac752eb678da456927ed01726221fd18070048840432f92cce5ae1fc60f01f60bb8d9e21b76b804da7cc335b4dc12f6b530b7e5aae47",
    pubKeyJub:
      "0423c3b0e3a553bb5d8c6555550b40f38c51d50ab542759a984b5db1321bb3ec3a24de46bd07e00e1c079067277ee26b17551fa500388e965fd5ebf07253e4c462",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/beaver-pcKgK56Rk3LDiUCqr58zDSd3GHhm7L",
  },
  {
    category: "roles designer",
    emoji: "🕷",
    cardName: "spider",
    unicode: "U+1F577",
    pubKeySlot1:
      "047a920c02b509585fa1460043e5d5a46514c35a216aa94cbfb2faa6c768257861c44847aca235f1391758a455061f1822c3ba37dc292cabd85a4170ccd4597e85",
    pubKeySlot2:
      "04f24934d777d8239f4ccf19ab7247899a9ed7a9a5b8cffe54b338f7bf55344d87274f2e64a059a8fe9e5debfddbe457d72934923f7a46c11570a431ecc6129d3a",
    pubKeyJub:
      "041c79e3054304b264cae2fc93a4702ea726365aa18f352deef98ee680f936eec52635a89a25a2fa490825d0a4de330febae5bd8676a732a8338211482b0647a59",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/spider-qKAWDxrUOlTxfp6PzgBru1Ofo7YLtS",
  },
  {
    category: "personal",
    emoji: "🦧",
    cardName: "orangutan",
    unicode: "U+1F9A7",
    pubKeySlot1:
      "04ec6e5a414c627f36e55f415671546d939b36a655efcfaa5e6ecb496e62ecbc8544ac43a7187c91332e76b022b3ec2e2ae1dee3dea22bcf39fd52508c4d9cd63f",
    pubKeySlot2:
      "04c3946edffbada2a72a4ea5e0b668545507cdbf5c750a14f644ccb4dc137bd3ff52d84e8947b50a096ae015ef53fcd62015fb29ba8ced63f53432b009e62e57b1",
    pubKeyJub:
      "041a933390f54679efc69aba51cf8578768ec565e5e4857b0badc911dd74707266124f09f1ffe270123d4ccf2fd956d4fbbbdf5b2799727aec8ad1dc34c9a36683",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/orangutan-yJDEAZiEBDwwvND01KuvDVWvYqA962",
  },
  {
    category: "personal",
    emoji: "⏳",
    cardName: "hourglass not done",
    unicode: "U+23F3",
    pubKeySlot1:
      "04feb8f75609326afd55b1f63a802ad3e719886531762f327d48a1a8b607735d033b46f46ec921478c050b7aae0d6ff98464150cba5cf0befa8dd2cf854a2ad441",
    pubKeySlot2:
      "04da7bceb2e081d64093b8d28ef131a7fc9f5729f6ef3730414a36975d2cea98c4ccef898fe1a4fa11b6d8d5630c51355bc2d711d17eb2da0351f3c409d58d631e",
    pubKeyJub:
      "04231f1bb84d45a1b1cea13c6253f133aea182c78ce49801dd97edc16c5d1d35122c52864fc57fff592d227da69f86f1d4abada9132256361d20ff3999192f43d2",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hourglass%20not%20done-ly2LgzCm2OeHt87qyRjFSofjbtljc0",
  },
  {
    category: "personal",
    emoji: "☂️",
    cardName: "umbrella",
    unicode: "U+2602",
    pubKeySlot1:
      "04f5eadd3b30828560a9574a7d7bd3f6e2d881860ec134b91084cdd1d026ec75e984bc495303891b50a190ca5308bb18875f33832573909e78a9d8469522e34a25",
    pubKeySlot2:
      "04398d82d685374caa2a663a36c1954dddec2232f7f8196248a48babd9869ae375a83312a3753541d3be5bfc32ec5d4c6bbf907a1f294fd14c6769bf180a691acf",
    pubKeyJub:
      "042606dc24ddba71edd6193b41194d42ac8120a5fda25de8b0d3d343c4197129e110974448f8646b94e08c529787704cd3a44f2919f0ef32e6516dbe36e5fc9f6e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/umbrella-dK89HYielIM2JonHjdBerJrnKCjQ7I",
  },
  {
    category: "personal",
    emoji: "☕️",
    cardName: "hot beverage",
    unicode: "U+2615",
    pubKeySlot1:
      "04897ea8ed95f17af87d21b2eb738d5d440b7a4e6c0c18bafcfad2dc53986a816cc75fd0b8b5f98d2521e561e779a449b4409b42f3c820c795b5affa7f76d166aa",
    pubKeySlot2:
      "0447587b00bb8b22406618624c9d5b6a6eaed107c0ec7d2948d1a823478a6de303344d576566b27af22e0c37b495c7226c547aac08d9cdd2733b02a8d3d578c783",
    pubKeyJub:
      "040f32a1573bd0ee79be924d65dc205840292ace8d5b38861e813c19b8876122eb0b7f60e1740c6e817fadbb3ef07076b85ca8bc065843cb3cd61395d021ad6235",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hot%20beverage-5UocvytenMWSwcczGwXQCMSIrMx3H0",
  },
  {
    category: "personal",
    emoji: "☹️",
    cardName: "frowning face",
    unicode: "U+2639",
    pubKeySlot1:
      "04b41173115e49f7e7b909c6282bc65861d233a13863b7159f0cea3f07ff436e516737814e915bee339e33939dd8761ea5b597057c532e513985d20d64a4a47383",
    pubKeySlot2:
      "046ed0ac2aeb015c9af19d79e1ff5d9fdcc014787099fe861ad8fb13afb836855373c02e929d1b1edd9510943e97c21987f76d7e387c6a7799c14b7e9e81f90524",
    pubKeyJub:
      "040480af87b7958bcc63ddfd14a01b9cfcf7d649143c197aafdec77a85eaa1aeca1043e469f989f21aae5ae0ea4eba03a5a59f2289d407975d79d11604762dd45b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/frowning%20face-3sKOhS0Fk9A1W5dyyvr7AlNlvfsBtg",
  },
  {
    category: "personal",
    emoji: "♠️",
    cardName: "spade suit",
    unicode: "U+2660",
    pubKeySlot1:
      "04aec3772faef702620adf1a7d0fa3679d4452618471cc9d0477c45abbd66b4ed2a57d934731e3eaaef15822291a476686f38e586931b52c277b9fc2c13d768845",
    pubKeySlot2:
      "04a69f13bb368e363b29aeb5eca48ff42be65599c6e719a60e46bf2d22e235aeff68e4a82f39b5e9cc62578e9fa4a03b5919f931c49eb8c97caa7012331b61c83d",
    pubKeyJub:
      "041d15bd1a038807b77768cc97a841eb12e3e58cd648af1ad74910f78e1d3b50aa2eecd95d2014bfcdfb60c04d6b4aaff97a91792d7ac76167b6fb8f9f2e261298",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/spade%20suit-8wkofJ5vdC990PiFK0WAvgWjl12npN",
  },
  {
    category: "personal",
    emoji: "⚰️",
    cardName: "coffin",
    unicode: "U+26B0",
    pubKeySlot1:
      "048cf35aa7a16d6d236d9951ff14043fe6606b324c72656b1f42c0d8c70bf78ffceca4c8dd04acaada6583879dea9f938d2daa71c84df207950123d44c3137f414",
    pubKeySlot2:
      "044022d9c50c0a86598d5a63b684a187c37bcc05ea1663007fef04ea1392cb7ccec1fc0b474d1a80c4683a9580d8a85b05f117980c4a62893d299c61692d5a9c67",
    pubKeyJub:
      "040a8696b0a50d4ab6142efae819a7bf07884aa5919c740942a8129e556db5a00e1f92f8c0eda29b896b4ef66de3997992eb9f0264ab4c94e8976752e1705e1216",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/coffin-aZm5UF7DpjyHAH08yeCdjeYQtq9w5x",
  },
  {
    category: "personal",
    emoji: "⚾",
    cardName: "baseball",
    unicode: "U+26BE",
    pubKeySlot1:
      "04473d98fca3553871d498daba1f210a832b7404a630e424d61b805b6b7302815c102cfdc492495936ff8672770ccefe0e75153b6575e73dd618e8997d6fda5b0a",
    pubKeySlot2:
      "0414d74cf92f6c30dc8fe7e13b568300662e2df4073a2f8d60683c54e84d5e62c94aab4aa6cecea6d622981dd62de9d42b832ad80926c2ac0616b4dd551a3c2e7a",
    pubKeyJub:
      "040d24a9f5a38f1dee5febf0170460542079e764070838b2acca0c8589fcb139d91d72ca56dd5853195699ae1d6ccefb22c1999d8bc2eda2632008a1a8aa0a37b9",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/baseball-7vh8kOQ6U5Rlm7ALVCI25Yd5X3bXBf",
  },
  {
    category: "personal",
    emoji: "⛵️",
    cardName: "sailboat",
    unicode: "U+26F5",
    pubKeySlot1:
      "0427b03ce139282b55e8c39f52d64c7d123d0e1553fc0f0e732fdb471bb539ede7ee2b31771bc21ed98f4c4109a21a3d9e0360e7952e887786112c7930ce34ffa4",
    pubKeySlot2:
      "040dd9e37db7df3ad9ce88322005c1ebfd2b937f819a3e322a4904f85ffb5b660d88b0f2728d18cff125c3fe3c6f31c77e2b1ceb2f5aedf9048921e727bf1c91a4",
    pubKeyJub:
      "04118c786e98ca2e0bb3b776da1bcff11d732dc91ef4bb1128bc998a1c38ab0a8727c1d33db50881a30ef89b4932ac0b46cd27e4fd11d82167e689c5b46857e2dd",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sailboat-zjouy2jboOVsXExg8YVfUfH3oiknbP",
  },
  {
    category: "personal",
    emoji: "✌️",
    cardName: "victory hand",
    unicode: "U+270C",
    pubKeySlot1:
      "04d7deba0d95179dfbd0a15b8013c2fae2e5ee3ee462babb68e40e887ca2853d7e00d0c03e469900cf80e7999887157e97b1840b8b3dc8b3d213415e13b9f01e76",
    pubKeySlot2:
      "04039195a0b667b3f38b8734036935efd9a6cb32dbb7031c914e3117a3daed2b480d788cc69d7e14e8bd477235149899b97ce941eea15bc65e7b401e4742191ae8",
    pubKeyJub:
      "04076e3ae05bd1bac1a0564b791b502ad7aad1ff2974024472b01daa0caa7859970e6cd7ec85abd27e23a3894a44894bdd96863efb366611295019ebb1fb8f2ce2",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/victory%20hand-MWE6eTopFSSW0kPSDQ9sjbWgcKfhmI",
  },
  {
    category: "personal",
    emoji: "✍️",
    cardName: "writing hand",
    unicode: "U+270D",
    pubKeySlot1:
      "04fec53faa1bf32351f9077d8fc2c5e776cd07e53c767726bbffcd61741f582ed80af93bbe17d44d890107866ea13014bda2101ccfb8dc09e3fef7c28de1344cb0",
    pubKeySlot2:
      "043926667ac8418bdba4ff098f60bb220b9eafefb3c43309c5f63bc5e51f068bb3cc436a4f6253d0c07c15b600352db76269ae82fde9439a9da9d4439ae214f15c",
    pubKeyJub:
      "0427c802fd8947748ee4d8d1632c0c641d0eb28ade8beb8a4ee72f7c0fd7a1c02e10dc014d1d47aee422a1bfdf9694f8af8ad64f3bb52071b8c229f2ac6b4d23c5",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/writing%20hand-vBda7SHETDHdi4uW6xgOqxsTGH0jfa",
  },
  {
    category: "personal",
    emoji: "❌",
    cardName: "cross mark",
    unicode: "U+274C",
    pubKeySlot1:
      "04ca8014794d5b9ef3ea7257dd6703d5264a5f80aaa718bd47237702d74c6a7057518330c98302d046b837f54e7ddedc485e074215ba5c6fea7e9e3294199a3af3",
    pubKeySlot2:
      "04f90905a51c81560cefb1fe5aba01143a7c15689ca5d4516115a32766fde2752d4e7fa7b929e9aacaae7fa8e7ae2a4cadef933c3828ac8d2f0625bca03623655d",
    pubKeyJub:
      "04046a119e43078a5558df7b2b04d18530de7eb6ec55dbff3140e81a37b7c1a45b069714c1ec91e1b27a559aa693536fcdbd65428ccb4bcaa7c15f21f47fd57d58",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cross%20mark-pUjAD7J8voe4T5g03PVXPvJQtREIqB",
  },
  {
    category: "personal",
    emoji: "🃏",
    cardName: "joker",
    unicode: "U+1F0CF",
    pubKeySlot1:
      "04094b7002abf3663f13d30c64b07202d44db774a5312108960a50e4ed138ff6dbe9bed9c167e26c9060f6d4ddd66b08691634fe09cdc4e8ad4bafecb1fbcfdf66",
    pubKeySlot2:
      "043d9036e0df8d7c6087f1d6c9487f3734b874bce627ab50c1cd3c2fbe4413cae23886e418c81e9440dcebfd71af864d8dfaaa2a424f37a2d72c707a26de383bad",
    pubKeyJub:
      "0400a5faaa25f30fbb78ceb68594a742318357fd4696e23fdfeb2717670a458e311a887c828bac53d95b2cb6522ec520e86800b9b1d00cac0e31d0a3f5fcf43506",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/joker-Bxa7i0oi2CX3DVcyOB3A8651Sua3xJ",
  },
  {
    category: "personal",
    emoji: "🌅",
    cardName: "sunrise",
    unicode: "U+1F305",
    pubKeySlot1:
      "04de0631dddc317f800797d19e8b554b241f22864fc4bd71552adb892d54b974e533a446855109d156c9b31b696f6bb456ae6f6c85697858db501a81c02620eff9",
    pubKeySlot2:
      "044c66212b54fb1977edc5c477d41948883c6ec2d5b3535ed0ec8c558e4209590c8eccf030f6169d968dcaf9646c3964b97d213d28fc4e5a0f9b997bd61f7d7ab4",
    pubKeyJub:
      "041e798c39b8b2d45b96a05254644c53e1709d4ab6481a97f3fa240839f41fc0300c052a1a59d2d56c1297a556bab8eb432648623fb3eef89d0d71728256edbf95",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sunrise-cnTx5xVlK915ROMmF7scV3Lcw5R5En",
  },
  {
    category: "personal",
    emoji: "🌈",
    cardName: "rainbow",
    unicode: "U+1F308",
    pubKeySlot1:
      "04b9a7739878bb660a66a569080bb3c4a46411c5bbe7dca0a5b13aca122f63eaa6b8ac35c1b14442afebb11afefd25851977d57f5d84e197b0a38c57a92d71a68e",
    pubKeySlot2:
      "04c4adaa71eb50462370a94e17b5e48368f7da9550468e3f1d8b046eb40f342855bd019d00be37d5f9dbf231d666a3aca5e3c95a74635062d9752389c6ce374a4a",
    pubKeyJub:
      "042c9ffcd864858e2a43a4de0571d995d02ce8b3435641b12695b11cd17c839cad2c4cc365d215a5974b2eec41335fe353a16c6d723138c0dd8246d7f1e855de45",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/rainbow-xzrztzlAkDXHwcP4UsiZw1AGjRIb1q",
  },
  {
    category: "personal",
    emoji: "🌋",
    cardName: "volcano",
    unicode: "U+1F30B",
    pubKeySlot1:
      "040112fef12b3290f24b2833501fc1082f9f09785c9d355e93ebe8488832330f0507fc55190c98ce3c3a89fe758d97f39cd3af2f5223bf49b31b9571b9d96b7981",
    pubKeySlot2:
      "04cd88541c21345a3e0508775122a0983ad3300c481fb467fa42766958a7e05e205aed022001844c09a7a414b60207a7c6a8f044e48dbd1d3c113d1f4a27a94029",
    pubKeyJub:
      "0404e07fd0655f78ed3f08066844a4863286e76f893361584af63b4c1cfbfca6230eb85d643fadc3d736a132c12749179f9847a9ffa764b867add8e4dbf3fc4b0c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/volcano-XgUwVRTctu5O0CICmNaSnW8dVesgAK",
  },
  {
    category: "personal",
    emoji: "🌍",
    cardName: "globe showing Europe-Africa",
    unicode: "U+1F30D",
    pubKeySlot1:
      "0472065821701ba7b29477a112ce8bcaa182a8b302c606c2aecd8447f548e5f8b39df19b79beadd6c09a5b1d5aab3490f25563c3950e8e394fbdcb473bc82a1e1e",
    pubKeySlot2:
      "043c73e36dd29c67fd9ddf05c18a656012475df9fa560b5917a94b53ee1b594106780f3247d4e750b0a7267d02711e3705a1fcd7bef32825fe8be802753a2c1781",
    pubKeyJub:
      "0410314fe66a3c48306b4e5e06ffc7b3a44448a11a4e76ac362bafca0704990a2c2a8af1985232ede4319d1121ccd22476bb3005213d0f5cbecfe842792047bb46",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/globe%20showing%20Europe-Africa-MSdcrrB9yWtFSz3eakFHjQxAvdmP9D",
  },
  {
    category: "personal",
    emoji: "🌬",
    cardName: "wind face",
    unicode: "U+1F32C",
    pubKeySlot1:
      "040164121f03680c5d3f7585014f5d52e820679c94032dbe686a130536f17fcba6b94d68554645524ccb334ee59ac2b3bbff0344cea0c5b6b8040040969bedd9d7",
    pubKeySlot2:
      "04f9f04142479993fb8cb26e37c89b70a2918e0ea94bddde2edb1cdfa26131c81f9112e2294868e0a97fb7b8964b4fef6374bddee1d0e0e9559c6a9a495426d924",
    pubKeyJub:
      "04122004af2b32693c047da7684d81bb09c696e6913242085cdf3000e3857d0e02009149d4dbd8c24182347bf0b25d9996f9de913c4d81604cb7b57490d819af99",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/wind%20face-D5MqPE8b5NKaOwxu78UkH4LHWd1xbR",
  },
  {
    category: "personal",
    emoji: "🌱",
    cardName: "seedling",
    unicode: "U+1F331",
    pubKeySlot1:
      "04f10254c265d13aa46bf99fe6c38b3ea71b4c3f062febc7c6426cf0d7eeeb49870c84cc4dc2b273badf15ffe374298ee942b7faaa9eaddde698b337999e24b4e0",
    pubKeySlot2:
      "048a907738bfc3bad9440be7ae9e753e0dbd6938e056917937208c9d6541402bf96c3b1f3db0737c1cd23c5f81cddadd2dd838175ae0677d466a0ecb772631f032",
    pubKeyJub:
      "0409f5983f2262e389a5d6e9388e10f4858120af71cddeedb7098bff0bed3878a41c4cfeabc1a7298923b845905b29d47230b5cbfbec876938d70adfa232d8aa61",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/seedling-6dblyaB0NCpRwo39JVtW5MI1WXDCEw",
  },
  {
    category: "personal",
    emoji: "🌲",
    cardName: "evergreen tree",
    unicode: "U+1F332",
    pubKeySlot1:
      "0439026c885bb508ed88165ee58e02a09599a8dc8886bccecf2d3e59eea62cccc7dd4787fced180ee65018cc01a7d2aa45d1165012a806b47b8e6ae420d3a613da",
    pubKeySlot2:
      "047ec4b52c332d7c8b161a0444b5ad3357539d70023c8781dd3c95692b9de43227ccaef6837d90aa6834fdaec32bdcd8fbe9187f65459cf179a24c9f0a59842d73",
    pubKeyJub:
      "042a696d2faff5679c5314c61c29ce3c90e21d4a14b8e20aa37bb6f740935931ad27e457508a555cdea39e22945da41e0a2e20d26f2201fea8619350f0e87a6b94",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/evergreen%20tree-AH5oAstKKwIdAOmxibivs6dRAK4fLh",
  },
  {
    category: "personal",
    emoji: "🌳",
    cardName: "deciduous tree",
    unicode: "U+1F333",
    pubKeySlot1:
      "04048452d0da3d94fa8c627fbd5a61ef9b2ffa9ad347e104bf6b4b6c9b37245f29b04f26ed8dcaf9bba8af6981eb78cd275705fe795e3eef8c57a5602112363829",
    pubKeySlot2:
      "04f3823c4caf58bd0a87b2fea7ebc46c741af6994397537dee186b359044e755e5b156a8e754d871d92d96335b770a2ec3dccc4b99678822aa3be4096499d150d1",
    pubKeyJub:
      "04064a083f5dfdd276d3d7ab6168a98f61df646c34d955ed7229ad0800ec490f69252b9f6e86fc97c6597def55538f72485b520019e9ce9b285b3c3f2aa4981c6b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/deciduous%20tree-A8BH86cHcm1nVOkfUSwNE1APME3RHE",
  },
  {
    category: "personal",
    emoji: "🌴",
    cardName: "palm tree",
    unicode: "U+1F334",
    pubKeySlot1:
      "0401488a7d0d8f69405d7b3a62ac4663adc042fba47fc97fdc32aaa46b0ecffe91faac180deb56fe7b894d13dc88959ed6cfb6f6a5abf6fcb16861e274dbc0bf5f",
    pubKeySlot2:
      "040554e01841a91136c06c318baae8c835f5e8ba553df0020bfab9c9ab6d9a43c23490ca0d07f019606f6bdd363d04e311a5c69ffd19d67d0d7da1426a7a70d23f",
    pubKeyJub:
      "041151fd594992f61735c77a2d68fa5c93adae0167ca436207d2e3b458bdc089980b17645195a3e25d0e619097a58ac696e503f015a66230c9ec3485be9f96ce48",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/palm%20tree-YUpG84PMwaBSpMTXpd6Q8XFhz3w51l",
  },
  {
    category: "personal",
    emoji: "🌵",
    cardName: "cactus",
    unicode: "U+1F335",
    pubKeySlot1:
      "041271dca6ce95f7d233b3029bcb7edb8966cdaa3abf1d783f44ce594b238db5f69429bcdcad1c3253ba91c1c1a4227271b97136305747f557d84bd3adecdd6be8",
    pubKeySlot2:
      "04122a278558ea8c41e960ff8d348b64ff02d10d8cf50622ce661658a828ea125a4dabfe38b5407add418299d2ddd7d325d375972bf5689f2865af9749f23b2cab",
    pubKeyJub:
      "042390563ef1849e02919e0b2464196959d3ba2504fe494de232c1a451350d8ab30087aa615fee0b6c9bce83d964a18e2104580abe48574a40fa1396707ef6b5a7",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cactus-ezdmiS4mcvxFm2wBYAoGeEE6GyfGpy",
  },
  {
    category: "personal",
    emoji: "🌾",
    cardName: "sheaf of rice",
    unicode: "U+1F33E",
    pubKeySlot1:
      "04576bbaec2020e21d65ca4811e4e46865511e0c2c731960fb9601e356599f0e78ee0aab8208ca5b548f4db51e82ca9ad33a38fdade9c8f282df8a6fce0d384f60",
    pubKeySlot2:
      "04b15419dc50ca2d174696f5ac51f3e4127d86d1ddcd529c503b28a1fbfddaabbdcfb5a0bb268187a6dcd24d651197c9982f14319409c20ea84d7deaab187f51b6",
    pubKeyJub:
      "0407519102dce51575c78f0ba4ab97ee15abb06f03b52027f2c3c315b3547d85b52f58d02470762c2fe61b77004823ae5add9e2e044d2737e5d2bbfa785a3c6328",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sheaf%20of%20rice-QiRpHfJ7KtsErs1933DaET1lLBcu6c",
  },
  {
    category: "personal",
    emoji: "🍁",
    cardName: "maple leaf",
    unicode: "U+1F341",
    pubKeySlot1:
      "041c0fa4f9aa2bccbc1ae82c48e7f15dac6b9b0054f0baf6ab9b19ae5758d92b7d9fd5a6ffbc86d6c108dacc85269331c064c48b57f2f77a78c544b256c322a430",
    pubKeySlot2:
      "04800dc0712e124457c0fe4a2993f982625bc04c21c3a67524600ded815a9cd9a21c567581a6ddc30f923c8136441f9e28a464b20500e629bbb70838daeb66e901",
    pubKeyJub:
      "041f1ab478f93778df5d7072c8cdb94c6c287c3c4226d04f3deb59d4aecb5effd90fae9241ee49540e95971ea4bab52663869a19ec61d584e0e2539364bf51605b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/maple%20leaf-BHO66Nj9sBApf1YN3QGrKq0tWSyd3k",
  },
  {
    category: "personal",
    emoji: "🍄",
    cardName: "mushroom",
    unicode: "U+1F344",
    pubKeySlot1:
      "04d24355a074b638f21f37ce2b1a0d01beba7c601bae1a542e21891b3f6facc68bf7bbd558f8b2845052a351d44d5fa2f951b83a8ddec162504c0aaefaaca246bd",
    pubKeySlot2:
      "04e05cea17bcc139756a66fb574422d5a3f2f189d8bb4d332fcb044986f4a0852d15706b4704910a996f85837db9978267b7469c74b7aee3c4ae3deb664cb5473a",
    pubKeyJub:
      "041b07af047fc19cf9692e90737e213050b0d38e994e64a7342963eb34c76e005d0cbf2edb5ef2c2601af0b3d97a2110a6a0aa94dd093a0bfb22191ce00899c6ab",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/mushroom-AOYNyHPY70Bx2U1I1ZFw3rbogeX0RB",
  },
  {
    category: "personal",
    emoji: "🍆",
    cardName: "eggplant",
    unicode: "U+1F346",
    pubKeySlot1:
      "045a4afd7bcc775c2c85ac4dad7c878187ae713b691aa073ebe588a14c97bee435ee07e587648af3e92fc7bf1920ac463a68b2215e86a039cb2a78d28800b34534",
    pubKeySlot2:
      "042ea3e5eb7013b13cba3d6f315d9b1601259c3f27f9ff457b2f6f2e31d2519b5e7e1272ad4e36297f80b0face0c2c9c09a7b3582cc6736eff633776632207968c",
    pubKeyJub:
      "042f144371b98abb0e4f1d00f86154b7499d614cc40ad761335778b54b090719d112f6cc10ba977a9f6cc85408b850661f94a28fde27a993b6871739d5b4437c9f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/eggplant-haweelUnAaU58TFQxEUbNAWWbpkM6H",
  },
  {
    category: "personal",
    emoji: "🍎",
    cardName: "red apple",
    unicode: "U+1F34E",
    pubKeySlot1:
      "040db1166063aecdec981b1e6449f99bedad26d1b9f291d7495fd4fbcf9ad20d1a3086b75c38ed8393e377ea59c34a440c0c3e1a9df5cd9de7d97d9f3ea685ccc8",
    pubKeySlot2:
      "040d50f1dcce1fd98ccd15d25d6ddb05f6f60bc1d9b9abf5a3bc9855790e744afe4e4838d939f6823cb35d675ec030a14006998ace72294ff4fde5e8b0d3a27a57",
    pubKeyJub:
      "04262d75f75ca81af6b48470a3b3fc5e36854191e4bdd0844df27925737590db1601388c075975bdc427108f07cfd8031f1cd95a9e1ac708087043e16881157905",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/red%20apple-7iGqRVYzzWQszZLWSUHyzwaCenenEv",
  },
  {
    category: "personal",
    emoji: "🍑",
    cardName: "peach",
    unicode: "U+1F351",
    pubKeySlot1:
      "048cc4bed29693044b3a35b0fda9406a9d403d6c1b87643da0eaa98da49c2eff81edee1ee4fdb7b5fe9ec56142630706bf915ef221f4cc562945757dc8964ad61e",
    pubKeySlot2:
      "04c427e3d69e02908fa497f4fca1c35c1d149e4042abbbdae449235c8dd48f4be0fabff796f907fc7e104709f18153cf1b2ef06f859991b693cfba19ee9d94f5f4",
    pubKeyJub:
      "041ae42a4acb8532f545e0f22e264858d1796e06fc39afdd115005ac978e5f8d8f2d1dffb023121ea3c8fe67aa4d7ca83b20e822bc856afb7bf77054897ecb18b0",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/peach-VAzJJryBrvzEvODCFyz4rsvkmSJkH6",
  },
  {
    category: "personal",
    emoji: "🍞",
    cardName: "bread",
    unicode: "U+1F35E",
    pubKeySlot1:
      "04f6f351e924b96c25f3d717fdb5d4f5660785e950369c25d94e1badba541fcef2afa1c70be78573e7690c336c2430d7c1c488f7eecfa4bbe1511310d3f20e0d91",
    pubKeySlot2:
      "0490ecf94d7c270837349157c8a3d27f976b92bcbf21ff18337e5a1cffb182f4d7d159a3f8cc2dd77c2bcc3e4bb0464aef2a76cadbc83e98611f8523868da2007b",
    pubKeyJub:
      "041e26008b0c68412fb8fc4226ebf5d636088b82a8b35e163f7dc3186741ec35b0300e76afea3e76737aca1aff92fa8641a782a8b84cd813702763364e5ce2668b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bread-ekap6EQYbkRRbQ4UOKUZ91CGgcW0du",
  },
  {
    category: "personal",
    emoji: "🎈",
    cardName: "balloon",
    unicode: "U+1F388",
    pubKeySlot1:
      "04b8f4d5e4c29373d401ea78fcc59923dad28e4eb6dea415551ad91642f2e3b8f887832e8b158c9ddddd7ee92be6aea5fedb605d29778d0cf564e8e07239d765ff",
    pubKeySlot2:
      "04d2a751c574065821aa375da696185180de1113f1eda5246a004169195e18148bbf5dd93e7af1d6558911828a7c4980b6205706d02dd35d9393a9e6e98fd06af4",
    pubKeyJub:
      "0411a061ec9a3357e2d45a97bfdd12217ec97dad7c395ba1332f45fce30d2d3a7922a1a734d92bbba213d6a01ac5821fb05a605ce1282bc1783f73e9378478087a",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/balloon-xU5qZ8WrDXkFBoDUNovjAzft6ULyRI",
  },
  {
    category: "personal",
    emoji: "🎡",
    cardName: "ferris wheel",
    unicode: "U+1F3A1",
    pubKeySlot1:
      "04e343980570065fc89ac7b7607bcaa4681c1026fc12f5b41bdab346af8046e2f2a4661ebe6590a12c252a78ea1fb1fb58ef2cfb9f4b51329774bc00cd1cbcf6a1",
    pubKeySlot2:
      "048aa3db19bdce3b1e5063efaa347496fc4d888b5e170c44e5bac3d9f8408e0070b864987b08fbfa1bb3b736e88fa1ff99ae3bf769f392b101f1d33c5fb5313a88",
    pubKeyJub:
      "0418010e47c8fe7e60ec60c7f90186c8ca814da3a8db49e1dcc4733e5997a40cfd21cfe6439c3343b14392bcde6c7c69026c6e84c52c7fc78f2ccc6c83bc10cc47",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/ferris%20wheel-bUOnF1NbOx4aHHzSOUDMOofq77b3A1",
  },
  {
    category: "personal",
    emoji: "🎣",
    cardName: "fishing pole",
    unicode: "U+1F3A3",
    pubKeySlot1:
      "049f64b7e73cf423ab345a2d8111cbd70e2732716edf39c41055f83804fd0fe0f55cf6824732e47856fd994740bd9358a90966cd192a62e711738a1c43dd415a32",
    pubKeySlot2:
      "0466789e2c58651b3e5835a04619a0affe116b3fc371d9210cd9519fce4a6212b2b244612346e49be766699f725e5548ae18ab64b970548a1c0dbbbf0d10079c50",
    pubKeyJub:
      "040a17e8e50df747aa4a5f139a3b2ab73c817ce8e47897509294e3e4de0277ec20080c377dc61c446bfd7a74e525c932f7358db5dd9f1f90bcd5f48a622cdeb7d4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fishing%20pole-2zbTQiYByAd8QApWZZOpVJjdVoOkFU",
  },
  {
    category: "personal",
    emoji: "🎭",
    cardName: "performing arts",
    unicode: "U+1F3AD",
    pubKeySlot1:
      "044e983e124746b3ec80dc6ad6260826548424e7d4819b696635729c9f73f116c0ea55413c33a267a26033fdf1d69e83d107f0682bc11dc2c23dd8da25c322441e",
    pubKeySlot2:
      "049155f759012f97bbd063267fde27ad232fd0987fa8c27f88e93262393e9ac811ea46ba9f8ea873d2ad4d9f8361db54bff75d6a013d97e7abb1f46239929c719c",
    pubKeyJub:
      "041e8bb3aab26dcf6e56155c62cbe3afc844500b349fb9c99cc017f846a1c19549217376cf3510e0bdc849b5155c4b315cefaf8ff01ba8766dd4a5afb376b988b4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/performing%20arts-6ND8hBUtaHhxJmJ3lSSWTSPaFS6ZRS",
  },
  {
    category: "personal",
    emoji: "🎸",
    cardName: "guitar",
    unicode: "U+1F3B8",
    pubKeySlot1:
      "043f5b93578727a30a1906a478474c19304baa577ff2945d28fc53b46ab9f633a56cd47def54fc1e3b720af1d3552ba952fbc1963388d626bdbe69452dade37783",
    pubKeySlot2:
      "04b9153992a1748a483b23303c66a579c0c42185c22a51108d34ca6a7c24e62350745b7733aced948a5a15a0c8089cd720f64ea96cd6251312ff473e5a192a79b5",
    pubKeyJub:
      "041826b2048180245aeca18058f5ff72366dc5ab35e4f21f368aaff8260b4621f400ea9af1bd900293fc1e0382ed2a08e3778ae785e48db86851abd8a644454fb5",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/guitar-sxYPi1vOe6CQenqzodJlUMzXGvCr4Y",
  },
  {
    category: "personal",
    emoji: "🎻",
    cardName: "violin",
    unicode: "U+1F3BB",
    pubKeySlot1:
      "040e9971a6de5952da99b51e6e4150a7f3b4a0de41dddc6131d0b7e31120a60dccf65405e90658110ddf1fb66a23ae7431803ad435c60abec8854639dae0321f86",
    pubKeySlot2:
      "04e2d0b8c12dead78b42bc8da9a2d0cd053cc646209ffb6068c380d95573a2ec9250d95dc0c54c4b85c9ce98f5be76baebb7baa7b20bd48a63bb6daf79e2a4785d",
    pubKeyJub:
      "042fd4d9edf900855bcf03240c8ceb74a9493a68d1f5503853beedc36f8712e1420961e3d31464a14b6f02a602288b49ce0833eaf6bd455041d3a5880d7386a7c5",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/violin-GzTaO1w2dYrbxWMxYQWwKMwFLWRXxG",
  },
  {
    category: "personal",
    emoji: "☠",
    cardName: "skull and crossbones",
    unicode: "U+2620",
    pubKeySlot1:
      "04f459fc62243bf5f75fb39b706ddb850e469d87daf797e240c05f0fa1d7b9c0bcc258427c251014522ee045447976c4500e34440341c5a9d21664dee33e07e2de",
    pubKeySlot2:
      "04ceefff9f50ffade3fb98730a2285ad0f9e4abe2791a9550dfc140dba7711a908b9a7db2eccf3f1458c80213b01aa74588d7a7f410a52453b968de0046805219f",
    pubKeyJub:
      "041ea7b47159486e2f5aabcf87e135074fb8bc07eaf8fd4223c93bea061db14da9012e9fa251219e3aac13650dc43af7eace96f1b88a5d524ebfdf825e06144eab",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/skull%20and%20crossbones-eBkTWZjYnrjMuHAVugKRfTWOH4goLz",
  },
  {
    category: "personal",
    emoji: "🏹",
    cardName: "bow and arrow",
    unicode: "U+1F3F9",
    pubKeySlot1:
      "0447cf459718da524df473c709c817580b9690e83a7bbb321d967d40111c49db739a73a616430b1500c21805d84af6dbdd80aa4231c57b94fc05e90e03e39f79d0",
    pubKeySlot2:
      "049a4098582df3e927c732f3218316f0e01587c1766abe0693d48989bdd08e1969037e9746f8188f65f358b2b635a8f23ff85e2e18ce812331256cb8b83ba37751",
    pubKeyJub:
      "040dd99623e59ffe81d764757fca3646c5840ed1d793c148f3784055ac9a02f60423b50d25dd3253aa28082a156c5d7b6fbe374aad4a297bbb429345806be742c1",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bow%20and%20arrow-74H0Wp5UVX5EctTup0dVMFQPbvFw6M",
  },
  {
    category: "personal",
    emoji: "🐁",
    cardName: "mouse",
    unicode: "U+1F401",
    pubKeySlot1:
      "04a8c859ca3e459536a6b8af80c7aeece9614b3fd6be1dc98a1db0bb4fcd7ec80ef7fc02ff9f70be62e72ea0fe29d08ab659551c154e2184dce4a826e1749524ff",
    pubKeySlot2:
      "049a7825cd07959251e455279cf9dc6c615cabe79cb9e5e7e1966606d8ce642bfe831caeebcbacbdb045945f6943082a134ed769697127f728efa824a45fd10096",
    pubKeyJub:
      "04199c0bd38f20c44e0a2bbab622e26f7e7c37b71ddc7bca39f262edf741f3726b27a8d6f79fcebaef985390e959ef06ac3d233a488177cb0b0afe7bd95f7a5899",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/mouse-JyJPthBZVTVtouQhl5AThPUqTZWX7e",
  },
  {
    category: "personal",
    emoji: "😺",
    cardName: "Smiling Cat Face With Open Mouth",
    unicode: "U+1F63A",
    pubKeySlot1:
      "04fe3fa9dbb20a43b09e0c83f8436d827404b4efd9d4f297aeaf2f50dd5f0b942bb25ec7721105d4a5d20a9981b25591e640c096b5f9f55be88e56ff6858f763fa",
    pubKeySlot2:
      "04fcbda905cdce158cbc78743e4cefc434e6bfeefc411a4dd60826028e68a8c92b94085dc6ccbc7a932771f5b62b3978f64e69a1021298beb21bb3700bef6b0bb7",
    pubKeyJub:
      "042dc6eb6619bbe61e14f7803a6e81b20eac25a32913f1980f9a223f2d0774eedc1f8e8f2b526c0abc41325aeabecbd159106ca5777fbd403e717a3368ba9dff25",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/Smiling%20Cat%20Face%20With%20Open%20Mouth-C3YxoyVfelL5VK5KIDrJSP8FvezWx1",
  },
  {
    category: "personal",
    emoji: "🐌",
    cardName: "snail",
    unicode: "U+1F40C",
    pubKeySlot1:
      "04e531b2fb9756b420a405cfac493951452564fc640678f47eaa58dba7505c6e5487c65a59612336bf159b755b2700560409ce535655234544ae51ccff583ffe9e",
    pubKeySlot2:
      "040b7c439d44546ec40a4b116161b92a34678f8751e67081e8cc216feebd253ebc3febda3e997c5ed5e59920937841f8b619ea621c02093310d73a9d179611df2b",
    pubKeyJub:
      "042ea7c153f42cbfaf5a8a38ca39a9156ec032edd258ebe6da90bb5ca3c934561a15bcf17874044169382a2ad919e65780e75644009bb42596dc4a516b98ba2386",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/snail-0IVutnQ0CpnRtwlTNBrQG3N5wvvlHi",
  },
  {
    category: "personal",
    emoji: "🐍",
    cardName: "snake",
    unicode: "U+1F40D",
    pubKeySlot1:
      "04e0d9f8aee2a4f20409b11496758f8cd542fb9c873a8e88c9c9bddeebb33b0e942016fe9e640493615ff69b3ef498f6bae3bf4ea5525be3f841954441eba7a45b",
    pubKeySlot2:
      "0441fe367c2a329dc94c3b9106883e5f4cff9dda399963903d319f30f9f8718fe1af4340f145690cc71183038f45fe3b4207d65b058f5722c6165ce850e1f9f6e4",
    pubKeyJub:
      "042ed46830c0c4304d9db8ba957d19fc03534cae3ce844e71400066b2491cef4d10e75bfe373ad63af42ff96997efd1a39a84626f82aa7c300970bd4cc5cac39f4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/snake-9J2bTfj7ne10x4rftZTjE7YWhUg98t",
  },
  {
    category: "personal",
    emoji: "🐒",
    cardName: "monkey",
    unicode: "U+1F412",
    pubKeySlot1:
      "049de434366a72a348b1d2c8d7e42c0270f1b904813bda9a7540aa1ad808e56528911f7bd5304d6f4cb448baedb63f043e308a9fc658dfda0d9e8971d40de6621c",
    pubKeySlot2:
      "04445cee33a554992f8321fea0563434650ef50bd31a609c075b655d86cc120e48e14b2a83b0f0b0dc7de24a0bf37d45351f86dd8564cf83ccc5cca6f34d3ab619",
    pubKeyJub:
      "042fe675179dbb2c6a5d1f365e31a0c92f2aa537a27787e9a54a1529f6caf0681206f77ea88a0a0710acbf84af57635608362ffd514776ddce9e2861786342975f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/monkey-2XQSj0N9OiUOP13eA7nsqszqlj2pgm",
  },
  {
    category: "personal",
    emoji: "🐛",
    cardName: "bug",
    unicode: "U+1F41B",
    pubKeySlot1:
      "04705590e7a06cd302a5d6dfcea56900d7da68c305c2bde9e005cea9b4283f0dcfbed56016d6027ec8b1508c0f58562bb9d6ef2688d04750dcde06fb6ee88fd543",
    pubKeySlot2:
      "04580dd1568e0835c6465b5fdb5cc8ecb54daa840607798dd9ff2f4a8f6f55b4030fef157e9d62c54f37409135172830bd99aff3abd622e14a0f2e87dce6203ea0",
    pubKeyJub:
      "040bcfa9ecbbc5300a3bc831878c9d95b3cf768f66fa9233f4aad08f5eac8f10bd04ea97b1862d3183bf6056cf268fa3f934acc5a7c304d073d9360a49b09c1f7f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bug-bSLmtDRx3RVw2o7A2DjgqckSER3Ma5",
  },
  {
    category: "personal",
    emoji: "🐟",
    cardName: "fish",
    unicode: "U+1F41F",
    pubKeySlot1:
      "049f359dc79fbf77c8520acb60663481165243eb1c6c20259761ce50e690da95525731fc90fe7111944c538da76030824108bd38eedb184e7ee7c3dad89de06cbd",
    pubKeySlot2:
      "0437a2156bae03499b8ac81825e76baedc1d3d025e1519fe9ccf6c8258bf856953181dc4822489820119ca21e0c1cbe6026f33504b54d83f3640fa99bd16e3ed8d",
    pubKeyJub:
      "042812bf44a0cac7752e342927eee5eca4494b43afdc0b3be2a5538b71552dccd83042d52a8430a12b7678f8e50e5037f2989b60e65bb4b9ac7d9b4eb7f51a8ba7",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fish-T5hnhvH2sjbp09P76lXbso9PGUCK0I",
  },
  {
    category: "personal",
    emoji: "🐧",
    cardName: "penguin",
    unicode: "U+1F427",
    pubKeySlot1:
      "04d35f50cf7e643a7d34da6a0e0ab6d11494cd6a17c6f11f4c9b013ed5e46e4a795584d9b13b02babe6be53f01ffc45d1e920d83811106c658f016aa8ab97dbaae",
    pubKeySlot2:
      "04a292aada97360c741cbfb41f4246c72bb1ebeb109e6a74c983c7e236b899b31c08bf43e0cee151f02a456d97465fe6a623429b065c3bbdc1b511643ae3ac0ef8",
    pubKeyJub:
      "0419c63169ce7d31dd9ae99ffc8a58ac7a99deef2f8365de8a0ca19bb3080a355c16251a0ace0bab1313182700d2e5163eeba488b2ab899946612bc96198f9be88",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/penguin-4speYN1n1UjZmEKAsM1KE7otZB4zLT",
  },
  {
    category: "personal",
    emoji: "🐯",
    cardName: "tiger face",
    unicode: "U+1F42F",
    pubKeySlot1:
      "046d07eac6430ed2953e94a1dcdd8145c62aa322f7dfde5ae94fbc5d1bd61aa3efe9f989f5c0a690081b22d385050b9317733588ebdb94efc718f4223c6462a243",
    pubKeySlot2:
      "04acf03a64d8f33c0add8e9b91fcc1712baba6c31f79eb17c2b77d8f20f67ec32a1cccb7028944f07288184b681b6cbba95bb9e1d4c4c05facd29da81806df3fa0",
    pubKeyJub:
      "042d64c5fcc99a9ef6408c29fb28647ab17071b89d984f5c9478b3cb9edb3256dd1baf4d8b07fe28e5c4dbe813f21a880e0f796c4c309241309ea8758f3eec0187",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/tiger%20face-oepZHZcRLS9cO37RiVpRLe7zyOZJwy",
  },
  {
    category: "personal",
    emoji: "🐳",
    cardName: "whale",
    unicode: "U+1F40B",
    pubKeySlot1:
      "04c5e841b74b30bc32490ea878a547007fb54f97c007012de171be860e095820c9de88d3d2fe1f148c64128e63d165e17a278933da28834e45c4d9b685d6c142d2",
    pubKeySlot2:
      "04595e5b3483c4b16b6c683cae53e5062341367d90cf43b680890a005193ad4eeeb8ebe9275dc17cd35acf81c58738df37c37af49cb21c086ea8fbc62afa0cd07c",
    pubKeyJub:
      "0414cf3c27fb4781fd6bc965615f737855c83f3333a5ea636ed5ab4796febeec4d07050431d7fb33ab3a586f5b6d2ba223593a1f1ea7f86ba290c089ff33750901",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/whale-DzAKLEIGohI4REDP1vYareweJf3yza",
  },
  {
    category: "personal",
    emoji: "🐺",
    cardName: "wolf",
    unicode: "U+1F43A",
    pubKeySlot1:
      "04f24a275039fb1d5cedac8bba6845e7a10ee6bdc6490e25ccf7540dcf6996d5484b656f68732c089c9c315992daa3fb2941f24a7366bd421b294626e9fe002ecf",
    pubKeySlot2:
      "04daeff1257d5f4717a32bdfec1b57e8faee12cd07774f135f89ae8406728bd4db403bc6d642e1761eeb770764b226908a12c1dcd839db2b1bc5b55741f269fcae",
    pubKeyJub:
      "0403a5552b49c7d62065012fc79b47c24afa9bd2c8f03f5ec9b9f10fd00be59d0c007410c50a139f4c5d7219a6823044e8308d9b34c5b0ea37ec911d039e9d3e65",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/wolf-OVFwNThWye70OlUFVKL5Us7PACsyje",
  },
  {
    category: "personal",
    emoji: "👁",
    cardName: "eye",
    unicode: "U+1F441",
    pubKeySlot1:
      "046bca7742126b68df4450597622cfe9abcf326ec77ee092a811333f0529ef5c3f6073ba7bbfce56a7566e6f49987d745e3ff8a69c084a91c256bdd455615e901e",
    pubKeySlot2:
      "04b1b9c557419c76520cf175977fd673d5457165007bf45a97569507ebab1a61f2285eedda8f9ec17699b193a5098be84aeca1a9381df0193108fd8ae8ac710a57",
    pubKeyJub:
      "042cd6b4a1fae33c2219bb54dd35af5940480574ae5cc325c43c2277a66638a90c206784e1d9c89a34eccfa33994da2396525d495ceba7a86b1bf2a3bd18014f7f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/eye-lBX7A3Bijzu0PcnFJ1MK8M2Nmtrriw",
  },
  {
    category: "personal",
    emoji: "👅",
    cardName: "tongue",
    unicode: "U+1F445",
    pubKeySlot1:
      "04b68e5efb31a0c99b91ef11eb60d8eff403256d3a89a46a8b017f8465fda117e0dcebd3d3650c277149c110021eddfc234d5bba22c8cb71c30a6d167db861b10e",
    pubKeySlot2:
      "046d68e7cd52e170fc7682dff1f7e1b159094c99c302a4f9a9982555ad73684873d2b4c868f3bbf8000d34fd6de4e63fcd44e55966e68704fa1e39aa1b303d02b2",
    pubKeyJub:
      "04166efb74d13f454fe5abd3dd38da852b1d2edd890f90546b5d550d8b3504c74501dad5206a27efaeaeb6ccbe6ecdaf3af6ec6fd0c6275584418d9494392652ba",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/tongue-jF2RXahQw8muVa4bcjXB885XZcFqnL",
  },
  {
    category: "personal",
    emoji: "👆",
    cardName: "backhand index pointing up",
    unicode: "U+1F446",
    pubKeySlot1:
      "04e066f5b887e4243a3b677066de331a7d2db1998bf9f657d7b4a0bca489a6126fcfba96040ebb54f966a047e25d8401eb45a1d3e1b2215d7f9eb5e08f59c4fb6f",
    pubKeySlot2:
      "04622905a11cc40c6c907ca3f95703fee0e8f3c189a688cebdaeb8a210754ad74d998bf101185ad23bb940e2aedc7a4c0e8de312d20405c0a33093209f484b4c5b",
    pubKeyJub:
      "040a192ac489e4810beb43083f24f016d88c60b84dc8f022e9126c7bfa12c8870d18ff8f2636b784f68ebf448efdf330030bbbf2845ca8195e1b5fef8b888227c7",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/backhand%20index%20pointing%20up-VvPBh0QtpJhyGTAwlYaDsJg2fbwFb8",
  },
  {
    category: "personal",
    emoji: "👑",
    cardName: "crown",
    unicode: "U+1F451",
    pubKeySlot1:
      "04985c8644bb89ea383775a50ad90a103187efbf0efe7f1ee7222c6aec4c2f390a55050c873960559bc69f4fe3e21066b365c013902df426767b4d4a68863b7686",
    pubKeySlot2:
      "04a7661f411905c83134d5929eed9e8d3e5591e9f9c92c0c361749e2da2730e5936b17c2036e60eea8c3354b7b2b457dc9ad96c5718a183f65efb1237451f93551",
    pubKeyJub:
      "041d4b3d19e3c7fc7daff5c945082fa9d4bc74e980e116a536b5bb387ccea172e72ff96440bb95d10a32ddb6c507c3d5a6c3c702b6da0bb1c1c4bc7d1bf1cc2876",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/crown-59efjfW2HpexExfDl06PzJ67HlOwuy",
  },
  {
    category: "personal",
    emoji: "👥",
    cardName: "busts in silhouette",
    unicode: "U+1F465",
    pubKeySlot1:
      "045205d96975999622fab0c4c0049e8663c03677d3e4814bfa99b505273a27198a85181fbaed339a16b4e6d61699a267f5a9ab7f33dc55bd881e4ddbdc37298da7",
    pubKeySlot2:
      "0411b554f2d40380f09350e685501bd1b92d9ba566d2418e0fb635435a5303744d6aeb96db0220a95a5dc7c12bba6d5e34335ab035e90b71bdf7ba93e42acd99f0",
    pubKeyJub:
      "0406c6ce6443036585ec29cd02d3c3a0f742622999b891b35fd1a4b3ed9a6d019516c9cdf1d991c2b180356c59abc634379fa60534dcba7eca7905c2d35b830202",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/busts%20in%20silhouette-lm637ie9vyqMHAOFCAjLTDeBAujCn4",
  },
  {
    category: "personal",
    emoji: "👵",
    cardName: "old woman",
    unicode: "U+1F475",
    pubKeySlot1:
      "04e4f45338a0749839a4edb71eb040a5b1684863d0af7554be8252f2db30690faaf4c1b82a0867c14ca52e1ac5b208cb7de569bb9bfe044b2766af41aed32eb84c",
    pubKeySlot2:
      "04ead85663d62e05a267a4d702743ef700567243a1d966514f4972340782357aa409abb6f3c8655c11751721e5481e606086f05bf0965abd7542f8279cca3ca194",
    pubKeyJub:
      "04109cfc8e2819062bff48b35f64be66491d2e59248740e7765265031b825d23202411e88aad36fd5f43e268da9829fa5b6ebc000a6e043728c24f09ceefea5947",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/old%20woman-lT285wQS3g3tgf3lUrtgzfW2t2H9zn",
  },
  {
    category: "personal",
    emoji: "👺",
    cardName: "goblin",
    unicode: "U+1F47A",
    pubKeySlot1:
      "047479014ccec370081fc064f3023afe7e05b8f37b5abc53f4f3ac29347a37746bfd48d0cfe718ed99327627692a53c8d06dbc93e795ca0453b2a54aa16cd1adc5",
    pubKeySlot2:
      "04228f9421193f1c944d154c9e3377852e9ef037f74257a97f9be09e225f1a696cfaaca74ed69f0e52c92686d0c4ba5908810c7e5c22131575a55991fcb478f840",
    pubKeyJub:
      "0401ab35b551c4480cc891d8d4fd5239404c1b9b18fcc6de515a5e70b815c63f060cc50fcf533fe9eb41705a718ced0f50003b90917a19bee8a2e1347ce579bfc9",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/goblin-37gnIRVqAeAu3PiEmDhNs90J52oz85",
  },
  {
    category: "personal",
    emoji: "👼",
    cardName: "baby angel",
    unicode: "U+1F47C",
    pubKeySlot1:
      "04ba36bb6837a78f61bdb678e9c2a76368320d3a00a0d94ed3ff73318855fece90d5e8a346dbe8f26a292b3c463811ec3062d0f081afa00673eddd283e72c33653",
    pubKeySlot2:
      "0428f15b2f586b4a1407349c9508becafb982ea4ec7b2ef6b52031de60b8b7266f10b02bed1a9fa974ccc20150c588375d1d6661a4e53df6c6723293665415f6f7",
    pubKeyJub:
      "042b6482022884a460280261770694c77b29f1371f03206a7467f74d024296575a246dd2534c99ae4510640f8373334b06246f559fdc061038e5bad7e58aa40a31",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/baby%20angel-Lm1htRyyccYP78JFHrq4TqusYPFjs0",
  },
  {
    category: "personal",
    emoji: "👽",
    cardName: "alien",
    unicode: "U+1F47D",
    pubKeySlot1:
      "04b8b721f3a9226049ac2c0fa6be0826e922e403d85cd5f48468765dca879adbc16f5010845a4933fe36074289da2213c309eba69aa3581aa487698f7ace9eb9aa",
    pubKeySlot2:
      "0447e850739921c59951532b38d4589d40971d3bbbf59357a0c812479c232476064f4007a664bedc8045a595d877389e364938d6ff7118ced2fa2ae60001f3305c",
    pubKeyJub:
      "04295fffd822074ac6c61738dbb0d8d0810284ecba56de4e8bc0a5adf96cc477180764a4ce73dd3430cea229579dbb178a9ea74ce7c651170e220f3899388c2d1e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/alien-jiGgqyGvs5nCWvRrstLS2COVmVW3Zv",
  },
  {
    category: "personal",
    emoji: "👿",
    cardName: "angry face with horns",
    unicode: "U+1F47F",
    pubKeySlot1:
      "04ee59dcb3644b1ceb75976e57a8da231bb4ffa38be97be58097351bf99661e8af839491fc0fbdef0f5e1394fad34a01b0fdcc5fba6e975e5813bc87e1662b6637",
    pubKeySlot2:
      "04ccdb529067398afc6dabd927ff4330a8cf6f352b80facfeb9f748cdf2bd801f8551ace19bd51954f60d0fc1ad7b4f65e241471b7469a47b9ca29579886c03085",
    pubKeyJub:
      "04211c17e4576484c109641b8a3d30bec1f84743050ea353be08f32503bccd8f5d11e376f6d9df0d6d2d7a9e01617febac3fa56cb7ccc852e0422ac3469ad6d1ee",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/angry%20face%20with%20horns-i72psbCSrjeSEFxah6wbSdASU5Jw6f",
  },
  {
    category: "personal",
    emoji: "💀",
    cardName: "skull",
    unicode: "U+1F480",
    pubKeySlot1:
      "044c2b9bb3ceb4f8e2ca8f62d7c4a0611b458b80eca8822dec2ecaebd54e05ef5a587e94c551f2b53d66d9c9221d5e8fbda60a47bbd015f234063f8bbb9e237d73",
    pubKeySlot2:
      "044cf6e65a39cd397d7ba3fa50acf7271f47f9ad8f4b545cb24b41cd5fd842e916cbdf27fede401537e57b7ef2ecb1884c2b2b0e09fd6de00d8ef7f1f6720e92f5",
    pubKeyJub:
      "04082ddbb1bdbbd5b9d29831f63521748a34296d9e892b6e7b8175f6fbe5855e931d5658d388c5db07080916539a8fd9f13829a6af68de26b57612da0ccccd5291",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/skull-CSIc2h0ruQnCkfmiG9NJOQB9lhbp9p",
  },
  {
    category: "personal",
    emoji: "💃",
    cardName: "woman dancing",
    unicode: "U+1F483",
    pubKeySlot1:
      "0480f47ad7fc6c20a844e70b0e40538a54b7945e9848ad5a089d687f95df4bb3fa9ff89d1a573d490a0046b0ae7e9a33557de8612671061a66b11eb418c2b1ec16",
    pubKeySlot2:
      "045b952c19fb4022fe1cbd5f8c08610a28c87a2219872d81c862eae466b01e697a294daf2feeb85b3a67991520fd3ed7f375263d7ffb832509cb4c093c82f27177",
    pubKeyJub:
      "041d8be9bab800036e53c47ef96e7d6a6df4964c237c888269daf107e55ee98aa21a263630fff4172b065f1bde100e4b85d6ea3f3f9c3ed9d1f7941bba9c9dbc4f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/woman%20dancing-KbWwf873sP6e0LQbUfJdYZ3j6vsiw8",
  },
  {
    category: "personal",
    emoji: "💋",
    cardName: "kiss mark",
    unicode: "U+1F48B",
    pubKeySlot1:
      "045f40abcdfb308be8ba8230404c08a56b2411aec047b680e086c4a07e1e25572ceca5a2faf9692702fa796644417f776afb1b63413ba083f634adb7845b6975c8",
    pubKeySlot2:
      "0400fbdcb61fb1d4ff31f2810515b48b310ae248852875a2cc832ec8979ee27c27efbd32c0b8f42e4c8326f1c6eaa5c9c9b58ca5abbecdc9d0de362c9704c11580",
    pubKeyJub:
      "040cce17b7d7b3207b47203f615e6b913dfa76bb6981776400af6e2eb49b86cdd51f8d9dcc92432da2f7297433c6b9011cbcdca02d6f95b47b1f64e7966b070f7d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/kiss%20mark-7zzISmpLD8DpZdcuduC470WWbPSpqc",
  },
  {
    category: "personal",
    emoji: "💪",
    cardName: "flexed biceps",
    unicode: "U+1F4AA",
    pubKeySlot1:
      "04298a98707e69221746fcb93cd498233bb649bc2f5225ba0cdd5620bd4907b2fbf065d1fa1aac8517cdeb7d8740144abc164176f46b92650d59cd3b4cfd98501e",
    pubKeySlot2:
      "047056bf808250019a8ad78849b1ac839a533327e5fe71968bb3a5a933c94a70358f65d18a9a8d67239eee3eb836016367fb48ae033fb53b199b46637469418d0c",
    pubKeyJub:
      "042923998ddc71f6bb1af8da145d0e230912be2aca8f5b54a983d3dc6a17c630fa2079e2dcd0176481e5119f156929783782555bbfeb2c7f67f4ccd93b000e6161",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/flexed%20biceps-x8tu9YtwabRb2Mrge0ng3CXjRfWlK8",
  },
  {
    category: "personal",
    emoji: "🔍",
    cardName: "magnifying glass tilted left",
    unicode: "U+1F50D",
    pubKeySlot1:
      "0492a06ea3080955bf3e39bbd0a4d207c3630d2ecff9751a62ef2ecaaaa850ff1287eb74a4300280d28aba5c64b38b2645d5db41973b8018b3aa168e5a01566fd2",
    pubKeySlot2:
      "04148f36f14d0bfc14487f85a32844fb6a195c307726d05e99611c2d46964a8025dcecc670b4ae392ee43c1d41d1da4ed6cccce4a26d485436ec869e208eb41883",
    pubKeyJub:
      "042588cef37f58e5dd197a1a03314fce25d3be9340251867358dc77c820a9c446803718ba22befe8c221be692e27c0ad43ab9914295597fce6a3181c02058ff719",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/magnifying%20glass%20tilted%20left-Ml01QCV7GIM4xLLKjNSjYwRkA4yxjL",
  },
  {
    category: "personal",
    emoji: "🔔",
    cardName: "bell",
    unicode: "U+1F514",
    pubKeySlot1:
      "04c4514300fdd9124c3abe7c3f7ba3cdf0cc4a083a8729f87f2a337c83f60e561c4882ea6af587af0fa90372f5409427262349458fd5f657cd5c60b673d927ef6e",
    pubKeySlot2:
      "043bc61cdba8685b7876dd6f90e97f8ed25d80f452f7b34abb0ee10d6e6401d4fe88766e6307cbbb1727badb871b6df4e1fc682664f1265f826058e0c4bdd02264",
    pubKeyJub:
      "041223601baa7fc52817b47fa91dc8f1abdee5634a259c7004f590318a292521d8128216d79cce7e542d451f4049648b66d3279141be61f1861ea7db09c21c6647",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bell-4GdDB4R1aoULQeVmulhWbIyTxUFnsu",
  },
  {
    category: "personal",
    emoji: "🔥",
    cardName: "fire",
    unicode: "U+1F525",
    pubKeySlot1:
      "0432e7c65ef4065c3e939975cd898453d32f06854971283ea46205dd9d816611c55dc4aa079c0f6948c1a076b52e41cb9b40f83c84736cef622fd3c434a52831d3",
    pubKeySlot2:
      "045e92056947c4c5ee56a1e2972ec3728ad91761828e35c198a523ba16231e1cd237356c81522992336c34fd6fa58646b5bcff1a2e07381bc5467523b920513096",
    pubKeyJub:
      "041441741c856c4a72b84b0c9fead5ab372bc49384a1a2e9e0dd9b7b47be91e0f7052e503e25ffe7b24e701c32b435304b33814f5be83aeaf49fee9e86edead288",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fire-9YUNdyuPK02XbjttiUnwwhYWiNk5uw",
  },
  {
    category: "personal",
    emoji: "🔭",
    cardName: "telescope",
    unicode: "U+1F52D",
    pubKeySlot1:
      "04e006649bfcb411e6ade826aaccc6e932944bb2eeb258ef454719c1f5d32bd4f8eab2cc73044ca04c473abc5051c0980f2a45a3304cece19160ab2ffe2fa9e52d",
    pubKeySlot2:
      "049c9522f5507504bd5a6b2de6132799c2d4fff787b3143a3776a8a26cd9d6a9ea923b217f8a67cf2838e90c8778577abc3601eb415cc5fc9a2a073cd431f59b99",
    pubKeyJub:
      "040f23e7e5ae3f52be768d93b75e2a6aded1174270306277aa431ea281d6e886b429905bd2117e60aecda476dd32c736ca47500f51357fc96d56108eaeb287f8f2",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/telescope-qEKV7GWXx907MnrVV6VutLm3JmMfNR",
  },
  {
    category: "personal",
    emoji: "🔮",
    cardName: "crystal ball",
    unicode: "U+1F52E",
    pubKeySlot1:
      "04ba8126908652c9056cb4595c28393c6f8ae5b82b8ffb93f0dac5ed21742bb1db9cb69ab9a58274bc34da4b1580a5d2b73e49f046aee4448c3dfeaacda1201071",
    pubKeySlot2:
      "041386911be51f9ee6c30f3b679e1fb70ba051ad3985ccc1832494885ab3330661a5bcf575ce79c0734da2662d9436a050cc097bcce9ab5c73c033fadc4ae87c00",
    pubKeyJub:
      "0424548dbd566a85262767b893f437f16b70875bed9f41ad7118568f4372af9d651eb0597d335ec544a12938cae7be9418a27d5e75a99b7347b286cd81a2ed2ede",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/crystal%20ball-g9o7AUgoUxCCvsfmRmmn6ceen6PcqY",
  },
  {
    category: "personal",
    emoji: "🔺",
    cardName: "red triangle pointed up",
    unicode: "U+1F53A",
    pubKeySlot1:
      "04124cebb1cd1417172e7aafbee670d4ea68bdb7a87a3ae715fb84e7fcf5bd62898e21b0acec833da737cf21f39e76c24214f8a85393ea449d917e71ec08bf941e",
    pubKeySlot2:
      "040db4caf0c5c6b9f66acf5b732f9a19dc9925f417c6ca4d473eabbeb8e6513538312707a537ff9aa76e0bb388da8eabc8cd46c312b2964da715d385cc80409a68",
    pubKeyJub:
      "041dfff9e9dc09c03d6d5fbd59e20c6b9120eb5297a781efebe0a0b21a4ce00d880b3da56a8f7af56e07fc334780ad6968f3b7f9c10132ed6583a9261e205f52fe",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/red%20triangle%20pointed%20up-306S6HsKnXBj1nkC0X8vHCFTaY2Ooy",
  },
  {
    category: "personal",
    emoji: "🕺🏻",
    cardName: "dancing man",
    unicode: "U+1F57A",
    pubKeySlot1:
      "04a126a3ddbbf84df50168035f8c43a4744fa0ab04512de766483a7cc1cbe53a83824bd0f77ae98334e9c9f1b262be5ad456fc731938c845bb39f181689acc9c5d",
    pubKeySlot2:
      "04123c56994cbff253da1c73df256c3cc12e1fe512cf19406e878cf95f66241ea6af9b6f772b980330faafb67b1b749fc5644a073ef86c7faef3bd806fbd03258c",
    pubKeyJub:
      "04204145dcfc3f22db7624a4f8ac23a6c20c8e74155673771b1f1fe15949100561211b43ef8900196f27edb942943a8833fc8417b18b4daf34ff0393a8381256e6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/dancing%20man-TWI8PF9qtB0hMenFibKIXZnUYgpMaa",
  },
  {
    category: "personal",
    emoji: "😁",
    cardName: "beaming face with smiling eyes",
    unicode: "U+1F601",
    pubKeySlot1:
      "0485e8c8a320d20bcb7ca01c0352f1de1c6b89bf481b3bd8ee7d03a865a61d0615800e857e0856fdfa8bbe5b42c82fe16e1b9d152c31a2d12375a3eab38bbded9d",
    pubKeySlot2:
      "0458a3e3b2328a6cf63e40805b2fa4711ba65eaa9b81823b8023557dc971f0a5d72bc804e6e3840eb437e4f89b06e6cfe5208277925ea00201c114b24d8f5357a5",
    pubKeyJub:
      "040443a7410f8577e1289c619f2942a4b772c29d7d46857ccb8e4cf1ceddf696981e439bf3988b0867c9b94c123e2839fcac7193624eeb232a82c23f81f816c3f8",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/beaming%20face%20with%20smiling%20eyes-Ew2H7xxXpPulchvJxsBIArzMxHCHGe",
  },
  {
    category: "personal",
    emoji: "😏",
    cardName: "smirking face",
    unicode: "U+1F60F",
    pubKeySlot1:
      "04e01023f8506cdfca426c5389ef0cd29edd3fa80216b4edaaf3a895d2c9281effb571f5870b767c831c1bfd5ca203e3c4c497c02c6fa3b1aae170d8824e1b4aaf",
    pubKeySlot2:
      "0474251548a2e10b6640b0e7638d4ee3fcbdea5d7630e1280f39478f62b4884876bc289374b87674d819cf9bec66a5c4ba9808ba1f8a882ef5bb7d09d2f0ebdc1f",
    pubKeyJub:
      "0408591dfe8dc5f8b50bf90535890ed28cc3b10ed027d971104d851f9bcab2f91a1b95904c9dce78c11e79209ec04659bda4a53613cdff4a17285a63a1254b2278",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/smirking%20face-LCbQRK6Vt3VxtZ27drhhzbDwhPkaPb",
  },
  {
    category: "personal",
    emoji: "😐",
    cardName: "neutral face",
    unicode: "U+1F610",
    pubKeySlot1:
      "04c08503df9f3a5779887e0b1d9c09ee865b96eece31b1dd7ed48246053542d7028097c2637480e12df1467e067b5d9e81fd195438679d2bbb79d63567088b5266",
    pubKeySlot2:
      "04c4e1c4c27fc213797d384425a06d1931df468c589af20655f5b347f47728937d164f46e6b88e11e46775f1f055c84e4fe491075c5db1e71be101289ac01c9d9f",
    pubKeyJub:
      "040812cd4f73a320d4b37a63d01e3f8dc40191a074405da6ba6e600466fb9a38e927cf6471460770a18cf650954a3c04004fd98e0cf41ffc40f8072045fcc1eadc",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/neutral%20face-VgA5ZO12NI1SG9LHGyeEDEoUkHgtNT",
  },
  {
    category: "personal",
    emoji: "😒",
    cardName: "unamused face",
    unicode: "U+1F612",
    pubKeySlot1:
      "04772522e662a601ac0fb643b34f9371eccb5867b98b128e5c4ba5201c10da965e94bd7f740a6b110073ae1e6ccdcf04610a5170e6d49dfacd11ff56688d8c1f8d",
    pubKeySlot2:
      "04f8c2b24b3f66305d42450d0dcccc507de532df2dcf7c6b5dc2ea5bd9d2ad88345e0ed71cef3b6638b4bb27823528798120b382f5d26f91d03297ebfa37d9f4f5",
    pubKeyJub:
      "041edad886e7c6e833e994a8e06ec212ed653fed4a91c8633af60ac937551358d71bfc051afb2485feee2ad3db42e196ba9dcd177e7d833d4694e98bf8b9488f8d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/unamused%20face-aqAK95bznM1Axyia2zBekTYAlgQZFJ",
  },
  {
    category: "personal",
    emoji: "😛",
    cardName: "face with tongue",
    unicode: "U+1F61B",
    pubKeySlot1:
      "045f0efe0af8be914e5e6a9d80c78e015f4126168a8b315abbe7a8bcf2c5b9a0eb4c1b940a9b828b05cfb0fc5750038331602a859f089b5f8693a7ce81a63d5031",
    pubKeySlot2:
      "04e569ff779ff5ab51b94d71844d3f1bfa7d23ac0ec61c2950d82457d0f1b631c2d417344ae3902fda142052c4867b8c5ce22e68c83eb7f0bf89b41e0790edcca7",
    pubKeyJub:
      "042432ed7f0482a9ea8085ea4028547d158edc8fca2903ee45e8504ed3cc2c32c224b4c8ef23aab9d1b9a87876b4b10900eb16bbac35536574f674dc1f25cb452d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20tongue-AOaArjTSQNLsFdsBJDfxx6rYFiBZrz",
  },
  {
    category: "personal",
    emoji: "😠",
    cardName: "angry face",
    unicode: "U+1F620",
    pubKeySlot1:
      "049d5ddcbf84aefe765ca12c7349f00b8f07d4ddc0b07b323edf2155b8eadf0a626082dab2291fc92e7e0012691f3e94c63bd034887770e2edbeb120a997777476",
    pubKeySlot2:
      "048b49e966e5659f4c0de6232c34525e1d3884fead0f06304718a611df7833178f3deeed4acc306b536d5af247d20c5d01410f603af23d8e8b1a7b25360ebfb54c",
    pubKeyJub:
      "041edd6ed90d16173b686102dbe6cadd82ab5029ce6179e9056fe484f30624786016f275deabc8edfc4dc2752c295516e5bead1dc2550c07a77a6ddc8c5b7200b4",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/angry%20face-MGEnV0d6GpV7st42hWzCw7rNjWEVIR",
  },
  {
    category: "personal",
    emoji: "😣",
    cardName: "persevering face",
    unicode: "U+1F623",
    pubKeySlot1:
      "04c7687b6633a15c925b44ece5147f6308a7bf142de33c925426bd2b8c990f287c6044594d3735d3cc8c6476c5e8ee116c29aba98477c36cc8b8134ce111360f1e",
    pubKeySlot2:
      "04d34b0f3a2ddf813fd45c81f4ed7f7b2067f58eecb0452814717eabed8e3d2c15ef4e8620ddc09b24d589c00ec36addfac1d72933b3054ca459e2c55434a3f159",
    pubKeyJub:
      "0413785026f79c26a0367daf50cb2d961801ba586b433b397a785380d04162c3c400e8ed47ce27640a5fdb986b34de805d99ef64f6add8db94891013689f003f58",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/persevering%20face-LREzxkducOtnIEwLdanNrjNgd4tVZN",
  },
  {
    category: "personal",
    emoji: "😭",
    cardName: "loudly crying face",
    unicode: "U+1F62D",
    pubKeySlot1:
      "04a3657753f3db54f44b75da3003053448b9fc972ced2028f6605cdd4b8f99328b3da460cf1be45788bebc66ad658c0c2589a3516aaed39c6774f248f2fc70746a",
    pubKeySlot2:
      "040b2c307822d8a0fc785098fbf3ed418df40ebbe18d4fab3c3e8832d57b82bc5269301f8d519fda3dde6ae23d6fb7f94b8799d77382ce8d8095080c374b6a13ce",
    pubKeyJub:
      "041f819eb57ceb8ef824f10d1c77c87a1253927ba655c95c9cbe0840eb0ed8975b2c0df34a9c5901aefcc6a4a816bb56354397b3a55c208e166502c9f10bbb45de",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/loudly%20crying%20face-VsSNzaAuHse707FouHYzmccnWVdK4I",
  },
  {
    category: "personal",
    emoji: "💤",
    cardName: "zzz\n",
    unicode: "U+1F4A4",
    pubKeySlot1:
      "040c437a003278cf0e02a2ec03b4d35e6c4ae312e1ebbd80c54ec4f0028aff1fdff601b22890a6795cc8e378605323da0801256f78994571fd4c773059d9e7297f",
    pubKeySlot2:
      "04648f67a71e86cb6866806899872bddf0554697220d0f989237b8cd696a886c23ea5510e461fecbe6c7b5b9593219da10c0ba51dd2a63963e998519bd5c02645f",
    pubKeyJub:
      "041610a28aa50c500592df339414a380ce4e0811a1204b742ec3334514f395bb29291ed6a3b006d5ac99c9c3aea9c676a95e04c3a747a8643160c7d9d1dbc5e5cc",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/zzz-7EfLpTWi9Ilgod2r9q7BdAM2acRxlA",
  },
  {
    category: "personal",
    emoji: "😰",
    cardName: "anxious face with sweat",
    unicode: "U+1F630",
    pubKeySlot1:
      "0418e3793312a5daf5aabfe7dbc595525663cb7d3f3dc1fa260dc5d28f84e278087d093e29f2a32795df82d0f06c9a6da3d9c46080126f290d053f7af57e7fe33d",
    pubKeySlot2:
      "04801083c79daf81d82546becf635766e0820069ad3c3e31dae77ce571028aa7d4dccda8ed55c80c651a1c60fb0bac1fe718b3486cda1dc3b25178d07bb24ab6f6",
    pubKeyJub:
      "04268b64067451a98448b82a6d6d5aa668f69bb2b888e77840ce45180908c525dd112f42579bb97a29f6ecd9f0fef4ac47e1ac6adb8d20a89677e8a42ed6ccbf51",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/anxious%20face%20with%20sweat-hK6ZSy9Rh88pAOb6otrgEwlC0bnrOu",
  },
  {
    category: "personal",
    emoji: "😲",
    cardName: "astonished face",
    unicode: "U+1F632",
    pubKeySlot1:
      "04e7322594130f43dcb42b553876db36617175a40c8fdc2233a398c6e8eb8ab65337600153ed0f00567dacc75525a1cfa2732c3a0758dd8e845e05a97ce4ecdb38",
    pubKeySlot2:
      "0459285eb508aa432fd6f9a36f828a05296aa9b13846a6241135e30ffd7891a79a6039faabf6847d4fb01b97f3c7f0f868f46555497996f8e537c94a9966e499aa",
    pubKeyJub:
      "04208874dc41c6624d9b2c316cd068fb85dd218cafd0fb95ed3a5b774353a4b1412c31ff97145f59e6b7729919d2afa83ffbad5b78bb3c3489efbfe5116ac0c66b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/astonished%20face-x8DIk4w9AgPJkl3Yv3t4R2f1hdxk5v",
  },
  {
    category: "personal",
    emoji: "😴",
    cardName: "sleeping",
    unicode: "U+1F634",
    pubKeySlot1:
      "04506f9e665e886d363ee0e5345866ff8a7c896e02220c2fd431d63249b82d78eec6f9a2eedae2f0a092bc02b7ea5077f8e4c108aaef23822779a75601f092d71b",
    pubKeySlot2:
      "0451fb76f24dfc4505ce77b1a5b3b39e17e0f744c17e0b1172b50d37f82813b883f4b07e8b3b3f7fde648b6e9262b344b854f961702f751404c551fa579f34e4a7",
    pubKeyJub:
      "040645dd5dd11f6f25de0250e6e160ebbce06bd33f5ef180ca5c889bb5125503791a142ebfcf32e3cbf487f0c571fd4c78222770f0461447d5d0e1f6f261dec89b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sleeping-Q3mHeeBLs8RI94wXhkv6jZNIxjMwID",
  },
  {
    category: "personal",
    emoji: "😸",
    cardName: "grinning cat with smiling eyes",
    unicode: "U+1F638",
    pubKeySlot1:
      "046d0ccb82387b6a97ab181e9f0260a03fb625ce82b9c4a0a9de1cc8adfbded929c871f41dbab205f3aff684d472d6a57874a75f0fff08cc0a32428dd556852ea6",
    pubKeySlot2:
      "04c45c7f92fdf8dfd2cfbceda758729f19f1e2df0ba0a1bb884c5740e1eea21d4b274aa65043acf2453193cee93a121dfdebd31d7ac874e6194a40d242fa805f95",
    pubKeyJub:
      "0410e69ee3f20db76c90430db8445a14fb429d8034234706eab38f7145a8ee906212cd16f4d4b52447e6f7227f89ebabb8492e8314b512049cb14e6421b2fade44",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/grinning%20cat%20with%20smiling%20eyes-CPbW1xiEr6OAADLdcHwzHFeh8FFM2T",
  },
  {
    category: "personal",
    emoji: "😻",
    cardName: "smiling cat with heart eyes",
    unicode: "U+1F63B",
    pubKeySlot1:
      "040a39e97af10b90eb7ee7e2f17fa73d6d8d3798a011ff1178ba571a357fbcadad222d0621995b6417cbe186c89ab3297e08f5bef37368a82399b4199f449189e4",
    pubKeySlot2:
      "04a17a0cba0b0af6a19ff3a447f3adc24e969f9c8d86e728cd221e14623abe71b93b31eaafa7d840809b02f6d04444e2fa35d7f9c5fde75343d11f84c337e11e04",
    pubKeyJub:
      "0420552f2f1c29d7389ec7f0de86a1723fa2f5a1a2b5aebf0dcc816ae808b5dd9e2da4461434ee2a0f6290d95a40e4bd1c849a8f1c03e4021e6995cdf528bace76",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/smiling%20cat%20with%20heart%20eyes-txyvK8CXpzgpqUHB7cKxVQmLgPiWy6",
  },
  {
    category: "personal",
    emoji: "😼",
    cardName: "cat with wry smile",
    unicode: "U+1F63C",
    pubKeySlot1:
      "0456f3cf8e4f7a7e27aaca055604efb8ce7fd93db0c08619558505707a18ade145e30ebf8778d6c4b29ccd3f63c5d1c7abda89dcdae8db8e8981d2c2c917c74151",
    pubKeySlot2:
      "049e2d9927954700ea0c1ca02ec3ac1ebd1f48d7e7cb37d9817706f2b1cb8e0ad0f12c6e8584de036853c440e0d017b22eec68bc1dffe2ebd5471fc04d520c3b78",
    pubKeyJub:
      "04071a7c890812aaf5715962ba1b58102ddc51e5bd983ca84e47ba866b3ffe408c28984cc5e81a05b801528b590537e52f7cfd3f2efca2b2b8ea47b561fd961a2b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cat%20with%20wry%20smile-ukSr87VYUwTw5kYVumiCVrKVRJXcoX",
  },
  {
    category: "personal",
    emoji: "🙄",
    cardName: "face with rolling eyes",
    unicode: "U+1F644",
    pubKeySlot1:
      "047528991d948fb3475ab79df6960542000424840b7cc958188d0664005bf822966424eff66180d05a51d740138d8db399e5c9b8a8d64dc1207a7a19444bd7e6b9",
    pubKeySlot2:
      "04536bceea36d7bec56054a33bf37eefe65a7f6c566cffeaaa800d6262a73cb8ebd37ae189bd7df37719279f540cd164a340bab6b2be9cfbc671cb9b0f39bf467a",
    pubKeyJub:
      "042e1dea13bba61db139d06e3e7c07fefcc5fb97a46a34438109b373e44c43d46808ef12613d518bc0f239a3b6ede97d67107e2d94ce06b7d70e5e54175c35fd9d",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20rolling%20eyes-caT72dcZy5aUngWPcgAcjmj9ZYhOmz",
  },
  {
    category: "personal",
    emoji: "🙉",
    cardName: "hear no evil monkey",
    unicode: "U+1F649",
    pubKeySlot1:
      "045da152204e219009c2fd4327f36d098ec01851fa76a526d6d1eb3dbd83fb0e084c11ad43d7e2e79c6a04d8acc5f3dd90e3e411174d43dd5415e6f8cc78f98c48",
    pubKeySlot2:
      "04819b31a76cca5175cb1eeaa31910ffdf85f52cf723d92f837fff23b9f5979a40cb900a71d505d3c97c78e0254f82df1500488eadea561559d9de0644ab2f8022",
    pubKeyJub:
      "0426fb159b8530fb4e799c12cbb582ab7a53d8d07752b078c4cc7063254e1843d80bb6d85314b7fdcaebb74309047fcd8a68d8e5806307d03311cd0b7254c42f01",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hear%20no%20evil%20monkey-IzG2FiEI7yhjJ8DjLm15dbHinZaivp",
  },
  {
    category: "personal",
    emoji: "🙏",
    cardName: "folded hands",
    unicode: "U+1F64F",
    pubKeySlot1:
      "04cafae41a9de6fd3a2dcf704f054be0a73565dc222b47584b6e6e9537b9fdc6f840725ca534e72f79e07c327a0177c21fe691a024d0c6af64835e5d0a7f74180d",
    pubKeySlot2:
      "04dab0d596496541cc05e5d84c7e72b76d7c98e00365c46c7c5e3cd09a2a56b72f36c1d60b64d4e130beae530db7335f84dbb9f67a8ba3f71d9f08fe908b391f09",
    pubKeyJub:
      "040c49891f64138b3d0f0b0f9ec2b107ffd771d20fa562b2959bfb20d5f16fbbf00b59a86bf0fdffad97633ee675faeda2582d40c56fe3a981fda5d7a354021b5c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/folded%20hands-ckoLzQ0BcIgXDsctOzGNKhAsvdIUGl",
  },
  {
    category: "personal",
    emoji: "🚬",
    cardName: "cigarette",
    unicode: "U+1F6AC",
    pubKeySlot1:
      "04d73ba04962540f839b7ff3d0bab8478a6c7de3d71cb0a6c31f763c0d0c08a7e2e04f53faea2d79adfdf8ff71bdbf4b429d2fe06e6494e9d9713a18a6b9b6953b",
    pubKeySlot2:
      "04f8d9d31d8cd6857c7a5b9d66630bd8dcfed5e196dfcef99507c812c008051ab8f23129df44dfa15ec32d72506acf9d175d6e27660902ebd2b74f28b4adb8c682",
    pubKeyJub:
      "0412fa1aa7979aa5ff68ad1ba1e07c6ec9a6e87a3472cb2f71ff8b3ba690f6ca3d11feb5b304cf54254fc7402ddd5751f43ef84c2581531921a886ded93d44eb1f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cigarette-119puZlFVObaY43kZdfsJWG4kJ6ESp",
  },
  {
    category: "personal",
    emoji: "🚲",
    cardName: "bicycle",
    unicode: "U+1F6B2",
    pubKeySlot1:
      "04bc9572c4d7a6b22bfd7169e599e7c1bfe2a2c290ad4b6ed5a9fba117a27d28c2bb280a6b95b9e4eeafe62c507f7576daf206b3901ea1a338be3446f84c046eac",
    pubKeySlot2:
      "04f93059ed4685bbafb8415f5f4f183f69a95ec1cdab3fa569ef1fd825f9e4242f6513495fb57121be24e2b1560a7276a18acb0c271c5866e3a66773614bbb70a8",
    pubKeyJub:
      "0413c03ef3d0b433f34288bce566bd95809c7e3d7b38ad705eaa2b095d647a1e2e04144363f53832bf3c80f984c454940f30cdb7ac0681b79c6c546d44103489bd",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bicycle-DzMmfQaVFjwkJQPY6jb2asb9nHzJJY",
  },
  {
    category: "personal",
    emoji: "🛶",
    cardName: "canoe",
    unicode: "U+1F6F6",
    pubKeySlot1:
      "04ff8fd6c3cd75ef2159506ab224cc60467cfa6d74bd2ccd8d3a2d1f71590ab5b66a555942fd71bb3662895dab71a67e5b85ce5078eac2ed743e663460556995ba",
    pubKeySlot2:
      "0458a31121f03dc8b4f93c0fe4dd455b7c92a328a6a88b0e906c4c2f4d67c39a98e77cbfc9fc046dd66824005349a9f0d3423e5bd928a40d14d9e5e14d573c99bb",
    pubKeyJub:
      "040c102d0211c9de44293d8e9d0f7fba8a13c3a7fac3cba26177bd8b305105fa3e0eb241403f0d2214cdd41287f92c73efc7c153639a7271845d034c3c9deda946",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/canoe-1nnt8kP3dBEO3gS3wZkGfl1crU6S9G",
  },
  {
    category: "personal",
    emoji: "🤓",
    cardName: "nerd face",
    unicode: "U+1F913",
    pubKeySlot1:
      "041d296b3df2691ea1e621ed3c7a8bf942eccc42560bb166a5fa11e048d23a85d8ba930fd7aee8f5bdd18ca4317f105ddb16c8eb9a9f70afd9b857fb9874e3f6d3",
    pubKeySlot2:
      "04b976724ff53b4913765f6802763cc807cc51d6c5e578935e834e92986a59995f374731b257ccd86cdea4ea24c4ffa874892e7b21dc099cd114d908167c29b3c5",
    pubKeyJub:
      "041949f688e58d4e01b3a8c02c326ce3ce053cf67c828c084e6b065a6411c774fc10b1f74955b8ca06b382ff95f4bc174e6e5e195e77e71e25b90560dfeba261d0",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/nerd%20face-wtZunNKOaDplcgZp9I2tvQcXyWAgDG",
  },
  {
    category: "personal",
    emoji: "🤔",
    cardName: "thinking face",
    unicode: "U+1F914",
    pubKeySlot1:
      "04ab7637bf9d118fbcdaf85d6a2d93786635b8fa75ce9a0a432d5bcc9b0625c9189407db4f756937112a58389c98ecbcfb1a782644fe2f10551f5121f70c7248cf",
    pubKeySlot2:
      "043f1f1b50ab5fe9e34225cb8d727d54914398d58ca79a35e597f965556d8c0ae66b27d290792ef2a8e59d9e456e3fad2fdb04be0732dcb0d7459737ec311f2520",
    pubKeyJub:
      "041fcd0dea601532f64cc8404656aaf4106f6e219f938e66b5bf6623e5a09e3548002467044c738a892034e41b629037bcc8f87825dee24f1b9104744733a0c069",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/thinking%20face-wXxeQOBRJq2wJLn4CIhxZLNALO9BJw",
  },
  {
    category: "personal",
    emoji: "🤗",
    cardName: "smiling face with open hands",
    unicode: "U+1F917",
    pubKeySlot1:
      "048a31f757ccefa82ef23fbf8100a90a7c4f151bde888ce9fcac64a34b97a544268da68be4c1a9d7f3e5cdfcc21857787986360fd88ea4c940fe6c939c87c42d3d",
    pubKeySlot2:
      "04b322738e3a4be44dfe767d9dca14b420ced16aa8f045dfe07da813ab74881c4dc953808fe9be5bba2838d6ff7cd3fbe9a404037de589f27431a16f188f2230d0",
    pubKeyJub:
      "04152ed2ba4888a56db68f90b583989ab54762f44507d179b07e5815c2bd166559106cfc4472107a175869db9205868eb0ac7861c2e1649af673863212ba935e89",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/smiling%20face%20with%20open%20hands-OOMp1TS6FDSAWGQrkx858jFNzdysq1",
  },
  {
    category: "personal",
    emoji: "🤠",
    cardName: "cowboy face",
    unicode: "U+1F920",
    pubKeySlot1:
      "04d5475981d6fe2e192f13a2e7588e31d8244ef3f6fc17081c0c435e5b585e68a28c0b87386658df16eedbf5370291db232acadbb879894c57751daeff0b24dc0b",
    pubKeySlot2:
      "04b742cdda33c98f12a08e228f5b077aeb8ef900b05ba87574b038e35efc32eddaac8aa59bcf1502e87c7f1fb77790c885b0e624243ea7fdf3459d1d2f1c9e0a4e",
    pubKeyJub:
      "041c7649d5fb4de6fc9f8c9cdc13662f07fe03b8dca07f84b6246df71aa7e5de510815c4f7e612756683ac8dfa9e866089aedce21104c33487dea040f68627b063",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/cowboy%20face-bq7JmybjBxTHy9s82YLzDg0oEVbCUV",
  },
  {
    category: "personal",
    emoji: "🤡",
    cardName: "clown face",
    unicode: "U+1F921",
    pubKeySlot1:
      "04d574e72451aeb0a5e2850758616a50dbd46a999d11327c8e83b46fe8f28dc3d924cc9da6e27c4245624535210f36f5f2a399817f3611e99f44093e71637179f3",
    pubKeySlot2:
      "04a53e98dc9ec0889484639478cb7664b73695c1a19d3d3533819ed886751fe17ab6f0c328a7048cb1b7bcf144f17d3026aaef78ca88c16ac2659b13898f2912fb",
    pubKeyJub:
      "0429b801fcc2070973fb89f208d195345172cdbadd353e445c351cfb56cd6371641402d31da7e0b07fd90f8abd80b5f388367e7f9af7995413aa472a64f787f1d8",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/clown%20face-wGfXZCdAbATMBMzjTkE7P3I4QFDLOK",
  },
  {
    category: "personal",
    emoji: "🤦",
    cardName: "person facepalming",
    unicode: "U+1F926",
    pubKeySlot1:
      "04a39e6e10cb1986c37d077242fab56e8452ba13440eda217e12c726285f3fa7b4308217a8e067202310a92f5f1ce8e80269fa5332f6baf850a53c4f5c5f52782b",
    pubKeySlot2:
      "04f74e3514b723ebb370179700bc0300965c9b7808cd62b315954f5455216a46ce57f0ed32b3f89d015adc1049d12be2d84cb0fcbece751f53928f910c92e8b298",
    pubKeyJub:
      "042e93c6f080744466d930d074fcf5f5cfc4e5658bc341d7830fa7e7e032c0657f12728c9bd2bc7785dcb4f07dd1ad9cfac40ca6cce7d2cc02a0f5df3c95f16bcb",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/person%20facepalming-53vEmVzQfBPlgWeHj0YMQmmOQSxTBw",
  },
  {
    category: "personal",
    emoji: "🤨",
    cardName: "face with raised eyebrow",
    unicode: "U+1F928",
    pubKeySlot1:
      "04c2e2130320b5cb9cd0df70e0778edd10549bafda2500076282b3816c738ce65991d2fe500d82e6ea60de1ba0355e5e353859a15ea4701830853e85f80c05b1fa",
    pubKeySlot2:
      "040958c4f4c15c687bef366264ee87238af411209d5e78ad0175bf02a076a5835ad20efc67f37861574faccafcaeea1256d57464c94d6ebb55983f5278d35875d9",
    pubKeyJub:
      "042574b3bb9a807fa80f1337664b2b6cc7e17538baed189713314e651c3dcdd08d2e8d07b07dd3a653eef176709014a28ac8a4e67c4d5fa69dff2ea10e295739f6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20raised%20eyebrow-ShnQ2csjPIXgo2MhIALSEO01L0PfGu",
  },
  {
    category: "personal",
    emoji: "🤬",
    cardName: "face with symbols on mouth",
    unicode: "U+1F92C",
    pubKeySlot1:
      "04b478684678214cab1c168cc99b89800b6bdf2c2b971f5b0f3807ed8a795d5656555d1cc0f764627f588696399591b73b91841f0664852a817e111d28b75f47d6",
    pubKeySlot2:
      "04b0ec5d037351d251e797f5411027839d1d389ddac926896631d4cf9dbff7ae72726eb83a6cc6ec394921de2cbfbb1df13d5a89ed5a44e584a644c166246fc91d",
    pubKeyJub:
      "0417f9f564a10e3c3c2f435af1cd1087291f8042f03f26a7682b64372f1c4079802313a8e46dbdc12ba878c73dde877b47d8325d42f070ee6bc52efc6f6c229d5e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20symbols%20on%20mouth-cA77xLMIdqGKE3wSnHrJksvrd3TqLg",
  },
  {
    category: "personal",
    emoji: "🤭",
    cardName: "face with hand over mouth",
    unicode: "U+1F92D",
    pubKeySlot1:
      "042eb7170d88aa2b954d822039d7db720e552fcdb9e783466e7a7b3039afa035572945a008b5938679767970474a73fd0636a04cb42890609413b7738272b4d47c",
    pubKeySlot2:
      "04d5784d160dfb751c9ef18b3f75a47ebd5421aadcc0d7f6fb245ac9218842010acdb964fa93e48d126f050e82f535fb299ab509c838cdee283b94bd89c3f71a44",
    pubKeyJub:
      "040ea94b06aee71a2d0163c7a088fc437eecdfea37b33969bd279e9db85fed75d117680c4c373956f8b0004e7d210e66fd560d14dbc755053382a9cda6c9cb71ac",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20hand%20over%20mouth-Tk3GjtslXM4HIlLPfDeMgi6590R4Ok",
  },
  {
    category: "personal",
    emoji: "🤱",
    cardName: "breast-feeding",
    unicode: "U+1F931",
    pubKeySlot1:
      "042c0bcfc401e8ed1685f4a792529d8028d13aa217cdc428d450708d06ad98105fd958faa8d48ca655d185c97128e7ba97be0871fbffa2a271a0cb351c72316886",
    pubKeySlot2:
      "04b25345d98b8e338cb13d473e5ea43445bf764e99e0d8c991949938645e04f01fa1e22e5802c0463b5c3b7dbdda4f9341e1d0795cd484d3b6cef75a6323637f87",
    pubKeyJub:
      "0414701cf3c167780748656c6f1260ab891cf3eea2de91746a365a180f219700d6105aa98dbea43cbe7e046017b88afc38b11cd825d5a74954eb8dd9a6874ffbb6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/breast-feeding-KbytAyvadGoJM6TJWWMyNIjpMS5sjZ",
  },
  {
    category: "personal",
    emoji: "🥁",
    cardName: "drum",
    unicode: "U+1F941",
    pubKeySlot1:
      "049b831274ab07b0e106edfa7ecfd12ca9c5662b897de3c1e3bd0c2ede2f4376bfc8fada3e7c8c41a62d309c069df8d3de08c5f6731a0b1f03d3e0569602ff4e2a",
    pubKeySlot2:
      "04bc7b4ecdacaba59d66b67812f5317ea9c62127513dcf7c140efd1312f0f0f3105dd325f3fcc7e3aacf5c506337f54f46a721c5421f074c89a2db16d2e7247c6d",
    pubKeyJub:
      "04046e63aa49d64f156e91923aa892b8f94dc09ee59445562ebbafae6bb7a983b70375b8ca83737d58726e18adf9904065b33a56e4e8c8e634a452d054ef92a1dd",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/drum-0DLXmVWf85PWC7CC5Hf42kZA9V3Iku",
  },
  {
    category: "personal",
    emoji: "🥊",
    cardName: "boxing glove",
    unicode: "U+1F94A",
    pubKeySlot1:
      "04e9d5b010cf87979245ed926ef034f4eb11f2940387e3f8f9ec0d8ef7ac9a09c577396d064c491b79cbfa858a36a968a4fc6af451f47b053776fab2faf3f482bd",
    pubKeySlot2:
      "04663a2eda85ede4bd04835b5ebb16d1310ebb40432b5d94d2e9859966952938b0922ae9c59564e98a5c63adbb91c73816cda2d928fa8c5a9a7b31cb6a9754dbe5",
    pubKeyJub:
      "042529d1419ecf05efff6714353af8beb0dc5976d0e535e4a743ca09d490641ad4216855b6db2d19640ddcbe7150de8ba0745c8088cf8772a74cf4846e115417a8",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/boxing%20glove-4X9sNkIL4KtdpFUnTk1miWtwr4m6x1",
  },
  {
    category: "personal",
    emoji: "🥏",
    cardName: "flying disc",
    unicode: "U+1F94F",
    pubKeySlot1:
      "0439f07611f0c598d8d297fa7c80addc8beb1739244be9e157b46cc5e7a7e6b4d3e976f5c44467c36968e486284e5d6a57d12af47fcd7de73e3fb15f427f2eb258",
    pubKeySlot2:
      "04500d3053506d36e52ffb3c30cbe094840ae64210a39c8e6995738fbf1501ae49be6f6837ca6fe640f56bfb97c24852748915c2f03c88571db5b857b3157015cb",
    pubKeyJub:
      "0420aa2b85e927693f367e9faf21b51a0d57a0189e8b1948f56626ed3f611608d7283eedbf349a9148d2f44f4cfc7ab6958ac831648b9188170c494a95c8fb207c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/flying%20disc-5mQbTTrp7raxDBzKPBBmnRWXY8vFB2",
  },
  {
    category: "personal",
    emoji: "🥐",
    cardName: "croissant",
    unicode: "U+1F950",
    pubKeySlot1:
      "049814e8565eb5bdb75a959e12a783451eb3bc741e28fb17fb87863e5c46da0dd918e61159618788230c6c09af6734b7f0eb8667cd482763a7d4c5672cff36c72e",
    pubKeySlot2:
      "04313e181fb3c3316890b2747ceb1b753551cd0c321ec27b8a460ccea8568d055bac5cf74a07232924c5885cd72cce125261b1013d24761548d6952e709705cdf8",
    pubKeyJub:
      "040886f72971038c8ee88b2b9a9ccfddf0349d2c035284bf9d2a4ec5323124ac3113d1d7c6bca62ce12f294d71f9132960b3a8602f4515822fbe5200bc41900ded",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/croissant-LZNBuInlumR8eA6AgQSzZM30kSh0lG",
  },
  {
    category: "personal",
    emoji: "🥓",
    cardName: "bacon",
    unicode: "U+1F953",
    pubKeySlot1:
      "047533f85d471eee2dd785cafad6e7c8e7667a4cb4f102a1ac611095f8ddae427e7f7a1b376c5337d0ecbb48d61d2d25a21b5e14eacbf5e53d2322de9d93c5311a",
    pubKeySlot2:
      "04b00b79c9baf25bfcc74e0e6b8ddf082bed829c35ebf946e4bd4b824738a6916a4814661e0907406751c08ecfa52bd85b3dde73fb2108519648db7c8e65dbe159",
    pubKeyJub:
      "0410be4958b172fc63633a07108eab94dc8b32ee0b858d01ff43e721683571f5cb08042be408be67fa34a56a1727665fc72a3b8be053992322bb347b823aa68942",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bacon-WP49oEM80v1BnnvybdUrNR76tW9WUj",
  },
  {
    category: "personal",
    emoji: "🥕",
    cardName: "carrot",
    unicode: "U+1F955",
    pubKeySlot1:
      "0444806ac764cf53b307755614b2a0f0f36d4da470072d9e0f59c37dddef072341c05f6dbcc00777cb4aa1c22bea8f11bd30038b4b5c1503bffb4b3c5e244f06c6",
    pubKeySlot2:
      "04eb09866a2acd9a80b6a6edf7701d473174ddee1ce4c259f5e84c2996e976e5006ad40ba16f07fa95560c66da34bfecf276271066c5162b90f4b435479b83a39f",
    pubKeyJub:
      "041d448f4d4c91ee701dc03b4991854b303fcf2dcda4aed688f330b82b3c1cba972bacd10b6b00757b476efd1caf86288a1aed0951bea0085ee905300ba474cd88",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/carrot-Uo4bpMaDrhFeaOiyoFp2LUz18YJlvI",
  },
  {
    category: "personal",
    emoji: "🥜",
    cardName: "peanuts",
    unicode: "U+1F955",
    pubKeySlot1:
      "04925014ed034e6a61331883848d408c9b35b3a21a987244b20fef69a3a8885bb852ffa45f9899af740a48135a56dc766c304c989e42e30803cbf23b16a7e0553b",
    pubKeySlot2:
      "049be28d77e83fd74a365ae517b0cf7185208366cf45fc7b20b5980201817f19dbb08f781fd5b77748410f701a72fc30fbe2552922e79fda9bf747958d3c1d8576",
    pubKeyJub:
      "0403ac319c63d9952e1ffa40672ef180331123f17cc0d82b3df490cc441602eec707f141344a5063294a85995e904597a71e3e817f50696e300af34296424deb40",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/peanuts-gPP7rg6tkeCFahrqKALAXO6ek8KDGa",
  },
  {
    category: "personal",
    emoji: "🥞",
    cardName: "pancakes",
    unicode: "U+1F95E",
    pubKeySlot1:
      "044d5d251c76cf5ae8d430d6fa8415cef92a1f3ba67bb91692da48d29f96565f29cc0a30252d2aeec635bfa934ee7cb2077a8f7a4b4b75771dbd1695a24df8af88",
    pubKeySlot2:
      "046ad5443af7e92183c79f1501249e37dfab415643dd2d67e1dcb2a061a15ab6712d2ea2b3fa23dc9f384ed5933920c510d9ab846d26faab7a39a36166da72f7d4",
    pubKeyJub:
      "040ab5f87451f4791c7834fb37dc6ec273d18780961a3ad4f173081f73fb9565b227fdef97ad9dc5d8493c618b6e37a27f369886fa924aa51884b2cf1485bafac3",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/pancakes-fzmVzDcZQAbFzulApQFWZ9vDPnSxRx",
  },
  {
    category: "personal",
    emoji: "🥨",
    cardName: "pretzel",
    unicode: "U+1F968",
    pubKeySlot1:
      "0451310c06eb9a12c8f5685ffeed162862b97ca4975aa6c0830dd1bd23a353f31e1e23d5a0837cfd1c1afe4db69ebcb68357204ed41a200fbe449583f2f46ba44f",
    pubKeySlot2:
      "045c0b2ef360b65303dad4e084414bfb85e25fff847028ff4af45c63d716f3e76473454dfe67b130d33473dd3929a209ddb51cc03cfe184dc67420e6e58be9581c",
    pubKeyJub:
      "0419732e0cfedc56fff6c0cee13cf420c0df1095a94eca8d5f5100d8c1118c87b70dc44d7c56751fda81d19ed1396d26fcd95674ed741319df33bc20de6a823e9e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/pretzel-TFbRIq2R7HQ2DHCkbiHaNwRwblwzgq",
  },
  {
    category: "personal",
    emoji: "🥬",
    cardName: "leafy green",
    unicode: "U+1F96C",
    pubKeySlot1:
      "04cd3e7d3b1f03f45c49f133d172eb31a396069c3dd897b34a0cd953f7dbd83a11437c6b9bd8207f708f952e38b219970af6c396e6dc9f8239342c4fe46f0d6c1e",
    pubKeySlot2:
      "04c23fb78214dbc211e0ee636175738b9a0d3b3e1c2222977d9d18f6807cb815ee38a9d8eab33cd881acd6aebd029fa7ae7f4e43986cdd640c17ee13f93e74d21f",
    pubKeyJub:
      "0407a07b2d156ebf0972c2d8967f2a1eb9af0dfe20402074211236597405d32541198301b3e2e705849021da4c19bd9fb1d28bdaae4948fadf1afeb94cd3ed136c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/leafy%20green-Xav0ajG6YQWc5NMuiY0DlIks6h5gR6",
  },
  {
    category: "personal",
    emoji: "🥱",
    cardName: "yawning face",
    unicode: "U+1F971",
    pubKeySlot1:
      "04f3637a5a61223ed00636995311b2ea02983eef2fed6f72d3dc04928a190827656049b601cd7dc27355defaf9fc8e765939b997df17070914ad147f460e248928",
    pubKeySlot2:
      "045109f32ec782ceda37d2b468e4c5408718296da54e6f3897cda27d81ed9e3f07ad4b3b9754005252a4847f14400974e713a5c7da8bc2127316103cfdc36edb7f",
    pubKeyJub:
      "040749cdd92ed00ab0d56ce60e86ce95cc867433b5e718449194a9972570db4b352877bbccddee03d7f53a3b6ef19635ba5bee134c33b07414dd027fc9592b9f7f",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/yawning%20face-YeSjbZTBeqmlewT1Mtoc9meyTzu4YZ",
  },
  {
    category: "personal",
    emoji: "🥸",
    cardName: "disguised face",
    unicode: "U+1F978",
    pubKeySlot1:
      "04b5c8b22094e49b3c383d46f5292c034ab90f520995e93a81539db046c2c192e879605c117a6d860f636d638eef2e10fbe706c1a4d5eda45fb2b6f7d096cb7946",
    pubKeySlot2:
      "040b8814274b5fc0ad263cfd6870cdb002e5899e8f71534e3670ea7305ddead791a6d9799bf22afd114edf42e111f200b85b25a18007b5ba431d201dd9c66bbfbb",
    pubKeyJub:
      "040cda2f7982adcde7e99892d3df494fca6a43a7138577de8a36894e22138e0c6a1512f9cf0bac88dc5f15a169db70886de33bcaa98a7f338a2e93ed08542429f6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/disguised%20face-c1KWO8oXqXQWqaevL02dqHRiFT2hYt",
  },
  {
    category: "personal",
    emoji: "🦄",
    cardName: "unicorn",
    unicode: "U+1F984",
    pubKeySlot1:
      "0493d6ea81bc188301ea84c6bc7dea26b8fd04a240875e2a50577562826c878fe151a9f97ff165bedab07dafe0a307874b4aee7496e6228db4f1ea9f8245b79996",
    pubKeySlot2:
      "0433f8773f8c844d13551d8b35ae072ecaef9e0b5be50d55efd10ad6daf079ea7ca1d929d68c6d259c444a38731f970c2fe2aefd33952e518d09954b774585986a",
    pubKeyJub:
      "040804650d12891ab48fe7d6bbad20983630dcfb90b2adb70d65bfab232c76cd3b23f0f01729c2d897153b296639328685195ef8889113b2c6e2aef8641607b769",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/unicorn-QypRptDuLx28txueq3vy7uJNtbgLCj",
  },
  {
    category: "personal",
    emoji: "🦈",
    cardName: "shark",
    unicode: "U+1F988",
    pubKeySlot1:
      "04a652456a06342b06f9e187e500f97e63895ca8be4cb376dc355ca29c27dfc2cae4fce5548399f0c617fbc6360f0830d0b416e9ad1a278a39ca21f5222d14abc6",
    pubKeySlot2:
      "04dc65be3ea4259c8f73728328e657544d3d5e3e00322927cc42750ca8e51c4f4620e6d76b02a2e31d44f5c2c25d1697925aba5045a20bb518783b9792cbf24292",
    pubKeyJub:
      "04172d5b2c8c06616bf9c2d4ca22d0efeabb28a8327eb7ab24bd10958e36b70ebc2e9359c562690c14727c6a280eabe992cc1bc4d6fc9fc8d89e5d9ffb43f533c0",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/shark-SEiteoae5KO7gZaKF7aM0WGBeNaqUT",
  },
  {
    category: "personal",
    emoji: "🦊",
    cardName: "fox",
    unicode: "U+1F98A",
    pubKeySlot1:
      "0496392c0b10e95d4ef89e3734eabce24a30c403371fcc12d076ecdf91699fedb12ae3ec205691c1b22f930b86a7afb4c5568be52f1d6955545627d4a95654348f",
    pubKeySlot2:
      "0474043ff1c11e1a230905b340ca9b18d209e9569171510251598204c1de81e7cb8885678ac081270d0b0c4d39ca34a5aee140213ee58265e83273f3381eda7b00",
    pubKeyJub:
      "04051d34c46e67b57c5bc4a1b09596ac2e980217d4397cc30dc5dd89187891a01b26bbf26429af85a43cf5b28f58f676d46aadcea9158af56ec3669bcc9bd50ce6",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fox-CTq2j85OJfzU8y4Yo87wjkBRqxGJHb",
  },
  {
    category: "personal",
    emoji: "🦌",
    cardName: "deer",
    unicode: "U+1F98C",
    pubKeySlot1:
      "04300ac4cb72ec642a17d9682297532151600018d9c1068b0f0252fc10ae0643c3e9f9969045c84ce8e22f1d2be6b92e29e67f73c80b71a736c6f42c67dac9e7f7",
    pubKeySlot2:
      "0490d51029b75b04d12e7f6c464a1a7d57510fb875eff9462ad6ec0c59e95a82a52415d197d79f5aaf337cff2a6302cbc67cd81372ba77dabb0597227ab74de462",
    pubKeyJub:
      "040bbbdc455900e8562ad2c0d441d7cef10c3a4223bfc9bb609542c7faea8f2dc6299e0378085f83000d9633f846e7f7c3f95a4c12a1f24a006b04296dc2731f0b",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/deer-52y6DelvURQElYO5QLrbV4JE6sXVan",
  },
  {
    category: "personal",
    emoji: "🦔",
    cardName: "hedgehog",
    unicode: "U+1F994",
    pubKeySlot1:
      "04a528fcc71324eb4d750a21a0c8d15bdc50f2db3217e9f005b13ef90d8f45b2129d7282c06b569f1a710f8edef52739d71570d5fa933fc9e94c826919f89a33df",
    pubKeySlot2:
      "042c96911087f0d3234896ebfec8c162d94ca82e98ae8cd840143eebe099ae408ce3e70156142e5c176fb05176a7f585fa5b4374693267382f3df46613a6ae612a",
    pubKeyJub:
      "042f1dde64a7e7bf88f21fb8e42607e96e94d1139d7e7178e6dc1db8a4fdd927170a7de2002a31384b141fd6475565a38bb17434d909ce14a2ce9845a423671661",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/hedgehog-t9cyOp3cGAvR1uE3EmJAcisejoLcFW",
  },
  {
    category: "personal",
    emoji: "🦚",
    cardName: "peacock",
    unicode: "U+1F99A",
    pubKeySlot1:
      "0401b666d91571ca1e3799b564def85ea1324e8e9a3508b5c02ffc33f7a4904047882375b34edf9755abc2f400e245a43f01241df2db5790e67581b723453eaee9",
    pubKeySlot2:
      "044f2cbc004752593a8c841c4e7923e01b664add7f2c8e87517ae4394da2bca045e6667a25725b0a1e4d48716a85762e2ee53ef083243758e3e5c304a8fbfae76b",
    pubKeyJub:
      "0411c3e8fbc4a4b5192a5ec6f4d1da4201f0bbefe4bc7649e7dd99f4aafe16aad51f036179b94027273c335ea6b876a5d60d05e341ded788b1422b0b2986f99d76",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/peacock-elGylyydsQY8qex62TcLsbC6k4BtgA",
  },
  {
    category: "personal",
    emoji: "🦜",
    cardName: "parrot",
    unicode: "U+1F99C",
    pubKeySlot1:
      "043db7bdffd8a8c50f61ac2582a6278578439d9fc557d0c3b563108061239f15a7c29c753c2db3a16880d4fd3d26d0a37bb8a60534472de4860549536bc929542b",
    pubKeySlot2:
      "04e09fab87dfdfbcb0cbed24f492f8baee673675bab91cc6d15026c76c07d55f696b9f9b57a9fa64b65eb6d253b344ccf24e02dc176cfcc2dde72df273a7767be6",
    pubKeyJub:
      "041aad645b0fa90e7e3e74effe7f717ff261cb38f0baafd45cd89bcdb4658d166426c87b3c3519e354e4272be32c331c25736f8ddfa06386d34265f58091e3edbc",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/parrot-d9NJZaRpb2AEONN65ZxeznqZD0mXMo",
  },
  {
    category: "personal",
    emoji: "🦢",
    cardName: "swan",
    unicode: "U+1F9A2",
    pubKeySlot1:
      "043ecf17b8e7d730d96d75ff26aa09cabcb7f48a6492563b602d01108c49e6819423f7df5101548834ebf267f4550b93c5366fa0ed91c92f7fd9a82c6dde356bd0",
    pubKeySlot2:
      "0425bcd00fb9bc37ea88160ad315ce020b68fee30c89a66e79d3abc2ca5c24556dceb0cc401a4011343d17aaa6c582928523df315da01094dd81dd60b931c41688",
    pubKeyJub:
      "040f179704dd2b6955d9f2ca25bdc97e355964ba55270179ea28a1f0837637295c186f952bec788873044681a9a1de380b3a973d9c0211b8ebfb7e72090134bdd9",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/swan-SXWmEf8ZkkiKgUSGNWVELYwlj0zZcd",
  },
  {
    category: "personal",
    emoji: "🦩",
    cardName: "flamingo",
    unicode: "U+1F9A9",
    pubKeySlot1:
      "04d21bc6f85d6bfc9106d4941c852e3cda1b3390594b77af269e0878ec3992d557c6f7bcf60828d8f75ad27e6ea45abac381c79ce59aeed48d66853495cde02708",
    pubKeySlot2:
      "04b7543b29e82d8dab263a85d1f81776a21d9bc0ebfed98a3b0beef95c0155eab7c536e785ac50041fe21dd4d8c43da2f8ff82c9c4ce863aada25893cea8608971",
    pubKeyJub:
      "04238677b0127125d6330bcaa2d548137a0d75b4432b189ae9df0f0d6e905bfbb70447a60b146561fc463e9e43fd8551970d2d861df4c53721437a7c729f189a11",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/flamingo-rKaRvhXtUh1r0om4slLj7DZFvCXduH",
  },
  {
    category: "personal",
    emoji: "🧐",
    cardName: "face with monocle",
    unicode: "U+1F9D0",
    pubKeySlot1:
      "042c71acb2a13be4c9b7adfa9de8b7f47c73b217bcda2e6799a766c6abf127b404345f818b4ab552b49d4ed29b8fd84bacd0eee1fcd79676fc5b5de0c9b108255b",
    pubKeySlot2:
      "04eaa90ff481b4361cd1cfc4f9dab5c39ec536bf125b6f71481828f5524376cd990f7d06dabf834ff2c88973b2a1c8267e7e0776a2f7c3fb7c9a9d9c33157174ef",
    pubKeyJub:
      "042d2817dfbf4c3bc740ca71164499da32bbf44a35c4139a9f073b4dca6c9852fd15990896329809695aacb6213e6bd0e6a0d44bd8e520e49335dbf4676ef28629",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/face%20with%20monocle-wsEJJpE1nHiWrQIpk8PNATFuKXqgb3",
  },
  {
    category: "personal",
    emoji: "🫛",
    cardName: "pea pod",
    unicode: "U+1FADB",
    pubKeySlot1:
      "042a3e60bb42eb7deac7e97c583e44bbbd286df74ce262e86d9e6f9ec0d52060eec7bec47dc9cdeea9b89ad1c057df1fd022e4fd97fba516298906d7e591ef11fe",
    pubKeySlot2:
      "04ac09e365c0a6e48e117af6580fcd2edafb23ca5d2e034e008ec7db7f9c87886c8c3fa2b7e14a2e3eb95baaa308b2647785884d5d87214ac35a6e9b03d7d813b9",
    pubKeyJub:
      "040aa4b7a3633b5a13a712339a74f64c7cc7511ce149087f257adc0c4f7d5e02391a4af0cc7fc444513ad5600e37e1ebaeb20e0f48ea8d94a97253ca1775d6ba04",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/pea%20pod-s6H0z9gdN6NIHMmDwobh3gd9OBKcw4",
  },
  {
    category: "personal",
    emoji: "🧛",
    cardName: "vampire",
    unicode: "U+1F9DB",
    pubKeySlot1:
      "04a51f3cd1034a510d99552302ea261be7f915536eb5af5850433f19985d0113f2dfbd9737b338252f89a78f277d025e89cf53269c130761191c34fbbef33ce075",
    pubKeySlot2:
      "0455cceda7e314ddea548fff07ae5fe0f0449fbd73d5c0c4532f9a748e65567fc6da1a3100de9fb57391514ddd21aa155476a58998c67f401c8c8d5ab7266fd9f8",
    pubKeyJub:
      "04284f2af9f7745539c18c8ba2baf9ef02c8babfaea605349fdad208045f713d772403888314c36e2623b8e76a5753646e2efd142f6c6026faa3bad9de2fc1d4f9",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/vampire-FGOSCVpkvhPdgmiuNcHCSz7FaC7erW",
  },
  {
    category: "personal",
    emoji: "🧦",
    cardName: "socks",
    unicode: "U+1F9E6",
    pubKeySlot1:
      "04e88b0e00fa6cc4ff5ab7159daf1ca2ee963a474ec7147a31d7cbd5300f301ab36e01095e64895e0fa0adb1684073f6df6f7659bcb9da8f15f182ff0af7273909",
    pubKeySlot2:
      "04b5ddb13b20bcf095a80fe07dfa4d92f2fc3f1ccfa3ddfabb46ffa8092f893c8d0f07005f39009739b0af5072dd877ebd5d875b77d22332f059fb723e03e7c1db",
    pubKeyJub:
      "041e57d3ea9ed89a252fd21de06f265a7d652ba5ddbb46bf5bbba1641b8e5f87e508954e87716d7f93c2ec6953888080ec5778523fa7b954f4b1f896f456ee1647",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/socks-dolziaMFHniD2HNLjsBzwOT4Jy8wLF",
  },
  {
    category: "personal",
    emoji: "🧪",
    cardName: "test tube",
    unicode: "U+1F9EA",
    pubKeySlot1:
      "0472b1ae6feceb58be03eb0d3dd5b575997821a6c21c591389ef53aab01967f2bbcd10a3a49282cef4f1ecc58d6c84bf1e569ab08067316f407f21cef062a44efa",
    pubKeySlot2:
      "0488285962f9babb3fa83a8fc6c2c645acdbc88bc4c8264eaec87787c6ef472009f7b913812d67cd69fed9f7e4345eafd75b0dd5a6b4bed6a7a8a4b5e8ec3b8f02",
    pubKeyJub:
      "04139cf1a9ae41bc35a46d533603ec3bde86fc29b0439b66f9c43680c8d085765e2aff302a847d5d0c246ac2daab7e0053fd6bea9700b3b4c210f18d7665449c34",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/test%20tube-XDKsd5KS0Wf0iOJbtvoCqjA4BnVZfX",
  },
  {
    category: "personal",
    emoji: "🧸",
    cardName: "teddy bear",
    unicode: "U+1F9F8",
    pubKeySlot1:
      "04d442c88f74291788a90ea3ab87edd41c20fb66acf14a06b84295af6f2e8531726069350839c6ff637c47219decf7bc2b99bec799bca05570b7df569c3647f359",
    pubKeySlot2:
      "049d0cf0247ef8a63a472d790e257bdf7138a90a6d98dd620fcc916861495de957e3b1a7e3e40238fbb5fc4646706005006609ebe4d742c5304a9e2e13886c0815",
    pubKeyJub:
      "0401ffda6979e9b384ec759d6b68d959e292eb8534951a3ca11fed7574e88f9f5b301aab5bf3660a31586a39b21724313f57d28af6be0c8fcb1875b97f3e6e904e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/teddy%20bear-wm9W198UfmGnVBB3GO9IiU9ugG8iDP",
  },
  {
    category: "personal",
    emoji: "🧽",
    cardName: "sponge",
    unicode: "U+1F9FD",
    pubKeySlot1:
      "041896c0e43b8e04951d58c2e9ac8113a5fb30d4b352b654dbf82568898f0833fa360d9d9632df5107b74d94bd26cb537166494caf041cc7af51219a8ec1c8666a",
    pubKeySlot2:
      "0451cb089227d9ce3107d9c44e285288fbf01844517abce1c035ed04927715dc23ff39ac8ce3d8cdd09bbd05ed0a8ac2355a9d7b0a6df03906059c03358c9e2ffb",
    pubKeyJub:
      "0425aed1e6b8706911e74ee17f901128c0af22713e123f1c549ff2a0604670455f1b2a27b84a8534791f5838310e076b83b15faf5bec6b10c023f54e50d0a16112",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/sponge-UACRMBfuGqybd5CZBjcrT6y1R5yjnG",
  },
  {
    category: "personal",
    emoji: "🪖",
    cardName: "military helmet",
    unicode: "U+1FA96",
    pubKeySlot1:
      "04b5605586cb151c08d6d5212c3914b4bd756ea4141e93e70975a5be4722e6a15d532fdf37c3a5b255cba267c7155640bed926526d07d0e0eb71eb86115c1b8bf3",
    pubKeySlot2:
      "04b6fabea615c210529ad8152c757dead64167dd4e5ed4ffff8836eebd9f72ea701f871a94e8f682fefa62aa4ee9cbc387cae0b48fb68823964942245b21028a5f",
    pubKeyJub:
      "040ef8ab110180db7f665eac277f749fd184a1fdebe2340b646fdd7042513b27001ac0c2191531a703737b55ad5cb5d79f04728c5292de9e528c7e96eec95f6a58",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/military%20helmet-76X1RKP8pRzRVRGb2PBtFEy1wuMBTT",
  },
  {
    category: "personal",
    emoji: "🪰",
    cardName: "fly",
    unicode: "U+1FAB0",
    pubKeySlot1:
      "04b219373cbc8d594c5396207fe86d39622c6752ae4c07cda6607f0dc6dfc51d2943517984f9d068f0c26bca2836e6f834fe18fbc347e3773645ffe3ca75b38e80",
    pubKeySlot2:
      "04073011e45db4fd6b0efdbbd1c5a7360ab6d8d493089726aceacaff4daff86fd477bb97bebde08f14166cdea6dafe527b1c222f3d552f53724ebe7917d7dab034",
    pubKeyJub:
      "0411638b067d86cdf93a98cb80157e526d01e41db4817cb257b6b04fbf51505fd91f79fdc7d682980c6b99a6d8b2d82ea60add0ba1d95d3b7aafddf92bec6da52a",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/fly-Daufl5Vm8TAafN3WLeBuzgFtFeDK1Z",
  },
  {
    category: "personal",
    emoji: "🫧",
    cardName: "bubbles",
    unicode: "U+1FAE7",
    pubKeySlot1:
      "046293337d84f9621e666ae5ac72e91a1f82fdf0bddfe406e78839c39677087263de5777f52c4eae5e7a8b6e39a59706ddac5168d4c72b1429d08562913635f1df",
    pubKeySlot2:
      "045cb85f9bb8d38c53fb21188772038d3d9ba3c419c4826c11338eeea667fa97071f5fa54d2b2ac75be017dd6eb175338d8d9d0e6eeacc417ba287dcd6b6d2f030",
    pubKeyJub:
      "041fafca80d8d2ae27b75c57662e17f8a3a24c394507ac7f006061ea2972a3b45a1c8f70305c99e662785b392da63695897e9f429b1f8bf8f6f205c555c1003d7c",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/bubbles-7XyMWOIo4vfvuahC6YCraRCjbStVTy",
  },
  {
    category: "other",
    emoji: "🦤",
    cardName: "jubjub",
    unicode: "U+1F9A4",
    imageBlobUrl: "",
    pubKeySlot1:
      "04faf107d60ad30683ba96801141d10bec632fdf0389e3e41aeb4d98235015be777eeb39522db332858166c6f63ad14bbf53869b1cdc63ee45bedaf36df990b857",
    pubKeySlot2:
      "0412dd4cca36dff5f19018ba55e278ab154204e37320ff05cc1a518a2dc8b544d1767c1fa3e5370b4f359769e2bf6b5cc10755275438a7faa1752d51cd78056d89",
    pubKeyJub:
      "040417d56d0f5e13eaed6a878a26ac73d70203ed919e4de0cc965b55e1b4abfd512a9e712ded87d3d23f5cd42e3fa0f6714186e83e4da392253fe4e2e492c11f38",
  },
  {
    category: "other",
    emoji: "🍭",
    cardName: "test lollipop",
    unicode: "U+1F36D",
    imageBlobUrl: "",
    pubKeySlot1: "",
    pubKeySlot2: "",
    pubKeyJub:
      "0407258C81D3DE9F17FFADFCD8CE1CBCAD83027A7FD0A3221FF03CFD1DFBE0CDDE04D68FC27A9F3F0A0BF480326CE5DCD2A9CBFCA34D4098E6A60DA4AE64281950",
  },
  {
    category: "other",
    emoji: "💳",
    cardName: "test credit card",
    unicode: "U+1F4B3",
    imageBlobUrl: "",
    pubKeySlot1: "",
    pubKeySlot2: "",
    pubKeyJub:
      "040902129E2195B5DEDC2F9B060E846CE6FF6B6A32794A5BA22F3FA03B068F90A52635451C65448273303F2D403F92FF57FD10A67B1B956B3258A1AA5F4F88B5CB",
  },
];
