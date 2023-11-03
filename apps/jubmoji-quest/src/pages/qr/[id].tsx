import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { JubmojiQRCodeData } from "@/types";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

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
      toast.error("Failed to confirm power.");
      return;
    }

    const { verified, message } = await response.json();
    if (!verified) {
      console.log(message);
      toast.error("Failed to confirm power - proof not verified.");
    } else {
      toast.success("Successfully confirmed power!");
    }
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
      <div className="flex flex-col items-center gap-2 p-2">
        <p className="text-center">
          Click the button below to confirm use of this power. Once you confirm,
          the user will no longer be able to use this proof for the same power
          again. Note: if this power has already been used, confirmation will
          fail.
        </p>
        <Button
          size="tiny"
          variant="blue"
          className="max-w-[150px]"
          rounded
          onClick={confirmPower}
        >
          Confirm Power
        </Button>
      </div>
    </div>
  );
};

export default QRCodePage;
