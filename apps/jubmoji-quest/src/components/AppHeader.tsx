import { classed } from "@tw-classed/react";
import React, { HtmlHTMLAttributes } from "react";

interface AppHeaderProps
  extends Pick<HtmlHTMLAttributes<HTMLDivElement>, "children"> {
  title: React.ReactNode;
  actions?: React.ReactNode;
}

const AppHeaderTitle = classed.span(
  "flex items-center h-4 xs:h-8 text-lg font-semibold tracking-[0.36px] text-white uppercase"
);

const AppHeader = ({ title, actions, children }: AppHeaderProps) => {
  return (
    <header id="header" className="flex flex-col">
      <div className="flex items-center justify-between py-3 xs:py-4">
        <div className="flex items-center gap-2 w-full">
          {typeof title === "string" ? (
            <AppHeaderTitle>{title}</AppHeaderTitle>
          ) : (
            title
          )}
        </div>
        {actions && <div className="flex my-auto">{actions}</div>}
      </div>
      {children}
    </header>
  );
};

AppHeader.displayName = "AppHeader";
AppHeader.Title = AppHeaderTitle;

export { AppHeader };
