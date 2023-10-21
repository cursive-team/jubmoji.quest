import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { JubmojiQRCode } from "@/types";
import { PowerCard } from "@/components/cards/PowerCard";
import { QuestCard } from "@/components/cards/QuestCard";
import { questImageMap } from "@/lib/dev_imageMaps";

const QRCodePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [qrData, setQrData] = useState<JubmojiQRCode>();

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

  const confirmPower = () => {
    alert("Confirmed power!");
  };

  if (!qrData) {
    return <div>Loading...</div>;
  }

  console.log(qrData);

  return (
    <div>
      <h1>Proof</h1>
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
          image={questImageMap[qrData.power.quest.id]}
        />
      </div>
      <div>
        <p>
          Click the button below to confirm use of this power. Once you confirm,
          the user will no longer be able to use this proof for the same power
          again. Note: if this power has already been used, confirmation will
          fail.
        </p>
        <button onClick={confirmPower}>Confirm Power</button>
      </div>
    </div>
  );
};

export default QRCodePage;
