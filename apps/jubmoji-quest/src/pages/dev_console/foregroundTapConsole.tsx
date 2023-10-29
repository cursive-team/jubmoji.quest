import ForegroundTapModal from "@/components/modals/ForegroundTapModal";
import {
  NfcCardSignMessageResult,
  PublicMessageSignature,
  cardPubKeys,
  createProofInstance,
} from "jubmoji-api";
import { useState } from "react";

export default function ForegroundTapConsole() {
  const [message, setMessage] = useState("");
  const [randomness, setRandomness] = useState<string>(crypto.randomUUID());
  const [isTapping, setIsTapping] = useState(false);

  const generateNewRandomness = () => {
    setRandomness(crypto.randomUUID());
  };

  const onTap = async ({
    digest,
    rawSig,
    pubKey,
  }: NfcCardSignMessageResult) => {
    const proofInstance = createProofInstance(PublicMessageSignature, {
      randStr: randomness, // Add some randomness to message before signing
    });
    const pubKeyIndex = cardPubKeys.findIndex(
      (key) => key.pubKeySlot1 === pubKey // Use secp256k1 key here, which is in slot 1
    );

    const proof = await proofInstance.prove({
      message,
      rawSig,
      pubKeyIndex,
    });
    const { verified } = await proofInstance.verify(proof);

    alert(`Cardholder signature verified: ${verified}`);
    setIsTapping(false);
    setMessage("");
  };

  if (isTapping) {
    const fullMessage = randomness + message;
    return <ForegroundTapModal message={fullMessage} onTap={onTap} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-white text-3xl font-bold">
        Enter a message, tap a card, and verify the signature!
      </h1>
      <div className="bg-transparent w-96 shadow-lg rounded-lg p-5">
        <button
          onClick={generateNewRandomness}
          className="w-full h-12 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg focus:outline-none transition"
        >
          Generate New Randomness
        </button>
        <h2>Current randomness: {randomness}</h2>
      </div>
      <div className="bg-transparent w-96 shadow-lg rounded-lg p-5">
        <form
          onSubmit={() => {
            setIsTapping(true);
          }}
          className="space-y-3"
        >
          <div>
            <input
              type="text"
              className="w-full h-12 px-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-12 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg focus:outline-none transition"
            >
              Request Cardholder Tap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
