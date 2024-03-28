import Link from "next/link";
import { Loading } from "@/components/ui/loading";
import { useGetPersonMoviesQuery } from "@/store/services/injections/moviesApi";

export const Movies = ({ personId }: { personId: number }) => {
  const { data: personMovies, isLoading } = useGetPersonMoviesQuery(personId, {
    skip: !personId,
  });

  const movies = personMovies?.cast || [];

  if (isLoading) {
    return <Loading />;
  }

  if (movies && movies.length > 0) {
    return (
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl font-medium max-sm:text-lg">Movies</h2>

        <div className="flex flex-col gap-y-4">
          {[...movies]
            .sort((a, b) => {
              const releaseDateA: string = a.release_date || "";
              const releaseDateB: string = b.release_date || "";

              if (!releaseDateA && !releaseDateB) {
                return 0;
              } else if (!releaseDateA) {
                return 1;
              } else if (!releaseDateB) {
                return -1;
              } else {
                return (
                  new Date(releaseDateB).getTime() -
                  new Date(releaseDateA).getTime()
                );
              }
            })
            .map(({ id, title, character, release_date }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border grid grid-cols-[40px_1fr_1fr] gap-x-2 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="text-muted-foreground">
                    {release_date
                      ? new Date(release_date).toLocaleDateString("en-US", {
                          year: "numeric",
                        })
                      : "N/A"}
                  </div>

                  <div>
                    <Link href={`/movie/${id}`}>{title}</Link>
                  </div>

                  <div className="text-muted-foreground">
                    {character ? `as ${character}` : "N/A"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};
