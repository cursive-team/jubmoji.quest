import { type } from "os";
import React, { HtmlHTMLAttributes } from "react";

interface AppHeaderProps
  extends Pick<HtmlHTMLAttributes<HTMLDivElement>, "children"> {
  title?: React.ReactNode;
}

export default function AppHeader({ title, children }: AppHeaderProps) {
  return (
    <div className="pt-12 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          {typeof title === "string" ? (
            <div className="flex items-center sh-8 text-lg font-semibold text-white">
              {title}
            </div>
          ) : (
            title
          )}
        </div>
      </div>
    </div>
  );
}
