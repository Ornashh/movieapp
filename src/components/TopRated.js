import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { TOP_RATED_URL } from "../helpers/Config";

SwiperCore.use([Navigation]);

const TopRated = () => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} = useGlobalContext();
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(TOP_RATED_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTopRated(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
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
            {topRated?.map((movie) => {
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
    </Loading>
  );
};

export default TopRated;
