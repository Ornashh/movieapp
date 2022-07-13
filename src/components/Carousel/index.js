import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./carousel.module.scss";
import { posterImageUrl } from "../../utils/Config";
import FavButton from "../FavButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

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
  1440: {
    slidesPerView: 6,
  },
  1700: {
    slidesPerView: 7,
  },
};

const Carousel = ({ title, data }) => {
  const { posterNotFoundImage } = useSelector((state) => state);

  return (
    <div className={s.carousel}>
      <div className={s.carousel_title}>{title}</div>
      <Swiper
        className="mySwiper"
        navigation={true}
        freeMode={true}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={breakpoints}
      >
        {data?.map((el) => {
          const { id, title, poster_path } = el;
          return (
            <SwiperSlide key={id}>
              <div className={s.carousel_card}>
                <Link to={`/movie/${id}`}>
                  <figure>
                    <picture>
                      <LazyLoadImage
                        effect="blur"
                        src={
                          poster_path
                            ? posterImageUrl + poster_path
                            : posterNotFoundImage
                        }
                        alt={title}
                      />
                    </picture>
                  </figure>
                </Link>
                <FavButton element={el} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
