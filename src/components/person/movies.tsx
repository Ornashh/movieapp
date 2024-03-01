import Link from "next/link";
import { Loading } from "@/components/ui/loading";
import { useGetPersonMoviesQuery } from "@/rtk/services/injections/moviesApi";

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
          {movies.map(({ id, title, character, release_date }, index) => {
            return (
              <div
                key={index}
                className="border-b border-border grid grid-cols-[60px_1fr_1fr] pb-4 last:border-b-0 last:pb-0"
              >
                <div className="text-secondary-foreground max-sm:text-sm">
                  {release_date
                    ? new Date(release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                      })
                    : "N/A"}
                </div>

                <div>
                  <Link href={`/movie/${id}`} className="max-sm:text-sm">
                    {title}
                  </Link>
                </div>

                <div className="text-secondary-foreground max-sm:text-sm">
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
