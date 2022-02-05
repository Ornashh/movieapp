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
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const MovieItem = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }
`;

const MovieInfoOuter = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
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
  font-size: 2rem;
  font-weight: 700;
`;

const MovieOverview = styled.div`
  font-size: 1.03rem;
  line-height: 1.2;
  margin-top: 5px;
`;

const MovieLink = styled.div`
  display: flex;
  margin: 20px 0;

  a {
    font-size: 1rem;
    color: #fff;
    background-color: #1976d2;
    border-radius: 5px;
    text-decoration: none;
    padding: 8px 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #165ea5;
    }
  }
`;

const NowPlaying = () => {
  const {backdrop_img, backdropNotFound} = useGlobalContext();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <MovieWrapper className="fade_in">
        <Title>Now Playing Movies</Title>
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
                    <MovieTitle>{title}</MovieTitle>
                    {overview === "" ? (
                      ""
                    ) : (
                      <MovieOverview>
                        {`${overview.substring(0, 200)}...`}
                      </MovieOverview>
                    )}
                    <MovieLink>
                      <Link to={`/movie/${id}`}>Details</Link>
                    </MovieLink>
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
