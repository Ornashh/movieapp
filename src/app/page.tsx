"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetTrendingQuery,
} from "@/store/services/injections/moviesApi";
import { useGetGenresQuery } from "@/store/services/injections/genresApi";
import { BACKDROP_URL } from "@/utils/constants";

const buttons = [
  {
    icon: <ChevronLeft className="svg" />,
  },
  {
    icon: <ChevronRight className="svg" />,
  },
];

const Home = () => {
  const swiperRef = useRef<SwiperCore>();

  const { data: trending, isLoading: isLoadingTrending } =
    useGetTrendingQuery();
  const { data: genres } = useGetGenresQuery();
  const { data: popular } = useGetPopularQuery();
  const { data: topRated } = useGetTopRatedQuery();

  if (isLoadingTrending) {
    return <Loading isFullPage />;
  }

  return (
    <div className="flex flex-col gap-y-10 max-sm:gap-y-5">
      {trending && (
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium max-sm:text-lg">
              Trending today
            </div>
            <div className="flex">
              {buttons.map(({ icon }, index) => {
                return (
                  <Button
                    key={index}
                    size="icon"
                    variant="ghost"
                    onClick={
                      index === 0
                        ? () => swiperRef?.current?.slidePrev()
                        : () => swiperRef?.current?.slideNext()
                    }
                  >
                    {icon}
                  </Button>
                );
              })}
            </div>
          </div>
          <div>
            <Swiper
              speed={600}
              spaceBetween={8}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {trending?.results
                .slice(0, 10)
                .map(({ id, title, overview, backdrop_path }) => {
                  return (
                    <SwiperSlide key={id}>
                      <div className="rounded-md relative overflow-hidden">
                        <div
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8) 80%)",
                          }}
                          className="text-[#fafafa] flex items-end absolute top-0 left-0 w-full h-full p-4"
                        >
                          <div className="max-w-[600px] overflow-hidden">
                            <Link
                              href={`/movie/${id}`}
                              className="text-xl font-bold inline-flex max-sm:text-lg"
                            >
                              {title}
                            </Link>
                            <p className="line-clamp-2 max-sm:line-clamp-1">
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
                          className="aspect-video max-h-[400px] h-full object-cover"
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
        <div className="flex flex-col gap-y-2">
          <h2 className="text-lg font-medium">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.genres.map(({ id, name }) => {
              return (
                <Link
                  key={id}
                  href={`/genre/${id}`}
                  className="border border-border rounded-xl py-0.5 px-3 duration-200 ease-in-out hover:bg-accent"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {popular && (
        <Carousel
          title="What's popular"
          href="/popular"
          data={popular.results}
        />
      )}

      {topRated && (
        <Carousel title="Top rated" href="/top_rated" data={topRated.results} />
      )}
    </div>
  );
};

export default Home;
