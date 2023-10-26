import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import { useRouter } from "next/router";

interface RouterItem {
  label: string;
  href: string;
  icon: string;
  iconActive: string;
  isActive?: boolean;
}

const TabItem = ({ label, href, icon, iconActive, isActive }: RouterItem) => {
  const Icon: any = isActive ? iconActive : icon;

  return (
    <Link href={href}>
      <div className="flex flex-col text-white text-center items-center justify-center gap-2">
        <Icon height={24} />
        <span className="text-tiny font-hind-siliguri mt-auto">{label}</span>
      </div>
    </Link>
  );
};

export default function AppFooter() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("/");

  useEffect(() => {
    setActiveRoute(router.route);
  }, [router]);

  const routerItems: RouterItem[] = [
    {
      label: "Jubmojis",
      href: "/jubmojis",
      icon: Icons.folder,
      iconActive: Icons.folderSolid,
    },
    {
      label: "Quests",
      href: "/",
      icon: Icons.quest,
      iconActive: Icons.questSolid,
    },
    {
      label: "Powers",
      href: "/powers",
      icon: Icons.flash,
      iconActive: Icons.flashSolid,
    },
  ];

  return (
    <div className="fixed border-t border-t-shark-700 bg-shark-970 w-full bottom-0">
      <div className="grid grid-cols-3 bottom-0 py-2 xs:py-4">
        {routerItems?.map((route, index) => {
          const isActive = activeRoute === route.href;
          return <TabItem key={index} {...route} isActive={isActive} />;
        })}
      </div>
    </div>
  );
}
