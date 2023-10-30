import React, { FormEvent, useState } from "react";
import JubmojiConsole from "./jubmojiConsole";
import CardConsole from "./cardConsole";
import QuestConsole from "./questConsole";
import PowerConsole from "./powerConsole";
import ForegroundTapConsole from "./foregroundTapConsole";

const MainConsole = () => {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [selectedConsole, setSelectedConsole] = useState("Jubmojis");

  const renderConsole = () => {
    switch (selectedConsole) {
      case "Jubmojis":
        return <JubmojiConsole />;
      case "Cards":
        return <CardConsole password={password} />;
      case "Quests":
        return <QuestConsole password={password} />;
      case "Powers":
        return <PowerConsole password={password} />;
      case "Foreground Tap":
        return <ForegroundTapConsole />;
      default:
        return <div>No console selected</div>;
    }
  };

  const onSubmitPassword = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/dev_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setUnlocked(true);
    } else {
      alert("Incorrect Password");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <form
          onSubmit={onSubmitPassword}
          className="p-10 bg-white rounded-xl shadow-xl"
        >
          <div className="text-center mb-6 text-xl font-semibold text-gray-800">
            Enter Password
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full py-2 px-4 bg-gray-100 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

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
        <button
          onClick={() => setSelectedConsole("Foreground Tap")}
          className="focus:outline-none"
        >
          Foreground Tap
        </button>
      </div>

      <div className="p-4">{renderConsole()}</div>
    </div>
  );
};

export default MainConsole;
