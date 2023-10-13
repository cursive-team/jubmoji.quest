import {
  addJubmoji,
  clearJubmojis,
  loadJubmojis,
} from "@/lib/dev_localStorage";
import { cardPubKeys } from "@/lib/dev_mockData/cardPubKeys";
import { messageSignatures } from "@/lib/dev_mockData/msgSigs";
import { nonceSignatures } from "@/lib/dev_mockData/nonceSigs";
import { Jubmoji } from "@/lib/dev_types";
import { getJubmojiFromNonceSignature } from "@/lib/dev_util/proving";
import { recoverArbitraryMessageHash } from "@/lib/dev_util/signature";
import React, { useEffect, useState } from "react";

export default function Dev_TapPage() {
  const [jubmojis, setJubmojis] = useState<Jubmoji[]>([]);

  const fetchJubmojis = async () => {
    const jubmojis = await loadJubmojis();
    setJubmojis(jubmojis);
  };

  useEffect(() => {
    fetchJubmojis();
  }, []);

  const addMockJubmoji = async (index: number) => {
    console.log(`Adding Mock Jubmoji with index: ${index}`);

    const jubmoji = getJubmojiFromNonceSignature(nonceSignatures[index]);
    await addJubmoji(jubmoji);
    await fetchJubmojis();
  };

  const clearAllJubmojis = async () => {
    console.log("Clearing All Jubmojis");

    clearJubmojis();
    await fetchJubmojis();
  };

  const submitMockCardholderSignature = async () => {
    console.log("Submitting Mock Cardholder Signature");

    const msgSig = messageSignatures[0];
    const msgHash = recoverArbitraryMessageHash(msgSig.message);
    const pubKey = cardPubKeys[msgSig.pubKeyIndex].pubKeyWeierstrass;

    const response = await fetch("/api/dev_cardholder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sig: msgSig.sig,
        msgHash: msgHash,
        pubKey: pubKey,
      }),
    });

    const json = await response.json();

    alert("Verified: " + json.verified.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-800 flex flex-col items-center justify-center space-y-4">
      <div className="text-white text-2xl font-bold mb-8">Manage Jubmojis</div>

      <div className="mt-6 w-1/3 bg-white p-4 rounded shadow">
        <div className="font-bold mb-2 text-xl">My Jubmojis:</div>
        <ul>
          {jubmojis.map((jubmoji, idx) => {
            const card = cardPubKeys[jubmoji.pubKeyIndex];
            return (
              <li key={idx} className="mb-1">
                {card.name + ": " + jubmoji.msgNonce.toString()}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap space-x-2 space-y-4">
        <button
          onClick={() => addMockJubmoji(0)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Robot 0
        </button>
        <button
          onClick={() => addMockJubmoji(1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Robot 1
        </button>
        <button
          onClick={() => addMockJubmoji(2)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Invader 0
        </button>
        <button
          onClick={() => addMockJubmoji(3)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Invader 1
        </button>
        <button
          onClick={() => addMockJubmoji(4)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Ninja 0
        </button>
        <button
          onClick={() => addMockJubmoji(5)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          Ninja 1
        </button>
      </div>

      <button
        onClick={clearAllJubmojis}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded shadow text-white mt-6"
      >
        Clear All Jubmojis
      </button>

      <button
        onClick={submitMockCardholderSignature}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded shadow text-white mt-6"
      >
        Mock Cardholder Signature
      </button>
    </div>
  );
}
