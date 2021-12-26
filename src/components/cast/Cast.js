import React from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import css from "./cast.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

SwiperCore.use([Navigation]);

const Cast = ({credits}) => {
  const {poster_img, posterNotFound} = useGlobalContext();

  const {cast, cast_inner, item, names, real_name, character_name} = css;

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
          {credits?.map((cast) => {
            const {id, cast_id, profile_path, name, character} = cast;
            return (
              <div key={id}>
                <SwiperSlide key={cast_id}>
                  <div className={item}>
                    <Link to={`/person/${id}`}>
                      <LazyLoadImage
                        wrapperClassName="lazyLoad"
                        src={
                          profile_path
                            ? poster_img + profile_path
                            : posterNotFound
                        }
                        alt={name}
                      />
                    </Link>
                  </div>
                  <div className={names}>
                    <div className={real_name}>{name}</div>
                    <div className={character_name}>{character}</div>
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
