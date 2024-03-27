"use client";

import Link from "next/link";
import Image from "next/image";

import { Movies } from "./movies";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { useGetPersonQuery } from "@/rtk/services/injections/personApi";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";
import { dateFormat } from "@/utils/helpers";

export const Person = ({ personId }: { personId: number }) => {
  const {
    data: person,
    isLoading,
    isError,
    error,
  } = useGetPersonQuery(personId, {
    skip: !personId,
  });

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (isError) {
    // @ts-ignore
    const errorMsg = error.data.status_message;

    return <Alert isFullPage>{errorMsg}</Alert>;
  }

  if (person) {
    return (
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs>
          <div>Person</div>
          <div className="truncate">{person ? person.name : "Loading..."}</div>
        </Breadcrumbs>

        <div className="flex flex-col gap-y-10">
          <div className="flex gap-5 max-sm:flex-col">
            <figure className="min-w-[200px] max-w-[200px] h-[300px] max-sm:min-w-0 max-sm:w-[180px] max-sm:h-[270px]">
              <Image
                src={
                  person.profile_path
                    ? POSTER_URL + person.profile_path
                    : POSTER_NOT_FOUND
                }
                width={500}
                height={750}
                priority
                alt={person.name}
                className="rounded-md w-full h-full object-cover"
              />
            </figure>

            <div className="flex flex-col gap-y-4 w-full">
              <h2 className="text-xl font-medium max-sm:text-lg">
                {person.name}
              </h2>

              <div className="grid gap-y-2">
                <div className="flex gap-y-1 gap-x-2">
                  <div className="text-muted-foreground">Birthday:</div>
                  <div className="flex gap-x-1">
                    <div>{dateFormat(person.birthday)}</div>
                    {person.deathday && (
                      <div>— {dateFormat(person.deathday)}</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-y-1 gap-x-2">
                  <div className="text-muted-foreground">Place of Birth:</div>
                  <div>
                    {person.place_of_birth ? person.place_of_birth : "N/A"}
                  </div>
                </div>
              </div>

              {person.biography && (
                <p className="whitespace-break-spaces">{person.biography}</p>
              )}
            </div>
          </div>

          <Movies personId={personId} />
        </div>
      </div>
    );
  }
};
