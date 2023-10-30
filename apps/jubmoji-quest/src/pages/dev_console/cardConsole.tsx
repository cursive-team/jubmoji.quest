import { JubmojiCollectionCard } from "@/types";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function CardConsole({ password }: { password: string }) {
  const [index, setIndex] = useState<number>(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [cards, setCards] = useState<JubmojiCollectionCard[]>([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch("/api/cards");
        const cardsFromServer = await response.json();
        setCards(cardsFromServer);
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };

    getCards();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/dev_cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          index,
          name,
          description,
          owner,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Clear the form after successful submission
      setIndex(0);
      setName("");
      setDescription("");
      setOwner("");

      // After successful creation, re-fetch the list of cards
      const fetchCards = async () => {
        const response = await fetch("/api/cards");
        const cards = await response.json();
        setCards(cards);
      };

      fetchCards();
    } catch (error) {
      console.error("There was an error creating the card:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white mt-8">
      <h2 className="text-3xl mb-5">Create a Card</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block">Index:</label>
          <input
            type="number"
            name="index"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value))}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Owner:</label>
          <input
            type="text"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Card
        </button>
      </form>
      <div className="mt-10">
        <h3 className="text-2xl mb-5">List of Cards</h3>
        {cards.length === 0 ? (
          <p>No cards available.</p>
        ) : (
          <div>
            {cards.map((card, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg mb-4">
                <p>
                  <strong>Index:</strong> {card.index}
                </p>
                <p>
                  <strong>Name:</strong> {card.name}
                </p>
                <p>
                  <strong>Description:</strong> {card.description}
                </p>
                <p>
                  <strong>Owner:</strong> {card.owner}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
