import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PowerType = "QR_CODE" | "TELEGRAM" | "TWITTER";

interface Power {
  id: string; // Assuming the id is a string. Adjust the type as required.
  name: string;
  description: string;
  startTime: string; // Depending on your setup, this could be a Date object or a string.
  endTime: string; // The same applies here as for startTime.
  powerType: PowerType;
  powerParams: {}; // Structure this based on how the data is shaped.
  questId: string;
}

export default function PowerConsole() {
  const [powers, setPowers] = useState<Power[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [powerType, setPowerType] = useState("QR_CODE");
  const [questId, setQuestId] = useState<number>();

  useEffect(() => {
    // Fetch the powers when the component is mounted
    const fetchPowers = async () => {
      try {
        const response = await fetch("/api/powers"); // Adjust this to your actual GET endpoint.
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setPowers(data); // Assuming the data is directly the array of powers.
      } catch (error) {
        console.error("Error fetching powers:", error);
      }
    };

    fetchPowers();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You'll need to replace the URL with your actual endpoint
    try {
      const response = await fetch("/api/dev_powers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          startTime,
          endTime,
          powerType,
          questId,
        }), // Send the powerInput state in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Here, handle the response accordingly.
      console.log("Power created:", await response.json());
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
                </select>
              </div>
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
              {/* If you need to input powerParams, you'd add another input control here */}
              <button type="submit">Create Power</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold pt-8">List of Powers</h2>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {powers.map((power) => (
            <div key={power.id} className="p-4 border mb-4">
              <h3>{power.name}</h3>
              <p>{power.description}</p>
              {/* Render other power properties as needed */}
              <p>Start Time: {power.startTime}</p>
              <p>End Time: {power.endTime}</p>
              <p>Type: {power.powerType}</p>
              <p>Quest ID: {power.questId}</p>
              {/* You may want to render powerParams or associatedQuest differently depending on their structure */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
