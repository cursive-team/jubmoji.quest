import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { JubmojiQRCodeData } from "@/types";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";

const QRCodePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [qrData, setQrData] = useState<JubmojiQRCodeData>();

  useEffect(() => {
    if (id) {
      fetch(`/api/qr/${id}`)
        .then((response) => response.json())
        .then((data) => setQrData(data))
        .catch((error) =>
          console.error("Error fetching qr code data: ", error)
        );
    }
  }, [id]);

  const confirmPower = async () => {
    const response = await fetch("/api/qr/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qrCodeUuid: id,
      }),
    });

    if (!response.ok) {
      alert("Failed to confirm power!");
      return;
    }

    const { verified, message } = await response.json();
    if (!verified) {
      console.log("Failed to verify power: ", message);
    }

    alert("Confirming power: " + verified.toString());
  };

  if (!qrData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-10">
      <div>
        <p>The page represents a proof for the following power:</p>
        <PowerCard
          title={qrData.power.name}
          description={qrData.power.description}
          powerType={qrData.power.powerType}
        />
      </div>
      <div>
        <p>This power was obtained by completing the following quest:</p>
        <QuestCard
          title={qrData.power.quest.name}
          description={qrData.power.quest.description}
          image={qrData.power.quest.imageLink || ""}
        />
      </div>
      <div className="bg-slate-500">
        <p>
          Click the button below to confirm use of this power. Once you confirm,
          the user will no longer be able to use this proof for the same power
          again. Note: if this power has already been used, confirmation will
          fail.
        </p>
        <button
          className="bg-black text-white align-center rounded-md"
          onClick={confirmPower}
        >
          Confirm Power
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
