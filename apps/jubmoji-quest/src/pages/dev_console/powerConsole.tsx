import { JubmojiPower } from "@/types";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PowerConsole({ password }: { password: string }) {
  const [powers, setPowers] = useState<JubmojiPower[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [powerType, setPowerType] = useState("QR_CODE");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [questId, setQuestId] = useState<number>();

  useEffect(() => {
    const fetchPowers = async () => {
      try {
        const response = await fetch("/api/powers");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setPowers(data);
      } catch (error) {
        console.error("Error fetching powers:", error);
      }
    };

    fetchPowers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/dev_powers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          name,
          description,
          startTime,
          endTime,
          powerType,
          redirectUrl,
          questId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // After successful creation, re-fetch the list of powers
      const fetchPowers = async () => {
        const response = await fetch("/api/powers");
        const powers = await response.json();
        setPowers(powers);
      };

      fetchPowers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Create a Power</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="border py-2 px-3 text-grey-darkest"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  className="border py-2 px-3 text-grey-darkest"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startTime"
                >
                  Start Time
                </label>
                <DatePicker
                  selected={startTime}
                  onChange={(date: Date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endTime"
                >
                  End Time
                </label>
                <DatePicker
                  selected={endTime}
                  onChange={(date: Date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>Power Type:</label>
                <select
                  value={powerType}
                  onChange={(e) => setPowerType(e.target.value)}
                >
                  <option value="QR_CODE">QR Code</option>
                  <option value="TELEGRAM">Telegram</option>
                  <option value="TWITTER">Twitter</option>
                  <option value="REDIRECT">Redirect</option>
                </select>
              </div>
              {powerType === "REDIRECT" && (
                <input
                  type="text"
                  placeholder="Enter Redirect URL"
                  value={redirectUrl || ""}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                />
              )}
              <div>
                <input
                  type="number"
                  name="questId"
                  value={questId}
                  onChange={(e) => setQuestId(parseInt(e.target.value))}
                  placeholder="Associated Quest ID"
                  required
                />
              </div>
              <button type="submit">Create Power</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold pt-8">List of Powers</h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {powers.map((power) => (
            <div key={power.id} className="p-4 border mb-4">
              <h3>{power.name}</h3>
              <p>{power.description}</p>
              <p>Start Time: {power.startTime && power.startTime.toString()}</p>
              <p>End Time: {power.endTime && power.endTime.toString()}</p>
              <p>Type: {power.powerType}</p>
              <p>Quest ID: {power.questId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
