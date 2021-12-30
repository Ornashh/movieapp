import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import { API_KEY, API_URL } from "../../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../Loading";

import css from "./cast.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Cast = ({id}) => {
  const {poster_img, posterNotFound} = useGlobalContext();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const {cast, cast_inner, item, names, real_name, character_name} = css;

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCredits(data.cast);
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
    </Loading>
  );
};

export default Cast;
