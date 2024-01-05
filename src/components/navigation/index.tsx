"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import {
  Home,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Flame,
  Star,
  Film,
  Play,
} from "lucide-react";

import { SwitchTheme } from "./switchTheme";
import { cn } from "@/utils/cn";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="bg-background border-r border-border sticky top-[40px] left-0 w-[250px] h-[calc(100vh-80px)] z-50 max-lg:border-r-0 max-lg:border-t max-lg:fixed max-lg:top-auto max-lg:bottom-0 max-lg:w-full max-lg:h-16">
      <div className="flex flex-col h-full max-lg:flex-row max-lg:justify-between max-lg:items-center max-lg:px-5">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-x-3 py-3 px-4 max-lg:py-2 max-lg:px-3",
            pathname === "/"
              ? "border-r-[2px] border-primary max-lg:border-r-0 max-lg:bg-hover max-lg:rounded-md"
              : ""
          )}
        >
          <Home className="svg" />
          <div className="max-md:hidden">Home</div>
        </Link>

        <Link
          href="/search"
          className={cn(
            "flex items-center gap-x-3 py-3 px-4 max-lg:py-2 max-lg:px-3",
            pathname === "/search"
              ? "border-r-[2px] border-primary max-lg:border-r-0 max-lg:bg-hover max-lg:rounded-md"
              : ""
          )}
        >
          <Search className="svg" />
          <div className="max-md:hidden">Search</div>
        </Link>

        <Menu as="div" className="relative lg:hidden">
          <Menu.Button className="flex items-center gap-x-3 w-full py-3 px-4 max-lg:py-2 max-lg:px-3">
            <Film className="svg" /> <div className="max-md:hidden">Movies</div>
          </Menu.Button>
          <Menu.Items className="bg-background border border-border rounded-md outline-none flex flex-col absolute left-[50%] bottom-[100%] w-40 mb-1 translate-x-[-50%] overflow-hidden">
            <Menu.Item>
              <Link href="/now_playing" className="text-sm flex gap-x-3 p-3">
                <Play className="svg" /> Now playing
              </Link>
            </Menu.Item>
            <div className="h-px bg-border" />
            <Menu.Item>
              <Link href="/popular" className="text-sm flex gap-x-3 p-3">
                <Flame className="svg" /> Popular
              </Link>
            </Menu.Item>
            <div className="h-px bg-border" />
            <Menu.Item>
              <Link href="/top_rated" className="text-sm flex gap-x-3 p-3">
                <Star className="svg" /> Top rated
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>

        <Disclosure as="div" className="max-lg:hidden">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between items-center w-full py-3 px-4 max-lg:py-2 max-lg:px-3">
                <div className="flex items-center gap-x-3">
                  <Film className="svg" /> Movies
                </div>
                {open ? (
                  <ChevronUp className="text-icon w-4 h-4" />
                ) : (
                  <ChevronDown className="text-icon w-4 h-4" />
                )}
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-col">
                <Link
                  href="/now_playing"
                  className={cn(
                    "flex gap-x-3 py-3 pl-[26px]",
                    pathname === "/now_playing"
                      ? "border-r-[2px] border-primary"
                      : ""
                  )}
                >
                  <Play className="svg" /> Now playing
                </Link>
                <Link
                  href="/popular"
                  className={cn(
                    "flex gap-x-3 py-3 pl-[26px]",
                    pathname === "/popular"
                      ? "border-r-[2px] border-primary"
                      : ""
                  )}
                >
                  <Flame className="svg" /> Popular
                </Link>
                <Link
                  href="/top_rated"
                  className={cn(
                    "flex gap-x-3 py-3 pl-[26px]",
                    pathname === "/top_rated"
                      ? "border-r-[2px] border-primary"
                      : ""
                  )}
                >
                  <Star className="svg" /> Top rated
                </Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Link
          href="/people"
          className={cn(
            "flex items-center gap-x-3 py-3 px-4 max-lg:py-2 max-lg:px-3",
            pathname === "/people"
              ? "border-r-[2px] border-primary max-lg:border-r-0 max-lg:bg-hover max-lg:rounded-md"
              : ""
          )}
        >
          <Users className="svg" />
          <div className="max-md:hidden">People</div>
        </Link>

        <SwitchTheme />
      </div>
    </div>
  );
};
