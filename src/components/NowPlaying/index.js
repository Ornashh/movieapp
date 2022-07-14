import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./nowplaying.module.scss";

import Loading from "../Loading";
import { backdropImageUrl } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { getNowPlaying } from "./api";
SwiperCore.use([Autoplay, Pagination]);

const NowPlaying = () => {
  const { backdropNotFoundImage } = useSelector((state) => state);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNowPlaying()
      .then((res) => {
        setNowPlaying(res.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} isHalf>
      <div className="fade_in">
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
                <div className={s.item}>
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
                <div className={s.info_outer}>
                  <div className={s.info_inner}>
                    <div className={s.title}>{title}</div>
                    {overview ? (
                      <div className={s.overview}>
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
