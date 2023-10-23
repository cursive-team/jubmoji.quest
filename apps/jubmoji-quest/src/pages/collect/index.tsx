import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { detectIncognito } from "detectincognitojs";

export default function CollectJubmojiPage() {
  const router = useRouter();
  const params = useParams();

  // ensure users do not go to rest of app if they are in incognito
  const alertIncognito = async () => {
    const isIncognito = await detectIncognito();
    if (isIncognito.isPrivate) {
      alert(
        "Please copy this link into a non-incognito tab in order to save your Jubmojis!"
      );
    }
  };

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
