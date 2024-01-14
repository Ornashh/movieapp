import Link from "next/link";
import { Loading } from "../ui/loading";
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
        <div className="flex flex-col">
          <div className="bg-hover rounded-md grid grid-cols-[100px_1fr_1fr] gap-x-4 items-center py-3 px-4 max-sm:grid-cols-[50px_1fr_1fr]">
            <div className="font-medium max-sm:text-sm">Year</div>
            <div className="font-medium max-sm:text-sm">Movie</div>
            <div className="font-medium max-sm:text-sm">Role</div>
          </div>
          {movies.map(({ id, title, character, release_date }, index) => {
            return (
              <div
                key={index}
                className="border-b border-border grid grid-cols-[100px_1fr_1fr] items-center gap-x-4 py-3 px-4 last:border-none last:pb-0 max-sm:grid-cols-[50px_1fr_1fr]"
              >
                <div className="max-sm:text-sm">
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
                <div className="max-sm:text-sm">
                  {character ? character : "N/A"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
