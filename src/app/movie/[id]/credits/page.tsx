"use client";

import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loading } from "@/components/ui/loading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useGetCreditsQuery } from "@/rtk/services/injections/creditsApi";
import { useGetDetailsQuery } from "@/rtk/services/injections/moviesApi";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";

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
        <TabsList className="w-[300px] mx-auto max-sm:w-full">
          <TabsTrigger value="cast" className="max-sm:text-sm">
            Cast
          </TabsTrigger>
          <TabsTrigger value="crew" className="max-sm:text-sm">
            Crew
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cast">
          <div className="bg-hover rounded-md grid grid-cols-[1fr_1fr] gap-x-4 py-3 px-4">
            <div className="max-sm:text-sm">Name</div>
            <div className="max-sm:text-sm">Character</div>
          </div>
          {credits?.cast?.map(
            ({ id, name, profile_path, character }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border grid grid-cols-[1fr_1fr] gap-x-4 py-3 px-4 last:border-none"
                >
                  <div className="flex items-center gap-x-2">
                    <figure className="bg-hover rounded-full relative min-w-[48px] overflow-hidden before:content-[''] before:block before:pt-[48px] max-sm:min-w-[40px] max-sm:before:pt-[40px]">
                      <Image
                        src={
                          profile_path
                            ? POSTER_URL + profile_path
                            : POSTER_NOT_FOUND
                        }
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
                    <Link href={`/people/${id}`} className="max-sm:text-sm">
                      {name}
                    </Link>
                  </div>
                  <div className="flex items-center max-sm:text-sm">
                    {character ? character : "N/A"}
                  </div>
                </div>
              );
            }
          )}
        </TabsContent>
        <TabsContent value="crew">
          <div className="bg-hover rounded-md grid grid-cols-[1fr_1fr]">
            <div className="py-3 px-4 max-sm:text-sm">Name</div>
            <div className="py-3 px-4 max-sm:text-sm">Job</div>
          </div>
          {credits?.crew?.map(({ id, name, profile_path, job }, index) => {
            return (
              <div
                key={index}
                className="border-b border-border grid grid-cols-[1fr_1fr] last:border-none"
              >
                <div className="flex items-center gap-x-2 py-3 px-4">
                  <figure className="bg-hover rounded-full relative min-w-[48px] overflow-hidden before:content-[''] before:block before:pt-[48px] max-sm:min-w-[40px] max-sm:before:pt-[40px]">
                    <Image
                      src={
                        profile_path
                          ? POSTER_URL + profile_path
                          : POSTER_NOT_FOUND
                      }
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
                  <Link href={`/people/${id}`} className="max-sm:text-sm">
                    {name}
                  </Link>
                </div>
                <div className="flex items-center py-3 px-4 max-sm:text-sm">
                  {job ? job : "N/A"}
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Credits;
