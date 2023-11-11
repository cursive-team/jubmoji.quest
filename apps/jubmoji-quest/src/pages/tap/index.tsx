import { AssistedTapModal } from "@/components/modals/AssistedTapModal";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function TapPage() {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  return (
    <AssistedTapModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => router.push("/")}
    />
  );
}
