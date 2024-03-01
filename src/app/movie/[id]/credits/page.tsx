"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loading } from "@/components/ui/loading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useGetCreditsQuery } from "@/rtk/services/injections/creditsApi";
import { useGetDetailsQuery } from "@/rtk/services/injections/moviesApi";
import { POSTER_URL } from "@/utils/constants";

type Props = { params: { id: string } };

const Credits = ({ params }: Props) => {
  const movieId = Number(params.id);

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

      <Tabs defaultValue="cast">
        <TabsList className="">
          <TabsTrigger value="cast" className="max-sm:text-sm">
            Cast
          </TabsTrigger>
          <TabsTrigger value="crew" className="max-sm:text-sm">
            Crew
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cast">
          <div className="grid gap-y-4">
            {credits?.cast?.map(
              ({ id, name, profile_path, character }, index) => {
                return (
                  <div
                    key={index}
                    className="border-b border-border flex items-center gap-x-2 pb-4 last:border-b-0 last:pb-0"
                  >
                    {profile_path ? (
                      <figure className="bg-hover rounded-full relative min-w-[64px] overflow-hidden before:content-[''] before:block before:pt-[64px] max-sm:min-w-[56px] max-sm:before:pt-[56px]">
                        <Image
                          src={POSTER_URL + profile_path}
                          width={50}
                          height={50}
                          alt={name}
                          loading="lazy"
                          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                          onLoadingComplete={(img) =>
                            img.classList.remove("opacity-0")
                          }
                        />
                      </figure>
                    ) : (
                      <div className="bg-hover rounded-full flex justify-center items-center w-16 h-16 max-sm:w-14 max-sm:h-14">
                        <User className="text-icon w-7 h-7" />
                      </div>
                    )}

                    <div>
                      <Link href={`/people/${id}`} className="max-sm:text-sm">
                        {name}
                      </Link>
                      <div className="text-secondary-foreground max-sm:text-sm">
                        {character ? character : "N/A"}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </TabsContent>
        <TabsContent value="crew">
          <div className="grid gap-y-4">
            {credits?.crew?.map(({ id, name, profile_path, job }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border flex items-center gap-x-2 pb-4 last:border-b-0 last:pb-0"
                >
                  {profile_path ? (
                    <figure className="bg-hover rounded-full relative min-w-[64px] overflow-hidden before:content-[''] before:block before:pt-[64px] max-sm:min-w-[56px] max-sm:before:pt-[56px]">
                      <Image
                        src={POSTER_URL + profile_path}
                        width={50}
                        height={50}
                        alt={name}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                        onLoadingComplete={(img) =>
                          img.classList.remove("opacity-0")
                        }
                      />
                    </figure>
                  ) : (
                    <div className="bg-hover rounded-full flex justify-center items-center w-16 h-16 max-sm:w-14 max-sm:h-14">
                      <User className="text-icon w-7 h-7" />
                    </div>
                  )}
                  <div>
                    <Link href={`/people/${id}`} className="max-sm:text-sm">
                      {name}
                    </Link>
                    <div className="text-secondary-foreground max-sm:text-sm">
                      {job ? job : "N/A"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Credits;
