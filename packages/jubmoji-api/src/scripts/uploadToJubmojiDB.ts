import { cardPubKeys } from "../data/cardPubKeys";

const setupDBEntries = async () => {
  const domains = ["http://localhost:3000"];

  let ct = 0;
  for (const [index, cardPubKey] of Array.from(cardPubKeys.entries())) {
    for (const domain of domains) {
      try {
        const response = await fetch(domain + "/api/dev_cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index,
            name: cardPubKey.cardName,
            description: `This is '${cardPubKey.cardName}'!`,
            owner: "Jubmoji team",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was an error creating the card:", error);
      }
    }

    ct += 1;
    console.log(ct);

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};

setupDBEntries();
