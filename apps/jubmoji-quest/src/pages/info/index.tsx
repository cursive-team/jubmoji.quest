import { InfoModal } from "@/components/modals/InfoModal";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function InfoPage() {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  return (
    <InfoModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => router.push("/")}
    />
  );
}
