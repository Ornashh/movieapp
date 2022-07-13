import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "./nowplaying.module.scss";
import { backdropImageUrl } from "../../utils/Config";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../Loading";
import { NOW_PLAYING_URL } from "../../utils/Config";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { useSelector } from "react-redux";
SwiperCore.use([Autoplay, Pagination]);

const NowPlaying = () => {
  const { backdropNotFoundImage } = useSelector((state) => state);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NOW_PLAYING_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setNowPlaying(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <div className={`${s.movie_wrapper} fade_in`}>
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {nowPlaying?.map((movie) => {
            const { id, title, overview, backdrop_path } = movie;
            return (
              <SwiperSlide key={id}>
                <div className={s.movie_item}>
                  <LazyLoadImage
                    effect="blur"
                    src={
                      backdrop_path
                        ? backdropImageUrl + backdrop_path
                        : backdropNotFoundImage
                    }
                    alt={title || "movie"}
                  />
                </div>
                <div className={s.movie_info_outer}>
                  <div className={s.movie_info_inner}>
                    <div className={s.movie_title}>{title}</div>
                    {overview ? (
                      <div className={s.movie_overview}>
                        {`${overview.substring(0, 200)}...`}
                      </div>
                    ) : null}
                    <div className={s.link_wrapper}>
                      <Link
                        to={`/movie/${id}`}
                        style={{ backgroundColor: "rgb(25, 118, 210)" }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Loading>
  );
};

export default NowPlaying;
