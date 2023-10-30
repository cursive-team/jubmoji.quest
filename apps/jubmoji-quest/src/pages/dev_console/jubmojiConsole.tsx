import {
  addJubmoji,
  clearJubmojis,
  loadJubmojis,
  writeJubmojis,
} from "../../lib/localStorage";
import {
  Jubmoji,
  cardPubKeys,
  nonceSignatures,
  getJubmojiFromNonceSignature,
  recoverCounterMessageHash,
  getCardPubKeyFromIndex,
} from "jubmoji-api";
import {
  derDecodeSignature,
  publicKeyFromString,
  verifyEcdsaSignature,
} from "babyjubjub-ecdsa";
import React, { useEffect, useState } from "react";
import {
  HUNT_COLLECTION_JUBMOJI_PUBKEY_INDICES,
  HUNT_TEAM_JUBMOJI_PUBKEY_INDICES,
} from "@/constants";

export default function JubmojiConsole() {
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
    try {
      await addJubmoji(jubmoji);
    } catch (e) {
      alert("Error: " + e);
    }
    await fetchJubmojis();
  };

  const clearHuntJubmojis = async () => {
    const confirmed = window.confirm(
      "Confirm clearing Zuconnect Treasure Hunt Jubmojis"
    );
    if (!confirmed) {
      return;
    }

    const jubmojis = await loadJubmojis();
    const newJubmojis = jubmojis.filter(
      (jubmoji) =>
        !HUNT_TEAM_JUBMOJI_PUBKEY_INDICES.includes(jubmoji.pubKeyIndex) &&
        !HUNT_COLLECTION_JUBMOJI_PUBKEY_INDICES.includes(jubmoji.pubKeyIndex)
    );

    await clearJubmojis();
    await writeJubmojis(newJubmojis);
    await fetchJubmojis();
  };

  const clearAllJubmojis = async () => {
    const confirmed = window.confirm("Confirm clearing ALL of your Jubmojis");
    if (!confirmed) {
      return;
    }

    clearJubmojis();
    await fetchJubmojis();
  };

  const verifyJubmojis = async () => {
    const jubmojis = await loadJubmojis();

    for (const { sig, msgNonce, msgRand, pubKeyIndex } of jubmojis) {
      const decodedSig = derDecodeSignature(sig);
      const pubKey = publicKeyFromString(getCardPubKeyFromIndex(pubKeyIndex));
      const msgHash = recoverCounterMessageHash(msgNonce, msgRand);

      const verified = verifyEcdsaSignature(decodedSig, msgHash, pubKey);
      if (!verified) {
        alert("Failed to verify one or more Jubmojis!");
        return;
      }
    }

    alert("Verified all Jubmojis in your collection!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-800 flex flex-col items-center justify-center space-y-4">
      <div className="text-white text-2xl font-bold mb-8">Manage Jubmojis</div>

      <div className="mt-6 w-1/3 bg-black p-4 rounded shadow">
        <div className="font-bold mb-2 text-xl">My Jubmojis:</div>
        <ul>
          {jubmojis.map((jubmoji, idx) => {
            const card = cardPubKeys[jubmoji.pubKeyIndex];
            return (
              <li key={idx} className="mb-1 color-black">
                {"Emoji: " +
                  card.emoji +
                  ", Nonce: " +
                  jubmoji.msgNonce.toString()}
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
          🍭 0
        </button>
        <button
          onClick={() => addMockJubmoji(1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          🍭 1
        </button>
        <button
          onClick={() => addMockJubmoji(2)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          🍭 2
        </button>
        <button
          onClick={() => addMockJubmoji(3)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          💳 0
        </button>
        <button
          onClick={() => addMockJubmoji(4)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          💳 1
        </button>
        <button
          onClick={() => addMockJubmoji(5)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-white"
        >
          💳 2
        </button>
      </div>

      <button
        onClick={clearHuntJubmojis}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded shadow text-white mt-6"
      >
        Clear Zuconnect Treasure Hunt Jubmojis
      </button>

      <button
        onClick={clearAllJubmojis}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded shadow text-white mt-6"
      >
        Clear All Jubmojis
      </button>

      <button
        onClick={verifyJubmojis}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded shadow text-white mt-6"
      >
        Verify Your Jubmojis
      </button>
    </div>
  );
}
