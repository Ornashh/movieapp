"use client";

import { useState } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";

import { Loading } from "@/components/ui/loading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useGetCreditsQuery } from "@/rtk/services/injections/creditsApi";
import { cn } from "@/utils/cn";
import { useGetDetailsQuery } from "@/rtk/services/injections/moviesApi";

type Props = { params: { id: string } };

const tabList = ["Cast", "Crew"];

const Credits = ({ params }: Props) => {
  const movieId = Number(params.id);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: credits, isLoading: isLoadingCredits } = useGetCreditsQuery(
    movieId,
    { skip: !movieId }
  );

  const { data: details } = useGetDetailsQuery(movieId, { skip: !movieId });

  if (isLoadingCredits) {
    return <Loading isFullPage />;
  }

  return (
    <div className="grid gap-y-6">
      <Breadcrumbs>
        <div>Movie</div>
        <Link href={`/movie/${details && details.id}`} className="truncate">
          {details ? details.title : "Loading..."}
        </Link>
        <div>Credits</div>
      </Breadcrumbs>

      <Tab.Group selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <Tab.List className="border border-border rounded-xl flex w-[320px] mx-auto p-1 overflow-hidden max-sm:w-full">
          {tabList.map((tab, index) => {
            return (
              <Tab
                key={index}
                className={cn(
                  "rounded-lg flex justify-center items-center gap-x-3 w-full p-1.5 max-sm:text-sm",
                  activeTabIndex === index ? "bg-hover" : ""
                )}
              >
                {tab}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="flex flex-col">
            <div className="bg-hover rounded-xl grid grid-cols-[1fr_1fr]">
              <div className="py-3 px-4 max-sm:text-sm">Name</div>
              <div className="py-3 px-4 max-sm:text-sm">Character</div>
            </div>
            {credits?.cast?.map(({ id, name, character }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border grid grid-cols-[1fr_1fr] last:border-none"
                >
                  <Link
                    href={`/person/${id}`}
                    className="py-3 px-4 hover:underline max-sm:text-sm"
                  >
                    {name}
                  </Link>
                  <div className="py-3 px-4 max-sm:text-sm">
                    {character ? character : "N/A"}
                  </div>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="flex flex-col">
            <div className="bg-hover rounded-xl grid grid-cols-[1fr_1fr]">
              <div className="py-3 px-4 max-sm:text-sm">Name</div>
              <div className="py-3 px-4 max-sm:text-sm">Job</div>
            </div>
            {credits?.crew?.map(({ id, name, job }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border grid grid-cols-[1fr_1fr] last:border-none"
                >
                  <Link
                    href={`/person/${id}`}
                    className="py-3 px-4 hover:underline max-sm:text-sm"
                  >
                    {name}
                  </Link>
                  <div className="py-3 px-4 max-sm:text-sm">
                    {job ? job : "N/A"}
                  </div>
                </div>
              );
            })}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Credits;
