import React from "react";
import { useGlobalContext } from "../../context";
import { v4 as uuidv4 } from "uuid";

import css from "./cast.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

SwiperCore.use([Navigation]);

const Cast = ({ credits }) => {
  const { poster_img, posterNotFound } = useGlobalContext();

  const { cast, cast_inner, item, names, names_real, names_character } = css;

  return (
    <div className={cast}>
      <div className={`${cast_inner} fade_in`}>
        <Swiper
          className="mySwiper"
          navigation={true}
          freeMode={true}
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {credits &&
            credits.map((cast) => {
              const { id, profile_path, name, character } = cast;
              return (
                <div key={id}>
                  <SwiperSlide key={uuidv4()}>
                    <div className={item}>
                      <LazyLoadImage
                        wrapperClassName="lazyLoad"
                        src={
                          profile_path
                            ? poster_img + profile_path
                            : posterNotFound
                        }
                        alt={name}
                      />
                    </div>
                    <div className={names}>
                      <div className={names_real}>{name}</div>
                      <div className={names_character}>{character}</div>
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Cast;
