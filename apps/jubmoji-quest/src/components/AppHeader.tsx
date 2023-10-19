import { type } from "os";
import React, { HtmlHTMLAttributes } from "react";

interface AppHeaderProps
  extends Pick<HtmlHTMLAttributes<HTMLDivElement>, "children"> {
  title: React.ReactNode;
  actions?: React.ReactNode;
}

export default function AppHeader({ title, actions }: AppHeaderProps) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2 w-full">
          {typeof title === "string" ? (
            <div className="flex items-center sh-8 text-lg font-semibold text-white">
              {title}
            </div>
          ) : (
            title
          )}
        </div>
        {actions && <div className="flex my-auto">{actions}</div>}
      </div>
    </div>
  );
}
