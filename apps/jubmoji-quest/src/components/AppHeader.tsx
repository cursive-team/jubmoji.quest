import { classed } from "@tw-classed/react";
import React, { HtmlHTMLAttributes } from "react";

interface AppHeaderProps
  extends Pick<HtmlHTMLAttributes<HTMLDivElement>, "children"> {
  title: React.ReactNode;
  actions?: React.ReactNode;
}

const AppHeaderTitle = classed.span(
  "flex items-center h-8 text-lg font-semibold tracking-[0.36px] text-white uppercase"
);

const AppHeader = ({ title, actions }: AppHeaderProps) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2 w-full">
          {typeof title === "string" ? (
            <AppHeaderTitle>{title}</AppHeaderTitle>
          ) : (
            title
          )}
        </div>
        {actions && <div className="flex my-auto">{actions}</div>}
      </div>
    </div>
  );
};

AppHeader.displayName = "AppHeader";
AppHeader.Title = AppHeaderTitle;

export { AppHeader };
