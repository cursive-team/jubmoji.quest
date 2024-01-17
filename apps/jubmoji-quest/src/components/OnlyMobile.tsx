"use client";
import MobileDetect from "mobile-detect";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "./cards/Card";

interface OnlyMobileProps {
  children?: React.ReactNode;
}

const OnlyMobileBanner = () => {
  return (
    <div className="flex text-center h-screen">
      <div className="flex flex-col gap-4 my-auto mx-auto px-10">
        <div className="flex flex-col gap-8">
          <Image
            src="/images/logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="mx-auto mt-14"
          />
          <span className="text-[36px] font-giorgio text-center">
            JUBMOJI.QUEST
          </span>
        </div>

        <Card.Base className="!font-dm-sans">
          <Card.Content className="text-sm md:text-lg" spacing="sm">
            jubmoji.quest is only available on mobile devices. Please visit the
            website on your phone in order to take part in the experience.
          </Card.Content>
        </Card.Base>
      </div>
    </div>
  );
};

export default function OnlyMobile({ children }: OnlyMobileProps) {
  const md = useRef<any>();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      md.current = new MobileDetect(window?.navigator?.userAgent);
      setIsMobile(md.current?.mobile() !== null);
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) return null;
  return <>{!isMobile ? <OnlyMobileBanner /> : children}</>;
}
