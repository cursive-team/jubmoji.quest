import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ClearPage() {
  const [cleared, setCleared] = useState(false);

  const onClear = () => {
    window.localStorage.removeItem("sigmojis");
    window.localStorage.removeItem("backup");
    setCleared(true);
  };
  return (
    <>
      <div className="flex justify-center items-center py-2">
        <Button onClick={onClear}>
          {cleared ? "Cleared!" : "Clear your collection"}
        </Button>
      </div>
    </>
  );
}
