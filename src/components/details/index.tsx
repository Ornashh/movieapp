"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { Tabs } from "@/components/details/tabs";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { useGetDetailsQuery } from "@/rtk/services/injections/moviesApi";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";
import { dateFormat, moneyConverter, timeConverter } from "@/utils/helpers";

const movieInfoClasses = "flex gap-y-1 gap-x-2 max-sm:text-sm";

export const Details = ({ movieId }: { movieId: number }) => {
  const {
    data: details,
    isLoading,
    isError,
    error,
  } = useGetDetailsQuery(movieId, {
    skip: !movieId,
  });

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (isError) {
    // @ts-ignore
    const errorMsg = error.data.status_message;

    return <Alert isFullPage>{errorMsg}</Alert>;
  }

  if (details) {
    return (
      <div className="flex flex-col gap-y-6">
        <Breadcrumbs>
          <div>Movie</div>
          <div className="truncate">
            {details ? details.title : "Loading..."}
          </div>
        </Breadcrumbs>

        <div className="flex flex-col gap-y-10">
          <div className="flex gap-6 z-20 max-sm:flex-col">
            <figure className="bg-hover rounded-md relative min-w-[200px] max-h-[300px] overflow-hidden before:content-[''] before:block before:pt-[300px] max-md:min-w-[200px] max-md:max-h-[300px] max-md:before:pt-[300px] max-sm:min-w-auto max-sm:w-[200px]">
              <Image
                src={
                  details.poster_path
                    ? POSTER_URL + details.poster_path
                    : POSTER_NOT_FOUND
                }
                width={500}
                height={750}
                priority
                alt={details.title}
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            </figure>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-col gap-y-1">
                <h2 className="text-xl font-medium max-sm:text-lg">
                  {details.title}
                </h2>

                {details.overview && (
                  <p className="max-sm:text-sm">{details.overview}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Genres:</div>
                  {details.genres.length > 0 ? (
                    <div className="flex flex-wrap">
                      {details.genres.map(({ id, name }, index) => {
                        return (
                          <Fragment key={id}>
                            {index > 0 && <div>,&nbsp;</div>}
                            <Link href={`/genre/${id}`} className="underline">
                              {name}
                            </Link>
                          </Fragment>
                        );
                      })}
                    </div>
                  ) : (
                    <div>N/A</div>
                  )}
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Release date:</div>
                  <div className=" max-sm:text-sm">
                    {dateFormat(details.release_date)}
                  </div>
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Runtime:</div>
                  <div className=" max-sm:text-sm">
                    {timeConverter(details.runtime)}
                  </div>
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Revenue:</div>
                  <div className=" max-sm:text-sm">
                    {moneyConverter(details.revenue)}
                  </div>
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Budget:</div>
                  <div className=" max-sm:text-sm">
                    {moneyConverter(details.budget)}
                  </div>
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Rating:</div>
                  <div className="max-sm:text-sm">
                    {details.vote_average.toFixed(1)}/10 ({details.vote_count})
                  </div>
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground">Country:</div>
                  {details.production_countries.length > 0 ? (
                    <div className="flex flex-wrap">
                      {details.production_countries.map(({ name }, index) => {
                        return (
                          <Fragment key={index}>
                            {index > 0 && <div>,&nbsp;</div>}
                            <div>{name}</div>
                          </Fragment>
                        );
                      })}
                    </div>
                  ) : (
                    <div>N/A</div>
                  )}
                </div>

                <div className={movieInfoClasses}>
                  <div className="text-secondary-foreground max-sm:text-sm">
                    Language:
                  </div>
                  {details.spoken_languages.length > 0 ? (
                    <div className="flex flex-wrap">
                      {details.spoken_languages.map(
                        ({ english_name }, index) => {
                          return (
                            <Fragment key={index}>
                              {index > 0 && <div>,&nbsp;</div>}
                              <div>{english_name}</div>
                            </Fragment>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div>N/A</div>
                  )}
                </div>

                {details.belongs_to_collection && (
                  <div className={movieInfoClasses}>
                    <div className="text-secondary-foreground max-sm:text-sm">
                      Collection:
                    </div>
                    <Link
                      href={`/collection/${details.belongs_to_collection.id}`}
                      className="underline"
                    >
                      {details.belongs_to_collection.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Tabs id={movieId} />
        </div>
      </div>
    );
  }
};
