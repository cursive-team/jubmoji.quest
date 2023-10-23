import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CollectJubmojiPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(location.hash.slice(1));
      getHaLoArgs(urlParams);
    }
  }, [params, router]);

  return (
    <>
      <div className="flex justify-center items-center">
        <span>Loading...</span>
      </div>
    </>
  );
}

function getHaLoArgs(params: URLSearchParams) {
  const pk2 = params.get("pk2");
  const rnd = params.get("rnd");
  const rndsig = params.get("rndsig");
}
