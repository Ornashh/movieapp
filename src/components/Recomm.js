import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

SwiperCore.use([Navigation]);

const Recomm = ({ recomm }) => {
  const { poster_img, posterNotFound } = useGlobalContext();

  return (
    <>
      {recomm.length === 0 ? (
        ""
      ) : (
        <div className="recomm fade_in">
          <div className="main_title">Recommended Movies</div>
          <div className="recomm_inner">
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
              {recomm &&
                recomm.map((movie) => {
                  const { id, poster_path, title } = movie;
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
      )}
    </>
  );
};

export default Recomm;
