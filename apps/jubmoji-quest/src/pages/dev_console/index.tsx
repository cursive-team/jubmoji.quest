import React, { useState } from "react";
import JubmojiConsole from "./jubmojiConsole";
import CardConsole from "./cardConsole";
import QuestConsole from "./questConsole";
import PowerConsole from "./powerConsole";

const MainConsole = () => {
  const [selectedConsole, setSelectedConsole] = useState("Jubmojis");

  const renderConsole = () => {
    switch (selectedConsole) {
      case "Jubmojis":
        return <JubmojiConsole />;
      case "Cards":
        return <CardConsole />;
      case "Quests":
        return <QuestConsole />;
      case "Powers":
        return <PowerConsole />;
      default:
        return <div>No console selected</div>;
    }
  };

  return (
    <div>
      <div className="flex justify-around p-4 bg-orange-200">
        <button
          onClick={() => setSelectedConsole("Jubmojis")}
          className="focus:outline-none"
        >
          Jubmojis
        </button>
        <button
          onClick={() => setSelectedConsole("Cards")}
          className="focus:outline-none"
        >
          Cards
        </button>
        <button
          onClick={() => setSelectedConsole("Quests")}
          className="focus:outline-none"
        >
          Quests
        </button>
        <button
          onClick={() => setSelectedConsole("Powers")}
          className="focus:outline-none"
        >
          Powers
        </button>
      </div>

      <div className="p-4">{renderConsole()}</div>
    </div>
  );
};

export default MainConsole;
