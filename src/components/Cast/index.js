import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "./cast.module.scss";
import Loading from "../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCast } from "../../api";
import { POSTER_URL, POSTER_NOT_FOUND } from "../../utils/constants";
import { useSnackbar } from "notistack";

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

const Cast = ({ id }) => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    getCast(id)
      .then((res) => {
        setCredits(res.cast);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} isHalf>
      <div className={s.cast_wrapper}>
        <Swiper
          className="mySwiper"
          navigation={true}
          freeMode={true}
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {credits?.map((cast) => {
            const { id, profile_path, name, character } = cast;
            return (
              <SwiperSlide key={id}>
                <div className={s.card}>
                  <Link to={`/person/${id}`}>
                    <figure>
                      <picture>
                        <LazyLoadImage
                          src={
                            profile_path
                              ? POSTER_URL + profile_path
                              : POSTER_NOT_FOUND
                          }
                          alt={name}
                          effect="blur"
                        />
                      </picture>
                    </figure>
                  </Link>
                </div>
                <div className={s.card_desc}>
                  <h3>{name}</h3>
                  <p>{character}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Loading>
  );
};

export default Cast;
