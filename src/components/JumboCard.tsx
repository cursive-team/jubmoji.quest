import React from "react";
import { Icons } from "./Icons";

export default function JumboCard() {
  return (
    <div className="flex flex-col items-center gap-4 self-stretch p-4 rounded-lg bg-shark-950">
      <Icons.flipArrow />
      <div className=" text-white text-center font-['Space text-[2.5rem]  font-bold leading-10">
        🎉
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="Siliguri'] text-shark-50 font-['Hind text-base leading-[140%]">
          Edition No.
        </div>
        <div className="Siliguri'] text-shark-50 font-['Hind text-base leading-[140%]">
          Owner/Location
        </div>

        <div className=" text-shark-50 text-base leading-[140%] underline">
          Quest Name links to quest
        </div>
        <div className=" text-shark-50 text-[1.375rem] font-bold leading-[normal]">
          Meaning of Jubmoji
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 self-stretch">
        <div className="flex justify-center items-center gap-2 py-2 px-4 h-8 rounded-full border border-[#85878b] bg-[#f6f5f5]">
          <Icons.download />
          <div className="text-[#1e1e1f] text-center font-['Hind text-[.8125rem] font-medium leading-[120%]">
            Back up!
          </div>
        </div>
      </div>
    </div>
  );
}
