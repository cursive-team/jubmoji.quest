import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-2 text-base font-medium">
      <Link href="/" style={{ color: "black" }}>
        Home
      </Link>
      <Link href="/card-profile" style={{ color: "black" }}>
        Card Profiles
      </Link>
      <Link href="/collection" style={{ color: "black" }}>
        Collection
      </Link>
      <Link href="/quests" style={{ color: "black" }}>
        Quests
      </Link>
    </div>
  );
}
