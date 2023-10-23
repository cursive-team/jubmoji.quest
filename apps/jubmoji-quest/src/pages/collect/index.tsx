import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { detectIncognito } from "detectincognitojs";
import {
  Jubmoji,
  NonceSignature,
  cardPubKeys,
  getJubmojiFromNonceSignature,
} from "jubmoji-api";
import { addJubmoji } from "@/lib/localStorage";

export default function CollectJubmojiPage() {
  const router = useRouter();
  const params = useParams();

  const [collectedJubmoji, setCollectedJubmoji] = useState<Jubmoji>();

  // ensure users do not go to rest of app if they are in incognito
  const alertIncognito = async () => {
    const isIncognito = await detectIncognito();
    if (isIncognito.isPrivate) {
      alert(
        "Please copy this link into a non-incognito tab in order to save your Jubmojis!"
      );
    }
  };

  useEffect(() => {
    const getJubmojiFromUrl = async () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(location.hash.slice(1));
        const sig = getHaLoArgs(urlParams);
        if (!sig) {
          router.push("/");
          return;
        }
        const realJubmoji = getJubmojiFromNonceSignature(sig);
        setCollectedJubmoji(realJubmoji);
        await addJubmoji(realJubmoji);
      }
    }

    getJubmojiFromUrl();
  }, [params, router]);

  return (
    <>
      <div className="flex justify-center items-center">
        <span>Loading...</span>
      </div>
    </>
  );
}

function getHaLoArgs(params: URLSearchParams): NonceSignature | undefined {
  const pkN = params.get("pkN");
  const rnd = params.get("rnd");
  const rndsig = params.get("rndsig");

  if (!pkN || !rnd || !rndsig) {
    return undefined;
  }

  const strippedPkN = pkN.substring(4);
  let pubKeyIndex = -1;
  for (const [index, card] of Array.from(cardPubKeys.entries())) {
    if (card.pubKeyJub.toLowerCase() === strippedPkN.toLowerCase()) {
      pubKeyIndex = index;
      break;
    }
  }
  if (pubKeyIndex === -1) {
    return undefined;
  }

  return {
    nonce: parseInt(rnd?.substring(0, 8), 16),
    rand: rnd.substring(8),
    sig: rndsig,
    pubKeyIndex,
  };
}
