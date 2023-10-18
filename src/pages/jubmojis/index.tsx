import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import React from "react";

export default function JubmojisPage() {
  return (
    <div>
      <AppHeader title="YOUR JUBMOJIS"></AppHeader>
      <Button>Back up collection</Button>
      <div className="mt-4"></div>
    </div>
  );
}
