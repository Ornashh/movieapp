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

  return (
    <>
      {movies && movies.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-medium max-sm:text-lg">Movies</h2>
          <div className="flex flex-col">
            <div className="bg-hover rounded-xl grid grid-cols-[100px_1fr_1fr] max-sm:grid-cols-[50px_1fr_1fr]">
              <div className="font-medium py-3 px-4 max-sm:text-sm">Year</div>
              <div className="font-medium py-3 px-4 max-sm:text-sm">Movie</div>
              <div className="font-medium py-3 px-4 max-sm:text-sm">Role</div>
            </div>
            {movies.map(({ id, title, character, release_date }, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-border grid grid-cols-[100px_1fr_1fr] last:border-none last:pb-0 max-sm:grid-cols-[50px_1fr_1fr]"
                >
                  <div className="py-3 px-4 max-sm:text-sm">
                    {release_date
                      ? new Date(release_date).toLocaleDateString("en-US", {
                          year: "numeric",
                        })
                      : "N/A"}
                  </div>
                  <Link
                    href={`/movie/${id}`}
                    className="py-3 px-4 hover:underline max-sm:text-sm"
                  >
                    {title}
                  </Link>
                  <div className="py-3 px-4 max-sm:text-sm">
                    {character ? character : "N/A"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
