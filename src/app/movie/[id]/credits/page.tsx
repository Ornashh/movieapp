"use client";

import Link from "next/link";

import { Loading } from "@/components/ui/loading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Alert } from "@/components/ui/alert";
import { useGetCreditsQuery } from "@/rtk/services/injections/creditsApi";
import { useGetDetailsQuery } from "@/rtk/services/injections/moviesApi";

type Props = { params: { id: string } };

const Credits = ({ params }: Props) => {
  const movieId = Number(params.id);

  const { data: credits, isLoading: isLoadingCredits } = useGetCreditsQuery(
    movieId,
    { skip: !movieId }
  );

  const {
    data: details,
    isError: isErrorDetails,
    error: detailsError,
  } = useGetDetailsQuery(movieId, { skip: !movieId });

  if (isLoadingCredits) {
    return <Loading isFullPage />;
  }

  if (isErrorDetails) {
    // @ts-ignore
    const errorMsg = detailsError.data.status_message;

    return <Alert isFullPage>{errorMsg}</Alert>;
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

      <div className="flex flex-col gap-y-2">
        <div className="text-xl font-medium max-sm:text-lg">Directed by</div>

        <div className="flex">
          {credits?.crew?.map(({ id, name, job }) => {
            if (job === "Director") {
              return (
                <Link key={id} href={`/people/${id}`}>
                  {name}
                </Link>
              );
            }
          })}
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="text-xl font-medium max-sm:text-lg">Full cast</div>

        <div className="flex flex-col gap-y-4">
          {credits?.cast?.map(({ id, name, character }) => {
            return (
              <div
                key={id}
                className="border-b border-border grid grid-cols-2 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <Link href={`/people/${id}`} className="">
                    {name}
                  </Link>
                </div>
                <div className="text-muted-foreground">
                  {character ? `as ${character}` : "N/A"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Credits;
