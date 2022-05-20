import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { NOW_PLAYING_URL } from "../helpers/Config";
import Loading from "./Loading";

import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
SwiperCore.use([Autoplay, Pagination]);

const MovieWrapper = styled.div`
  margin-bottom: 35px;
  padding-left: 90px;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

const MovieItem = styled.div`
  position: relative;
  width: 100%;
  height: 600px;

  @media (max-width: 768px) {
    height: 350px;
  }

  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }
`;

const MovieInfoOuter = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const MovieInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding-left: 50px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const MovieTitle = styled.div`
  margin-bottom: 15px;

  a {
    color: #fff;
    font-size: 40px;
    font-weight: 700;
    position: relative;
    transition: all 0.2s linear;

    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 10px;
    }

    &:hover {
      color: #1976d2;
    }
  }
`;

const MovieOverview = styled.div`
  font-size: 16px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const NowPlaying = () => {
  const { backdrop_img, backdropNotFound } = useGlobalContext();
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
      <MovieWrapper className="fade_in">
        <Swiper
          // autoplay={{
          //   delay: 10000,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {nowPlaying?.map((movie) => {
            const { id, title, overview, backdrop_path } = movie;
            return (
              <SwiperSlide key={id}>
                <MovieItem>
                  <img
                    src={
                      backdrop_path
                        ? backdrop_img + backdrop_path
                        : backdropNotFound
                    }
                    alt={title || "movie"}
                  />
                </MovieItem>
                <MovieInfoOuter>
                  <MovieInfoInner>
                    <MovieTitle>
                      <Link to={`/movie/${id}`}>{title}</Link>
                    </MovieTitle>
                    {overview ? (
                      <MovieOverview>
                        {`${overview.substring(0, 200)}...`}
                      </MovieOverview>
                    ) : null}
                  </MovieInfoInner>
                </MovieInfoOuter>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MovieWrapper>
    </Loading>
  );
};

export default NowPlaying;
