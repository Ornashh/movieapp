import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { Movie } from "@/types/movie";
import { POSTER_URL } from "@/utils/constants";

type Props = {
  movies: Movie[] | undefined;
};

export const Grid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
      {movies?.map(
        (
          { id, title, poster_path, vote_average, vote_count, release_date },
          index
        ) => {
          const releaseYear = release_date
            ? new Date(release_date).getFullYear()
            : "N/A";

          return (
            <div key={index} className="flex flex-col overflow-hidden">
              <Link href={`/movie/${id}`} title={title}>
                <figure className="bg-hover rounded-md relative overflow-hidden before:content-[''] before:block before:pt-[150%]">
                  <Image
                    src={
                      poster_path
                        ? POSTER_URL + poster_path
                        : "/poster-not-found.jpg"
                    }
                    width={500}
                    height={750}
                    loading={movies.length > 20 ? "lazy" : "eager"}
                    priority={movies.length <= 20}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                    onLoadingComplete={(img) =>
                      img.classList.remove("opacity-0")
                    }
                  />
                </figure>
              </Link>
              <div className="flex flex-col gap-y-1 p-2">
                <Link
                  href={`/movie/${id}`}
                  className="flex hover:underline max-sm:text-sm"
                >
                  <div className="font-medium truncate hover:underline">
                    {title}
                  </div>
                  &nbsp;
                  <div>({releaseYear})</div>
                </Link>
                <div className="flex items-center gap-x-2">
                  <Star className="text-icon w-4 h-4" />
                  <div className="text-sm font-medium">
                    {vote_average.toFixed(1)}&nbsp;({vote_count})
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
