import { useEffect, useState } from "react";
import Image from "next/image";

export const ImageFromBlob = (blobUrl: string) => {
  const [src, setSrc] = useState(""); // initial src will be empty
  const [isLoading, setIsLoading] = useState(true); // state to handle loading

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(blobUrl);
      const data = await response.arrayBuffer();
      const blob = new Blob([data], { type: "image/jpeg" });
      const img = URL.createObjectURL(blob);

      setSrc(img); // after component is mount, src will change
      setIsLoading(false); // set loading to false after image is loaded
    }

    fetchImage();
  }, [blobUrl]);

  return (
    <div>{isLoading ? "Loading..." : <Image src={src} alt="Card image" />}</div>
  );
};
