"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Home, Search, Film, Palette, ChevronRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

const itemClasses =
  "rounded-xl flex items-center gap-x-3 w-full h-[50px] px-4 transition-colors duration-200 ease-in-out hover:bg-accent max-lg:justify-center max-lg:w-[50px] max-lg:h-[50px] max-lg:px-0";

const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="svg" />,
  },
  {
    title: "Search",
    href: "/search",
    icon: <Search className="svg" />,
  },
  {
    title: "Movies",
    icon: <Film className="svg" />,
    dropdownItems: [
      { title: "Now playing", themeValue: "", href: "/now_playing" },
      { title: "Popular", themeValue: "", href: "/popular" },
      { title: "Top rated", themeValue: "", href: "/top_rated" },
    ],
  },
  {
    title: "Appearance",
    icon: <Palette className="svg" />,
    dropdownItems: [
      { title: "Light", themeValue: "light", href: "" },
      { title: "Dark", themeValue: "dark", href: "" },
      { title: "System", themeValue: "system", href: "" },
    ],
  },
];

export const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const isMatch = useMediaQuery("(max-width: 768px)");

  const handleAppearance = (themeValue: string) => {
    setTheme(themeValue);
  };

  return (
    <div className="bg-background border-r border-border sticky top-[20px] left-0 w-[250px] h-[calc(100vh-60px)] z-50 max-lg:w-[71px] max-md:border-r-0 max-md:border-t max-md:w-full max-md:h-auto max-md:fixed max-md:top-auto max-md:bottom-0">
      <div className="flex flex-col pr-5 max-md:flex-row max-md:justify-between max-md:items-center max-md:h-16 max-md:px-5">
        {menuItems.map(({ title, href, icon, dropdownItems }, index) => {
          return (
            <Fragment key={index}>
              {dropdownItems ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className={cn("justify-between", itemClasses)}>
                      <div className="flex gap-x-3">
                        {icon}
                        <div className="max-lg:hidden">{title}</div>
                      </div>
                      <ChevronRight className="svg max-lg:hidden" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align={
                      isMatch && title === "Movies"
                        ? "center"
                        : isMatch && title === "Appearance"
                        ? "end"
                        : "start"
                    }
                    side={isMatch ? "top" : "right"}
                  >
                    {dropdownItems.map(({ title, themeValue, href }, index) => {
                      return (
                        <Fragment key={index}>
                          {href ? (
                            <DropdownMenuItem asChild>
                              <Link href={href}>{title}</Link>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              disabled={themeValue === theme}
                              onClick={() => handleAppearance(themeValue)}
                            >
                              {title}
                            </DropdownMenuItem>
                          )}
                          {index !== dropdownItems.length - 1 && (
                            <DropdownMenuSeparator />
                          )}
                        </Fragment>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={href} className={itemClasses}>
                  <div className="flex gap-x-3">
                    {icon}
                    <div className="max-lg:hidden">{title}</div>
                  </div>
                </Link>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
