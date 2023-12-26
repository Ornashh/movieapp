import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { Movie } from "@/types/movie";
import { POSTER_URL } from "@/utils/constants";

type Props = {
  movies: Movie[] | undefined;
};

export const List = ({ movies }: Props) => {
  return (
    <div className="grid gap-y-6">
      {movies?.map(
        (
          {
            id,
            title,
            overview,
            poster_path,
            vote_average,
            vote_count,
            release_date,
          },
          index
        ) => {
          const releaseYear = release_date
            ? new Date(release_date).getFullYear()
            : "N/A";

          return (
            <div key={index} className="flex gap-x-4 overflow-hidden">
              <Link href={`/movie/${id}`}>
                <figure className="w-[210px] h-[300px] max-sm:w-[110px] max-sm:h-[160px]">
                  <Image
                    src={
                      poster_path
                        ? POSTER_URL + poster_path
                        : "/poster-not-found.jpg"
                    }
                    width={500}
                    height={750}
                    alt={title}
                    loading={movies.length > 20 ? "lazy" : "eager"}
                    priority={movies.length <= 20}
                    className="rounded-md w-full h-full object-cover transition-opacity opacity-0 duration-500"
                    onLoadingComplete={(img) =>
                      img.classList.remove("opacity-0")
                    }
                  />
                </figure>
              </Link>

              <div className="flex flex-col gap-y-4 w-full overflow-hidden">
                <div className="flex flex-col gap-y-1">
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
                <p className="line-clamp-5 max-sm:text-sm">{overview}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
