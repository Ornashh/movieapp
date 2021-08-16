import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Lazy, Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

SwiperCore.use([Lazy, Navigation]);

const Popular = () => {
  const { popularArr, poster_img, posterNotFound } = useGlobalContext();

  return (
    <div className="popular fade_in">
      <div className="main_title">Popular Movies</div>
      <div className="popular_inner">
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
          {popularArr &&
            popularArr.map((movie) => {
              const { id, title, poster_path } = movie;
              return (
                <div key={id}>
                  <SwiperSlide key={id}>
                    <div className="item">
                      <Link to={`/movie/${id}`}>
                        <LazyLoadImage
                          wrapperClassName="lazyLoad"
                          src={
                            poster_path
                              ? poster_img + poster_path
                              : posterNotFound
                          }
                          alt={title}
                        />
                      </Link>
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

export default Popular;
