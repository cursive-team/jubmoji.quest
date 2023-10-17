import { useState, useEffect } from "react";
import { isStorageEmpty } from "@/lib/localStorage";
import { HaLoNoncePCDArgs } from "@pcd/halo-nonce-pcd";
import { ArgumentTypeName } from "@pcd/pcd-types";
import { useRouter, useParams } from "next/navigation";
import Collect from "@/components/Collect";

export default function TapPage() {
  const router = useRouter();
  const params = useParams();

  const [storageEmpty, setStorageEmpty] = useState<boolean | null>(null);
  const [args, setArgs] = useState<HaLoNoncePCDArgs | null>(null);

  useEffect(() => {
    if (args === null && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(location.hash.slice(1));
      const haloArgs = getHaLoArgs(urlParams);
      if (haloArgs === null) {
        router.push("/");
      } else {
        setArgs(haloArgs);
      }
    }
  }, [params, router, args]);

  useEffect(() => {
    const checkStorage = async () => {
      const isEmpty = await isStorageEmpty();
      setStorageEmpty(isEmpty);
    };
    checkStorage();
  }, []);

  if (args === null) {
    return (
      <>
        <div className="flex justify-center items-center">
          <span>Loading...</span>
        </div>
      </>
    );
  }

  return <Collect args={args} />;
}

function getHaLoArgs(params: URLSearchParams): HaLoNoncePCDArgs | null {
  const pk2 = params.get("pk2");
  const rnd = params.get("rnd");
  const rndsig = params.get("rndsig");

  if (pk2 == null || rnd == null || rndsig == null) {
    return null;
  } else {
    const args: HaLoNoncePCDArgs = {
      pk2: {
        argumentType: ArgumentTypeName.String,
        value: pk2,
      },
      rnd: {
        argumentType: ArgumentTypeName.String,
        value: rnd,
      },
      rndsig: {
        argumentType: ArgumentTypeName.String,
        value: rndsig,
      },
    };
    return args;
  }
}
