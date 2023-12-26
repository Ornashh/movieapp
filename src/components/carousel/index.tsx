"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { IconButton } from "../ui/iconButton";
import { Movie } from "@/types/movie";
import { Cast } from "@/types/credits";
import { POSTER_URL } from "@/utils/constants";
import { cn } from "@/utils/cn";

type Props = {
  title: string;
  href?: string;
  data: Movie[] | Cast[] | undefined;
};

const breakpoints = {
  640: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
};

export const Carousel = ({ title, href, data }: Props) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={cn(
          "flex items-center",
          title ? "justify-between" : "justify-end"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="text-xl font-medium max-sm:text-lg">{title}</div>
          {href && (
            <Link href={href} className="text-sm text-secondary-foreground">
              View all
            </Link>
          )}
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
          slidesPerView={3}
          spaceBetween={10}
          freeMode
          modules={[FreeMode, Navigation]}
          breakpoints={breakpoints}
        >
          {data?.map(
            ({
              id,
              title,
              name,
              character,
              poster_path,
              profile_path,
              release_date,
            }: any) => {
              const path = name ? profile_path : poster_path;
              const link = name ? `/person/${id}` : `/movie/${id}`;
              const releaseYear = release_date
                ? new Date(release_date).getFullYear()
                : "N/A";

              return (
                <SwiperSlide key={id}>
                  <div className="flex flex-col gap-y-2">
                    <Link href={link} title={title || name}>
                      <figure className="bg-hover rounded-md relative overflow-hidden before:content-[''] before:block before:pt-[150%]">
                        <Image
                          src={
                            path ? POSTER_URL + path : "/poster-not-found.jpg"
                          }
                          width={500}
                          height={750}
                          alt={title || name}
                          loading="lazy"
                          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                          onLoadingComplete={(img) =>
                            img.classList.remove("opacity-0")
                          }
                        />
                      </figure>
                    </Link>
                    {name ? (
                      <div>
                        <Link
                          href={link}
                          className="font-medium truncate hover:underline max-sm:text-sm"
                        >
                          {name}
                        </Link>
                        <div className="text-secondary-foreground truncate text-sm">
                          {character}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link}
                        className="max-sm:text-sm flex hover:underline"
                      >
                        <div className="font-medium truncate hover:underline">
                          {title}
                        </div>
                        &nbsp;
                        <div>({releaseYear})</div>
                      </Link>
                    )}
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
    </div>
  );
};
