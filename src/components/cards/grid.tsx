import Link from "next/link";
import Image from "next/image";

import { Movie } from "@/types/movie";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";

type Props = {
  movies: Movie[] | undefined;
};

export const Grid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-4 max-md:grid-cols-4 max-sm:grid-cols-3">
      {movies?.map(({ id, title, poster_path }, index) => {
        return (
          <div key={index} className="flex flex-col gap-y-2">
            <Link href={`/movie/${id}`}>
              <figure className="bg-hover rounded-md relative overflow-hidden before:content-[''] before:block before:pt-[150%]">
                <Image
                  src={
                    poster_path ? POSTER_URL + poster_path : POSTER_NOT_FOUND
                  }
                  width={500}
                  height={750}
                  priority
                  alt={title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                  onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                />
              </figure>
            </Link>

            <Link
              href={`/movie/${id}`}
              className="text-base flex max-sm:text-sm"
            >
              {title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
