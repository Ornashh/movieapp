import React, { useState, useEffect } from 'react';
import { useGlobalContext } from "../context";
import { Link, useParams } from "react-router-dom";

import { API_KEY, API_URL } from "../helpers/Config";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

function PersonMovie() {
  const {id} = useParams();
  const {favoriteArr, handleAdd, poster_img, posterNotFound} = useGlobalContext();
  const [personMovie, setPersonMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPersonMovie(data.cast);
        console.log(data.cast);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className="person_movie">
        <div className="main_title">Movies</div>
        <div>
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
            {personMovie?.map((cast) => {
              const {id, credit_id, title, poster_path} = cast;
              return (
                <div key={id}>
                  <SwiperSlide key={credit_id}>
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
                        onClick={() => handleAdd(cast)}
                        className="btn_fav"
                      >
                        {favoriteArr.find(
                          (item) => item.id === cast.id
                        ) ? (
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
}

export default PersonMovie;