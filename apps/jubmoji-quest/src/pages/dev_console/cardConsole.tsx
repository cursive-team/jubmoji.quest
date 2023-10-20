import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

type Card = {
  index: number;
  name: string;
  description: string;
  owner: string;
};

export default function CardConsole() {
  // State to keep track of the card being created
  const [cardData, setCardData] = useState<Card>({
    index: 0,
    name: "",
    description: "",
    owner: "",
  });

  // State to keep the list of existing cards
  const [cards, setCards] = useState<Card[]>([]);

  // Fetch the list of cards when component mounts
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

  // Handler for input changes
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name == "index") {
      setCardData({ ...cardData, [name]: parseInt(value) });
    } else {
      setCardData({ ...cardData, [name]: value });
    }
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/dev_cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Clear the form after successful submission
      setCardData({ index: 0, name: "", description: "", owner: "" });

      const newCard = await response.json();
      setCards([...cards, newCard]);
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
            value={cardData.index}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={cardData.name}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={cardData.description}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block">Owner:</label>
          <input
            type="text"
            name="owner"
            value={cardData.owner}
            onChange={handleChange}
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
