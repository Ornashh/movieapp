"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Home, Search, Star } from "lucide-react";

import { SwitchTheme } from "./switchTheme";
import { cn } from "@/utils/cn";

const navigation = [
  { title: "Home", href: "/", icon: <Home className="svg" /> },
  { title: "Search", href: "/search", icon: <Search className="svg" /> },
  { title: "Popular", href: "/popular", icon: <Flame className="svg" /> },
  { title: "Top rated", href: "/top_rated", icon: <Star className="svg" /> },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="bg-background border-r border-border sticky top-[40px] left-0 w-[225px] h-[calc(100vh-80px)] z-50 max-lg:border-r-0 max-lg:border-t max-lg:fixed max-lg:top-auto max-lg:bottom-0 max-lg:w-full max-lg:h-16">
      <div className="flex flex-col h-full max-lg:flex-row max-lg:justify-between max-lg:items-center max-lg:px-5">
        {navigation.map(({ title, href, icon }, index) => {
          return (
            <Link
              key={index}
              href={href}
              className={cn(
                "flex items-center gap-x-3 py-3 px-4 max-lg:py-2 max-lg:px-3",
                href === pathname
                  ? "border-r-[2px] border-primary max-lg:border-r-0 max-lg:bg-hover max-lg:rounded-md"
                  : ""
              )}
            >
              {icon}
              <div className="max-md:hidden">{title}</div>
            </Link>
          );
        })}

        <SwitchTheme />
      </div>
    </div>
  );
};
