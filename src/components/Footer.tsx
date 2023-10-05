import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
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
    </>
  );
}
