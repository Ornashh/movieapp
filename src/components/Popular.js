import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Lazy, Navigation } from "swiper/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "./Loading";
import { POPULAR_URL } from "../helpers/Config";

SwiperCore.use([Lazy, Navigation]);

const Popular = () => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} = useGlobalContext();
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopular = async (p) => {
      try {
        setLoading(true);
        const response = await fetch(POPULAR_URL + p);
        const data = await response.json();
        setPopular(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPopular();
  }, []);

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className="block fade_in">
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
            {popular?.map((movie) => {
              const {id, title, poster_path} = movie;
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
    </Loading>
  );
};

export default Popular;
