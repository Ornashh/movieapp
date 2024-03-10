import Link from "next/link";
import Image from "next/image";

import { Movie } from "@/types/movie";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";

type Props = {
  movies: Movie[] | undefined;
};

export const List = ({ movies }: Props) => {
  return (
    <div className="grid gap-y-4">
      {movies?.map(
        ({ id, title, overview, poster_path, release_date }, index) => {
          const releaseYear = release_date
            ? new Date(release_date).getFullYear()
            : "N/A";

          return (
            <div key={index} className="flex gap-x-4 overflow-hidden">
              <Link href={`/movie/${id}`}>
                <figure className="bg-hover rounded-md relative min-w-[180px] max-h-[270px] overflow-hidden before:content-[''] before:block before:pt-[270px] max-sm:min-w-[120px] max-sm:max-h-[180px] max-sm:before:pt-[180px]">
                  <Image
                    src={
                      poster_path ? POSTER_URL + poster_path : POSTER_NOT_FOUND
                    }
                    width={500}
                    height={750}
                    alt={title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                    onLoadingComplete={(img) =>
                      img.classList.remove("opacity-0")
                    }
                  />
                </figure>
              </Link>

              <div className="flex flex-col items-start gap-y-2">
                <Link href={`/movie/${id}`} className="max-sm:text-sm">
                  {title} ({releaseYear})
                </Link>
                <p className="line-clamp-5 max-sm:text-sm">{overview}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
