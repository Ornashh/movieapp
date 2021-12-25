import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

SwiperCore.use([Navigation]);

const TopRated = () => {
  const {topRatedArr, poster_img, posterNotFound, handleAdd, favoriteArr} =
    useGlobalContext();
  return (
    <div className="block fade_in">
      <div className="main_title">Top Rated Movies</div>
      <div className="topRated_inner">
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
          {topRatedArr?.map((movie) => {
            const {id, title, poster_path} = movie;
            return (
              <div key={id}>
                <SwiperSlide key={id}>
                  <div className="item">
                    <Link to={`/movie/${id}`}>
                      <LazyLoadImage
                        wrapperClassName="lazyLoad"
                        alt={title}
                        src={
                          poster_path
                            ? poster_img + poster_path
                            : posterNotFound
                        }
                      />
                    </Link>
                    <button
                      onClick={() => handleAdd(movie)}
                      className="btn_fav"
                    >
                      {favoriteArr.find((item) => item.id === movie.id) ? (
                        <AiFillHeart/>
                      ) : (
                        <AiOutlineHeart/>
                      )}
                    </button>
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

export default TopRated;
