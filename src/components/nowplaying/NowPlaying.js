import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import { NOW_PLAYING_URL } from "../../helpers/Config";
import Loading from "../Loading";

import css from "./nowPlaying.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

SwiperCore.use([Autoplay, Pagination]);

const NowPlaying = () => {
  const {backdrop_img, backdropNotFound} = useGlobalContext();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    nowPlaying_inner,
    nowPlaying_title,
    item,
    info,
    info_inner,
    info_title,
    info_overview,
    info_link,
  } = css;

  useEffect(() => {
    fetch(NOW_PLAYING_URL).then((resp) => {
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
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className="block fade_in">
        <div className={nowPlaying_title}>Now Playing Movies</div>
        <div className={nowPlaying_inner}>
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
              const {id, title, overview, backdrop_path} = movie;
              return (
                <div key={id}>
                  <SwiperSlide key={id}>
                    <div className={item}>
                      <img
                        src={
                          backdrop_path
                            ? backdrop_img + backdrop_path
                            : backdropNotFound
                        }
                        alt={title || "movie"}
                      />
                    </div>
                    <div className={info}>
                      <div className={info_inner}>
                        <div className={info_title}>{title}</div>
                        {overview === "" ? (
                          ""
                        ) : (
                          <div className={info_overview}>
                            {`${overview.substring(0, 200)}...`}
                          </div>
                        )}
                        <div className={info_link}>
                          <Link to={`/movie/${id}`}>Details</Link>
                        </div>
                      </div>
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

export default NowPlaying;
