import fs from "fs";
import {
  cardPubKeys,
  CardPubKey,
  OriginalCardPubKey,
} from "../data/cardPubKeys";
// import { put } from "@vercel/blob";

const setupImageLink = async () => {
  let newPubKeys: CardPubKey[] = [];
  let ct = 0;

  for (const cardPubKey of cardPubKeys) {
    // pull airtable image link from original CSV
    const urlPattern = /\(https:\/\/v5\.airtableusercontent\.com.*?\)/;
    if (cardPubKey.cardImage === undefined) continue;
    const match = cardPubKey.cardImage.match(urlPattern);
    const url = match ? match[0].slice(1, -1) : null;
    if (url === null) continue;
    console.log(url);

    // get jpeg data
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const blob = new Blob([data], { type: "image/jpeg" });

    // add to blob, commented out to avoid needing @vercel/blob pkg
    // const { url: blobUrl } = await put(cardPubKey.cardName, blob, {
    //   access: "public",
    //   contentType: "image/jpeg",
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    // });

    // make new JSON
    let newCardPubKey: OriginalCardPubKey = { ...cardPubKey };
    // newCardPubKey.imageBlobUrl = blobUrl;

    newPubKeys.push(newCardPubKey);
    ct += 1;
    console.log(ct);
  }

  // output newPubkeys as a JSON file
  fs.writeFileSync("newPubKeys.json", JSON.stringify(newPubKeys, null, 2));
};

setupImageLink();
