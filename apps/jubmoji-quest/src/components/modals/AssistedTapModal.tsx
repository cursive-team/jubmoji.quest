import React, { useEffect, useRef } from "react";
import { Modal, ModalProps } from "./Modal";
import { Card } from "../cards/Card";
import { Button } from "../ui/Button";
import Image from "next/image";
import MobileDetect from "mobile-detect";
import Link from "next/link";

type Device = "android" | "ios";
const DeviceImageMapping: Record<Device, string> = {
  android: "/images/tap-phone-android.png",
  ios: "/images/tap-phone-ios.png",
};

const AssistedTapModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const md = useRef<any>();
  useEffect(() => {
    md.current = new MobileDetect(window?.navigator?.userAgent);
  }, []);

  const device: Device = md?.current?.is("iPhone") ? "ios" : "android";

  const onReadyToTap = () => {
    // TODO
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-center my-auto">
        <Card.Title className="!font-[22px]">
          Place the NFC card near your phone.
        </Card.Title>
        <Image
          src={DeviceImageMapping[device]}
          width={180}
          height={200}
          alt="tap card"
          className="mx-auto py-12"
        />
        <div className="flex flex-col gap-8">
          <Button variant="secondary" onClick={onReadyToTap}>
            Ready to tap
          </Button>
          <span className=" font-dm-sans ">
            {`If you still can't tap, check out`} <br />
            <Link className="underline" href="/">
              the troubleshooting guide.
            </Link>
          </span>
        </div>
      </div>
    </Modal>
  );
};

AssistedTapModal.displayName = "AssistedTapModal";
export { AssistedTapModal };
