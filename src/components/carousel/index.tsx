"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";
import { Cast } from "@/types/credits";
import { POSTER_NOT_FOUND, POSTER_URL } from "@/utils/constants";
import { cn } from "@/utils/cn";

type Props = {
  title: string;
  href?: string;
  data: Movie[] | Cast[] | undefined;
};

const breakpoints = {
  640: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 5,
  },
  1024: {
    slidesPerView: 5,
  },
};

const buttons = [
  {
    icon: <ChevronLeft className="svg" />,
  },
  {
    icon: <ChevronRight className="svg" />,
  },
];

export const Carousel = ({ title, href, data }: Props) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={cn(
          "flex items-center",
          title ? "justify-between" : "justify-end"
        )}
      >
        <div className="flex items-center gap-x-2">
          {href ? (
            <Link
              href={href}
              className="text-lg font-medium flex items-center gap-x-2"
            >
              {title} <ArrowUpRight className="svg" />
            </Link>
          ) : (
            <div className="text-lg font-medium">{title}</div>
          )}
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
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={3}
          spaceBetween={8}
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
              const link = name ? `/people/${id}` : `/movie/${id}`;
              const releaseYear = release_date
                ? new Date(release_date).getFullYear()
                : "N/A";

              return (
                <SwiperSlide key={id}>
                  <div className="flex flex-col gap-y-2">
                    <Link href={link}>
                      <figure className="bg-accent rounded-md relative overflow-hidden before:content-[''] before:block before:pt-[150%]">
                        <Image
                          src={path ? POSTER_URL + path : POSTER_NOT_FOUND}
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
                        <div className="flex">{name}</div>
                        <div className="text-sm text-muted-foreground">
                          {character}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="truncate">{title}</div>
                        <div className="text-sm text-muted-foreground">
                          {releaseYear}
                        </div>
                      </div>
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
