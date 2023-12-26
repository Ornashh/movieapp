"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "@/components/carousel";
import { IconButton } from "@/components/ui/iconButton";
import {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetTrendingQuery,
} from "@/rtk/services/injections/moviesApi";
import { useGetGenresQuery } from "@/rtk/services/injections/genresApi";
import { BACKDROP_URL } from "@/utils/constants";

const Home = () => {
  const swiperRef = useRef<SwiperCore>();

  const { data: trending } = useGetTrendingQuery();
  const { data: genres } = useGetGenresQuery();
  const { data: popular } = useGetPopularQuery(1);
  const { data: topRated } = useGetTopRatedQuery(1);

  return (
    <div className="flex flex-col gap-y-10 max-sm:gap-y-5">
      {trending && (
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium max-sm:text-lg">
              Trending today
            </div>
            <div className="flex">
              <IconButton
                aria-label="left-navigation"
                icon={<ChevronLeft className="svg" />}
                onClick={() => swiperRef?.current?.slidePrev()}
              />
              <IconButton
                aria-label="right-navigation"
                icon={<ChevronRight className="svg" />}
                onClick={() => swiperRef?.current?.slideNext()}
              />
            </div>
          </div>
          <div>
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {trending?.results
                .slice(0, 10)
                .map(({ id, title, overview, backdrop_path }) => {
                  return (
                    <SwiperSlide key={id}>
                      <div className="rounded-xl relative overflow-hidden">
                        <div className="text-[#fafafa] bg-black/60 flex items-center absolute top-0 left-0 w-full h-full p-5">
                          <div className="flex flex-col gap-y-1 max-w-[600px] overflow-hidden">
                            <Link
                              href={`/movie/${id}`}
                              className="text-xl font-bold truncate max-sm:text-base"
                            >
                              {title}
                            </Link>
                            <p className="line-clamp-2 max-sm:text-sm">
                              {overview}
                            </p>
                          </div>
                        </div>
                        <Image
                          src={BACKDROP_URL + backdrop_path}
                          width={1280}
                          height={1080}
                          alt={title}
                          priority
                          className="aspect-video max-h-[500px] h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      )}

      {genres && (
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-medium max-sm:text-lg">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.genres.map(({ id, name }) => {
              return (
                <Link
                  key={id}
                  href={`/genre/${id}`}
                  className="border border-border rounded-xl py-1 px-4 duration-200 ease-in-out hover:bg-hover max-sm:text-sm"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {popular && (
        <Carousel title="Popular" href="/popular" data={popular.results} />
      )}

      {topRated && (
        <Carousel title="Top rated" href="/top_rated" data={topRated.results} />
      )}
    </div>
  );
};

export default Home;
