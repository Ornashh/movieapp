import React from "react";
import { useGlobalContext } from "../context";

import styled from "styled-components";

import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import Loading from "./Loading";

const Movie = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  padding: 20px 20px 20px 110px;
  z-index: 5;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }

  @media screen and (max-width: 1024px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;

const MoviePoster = styled.div`
  width: 300px;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  img {
    border-radius: 5px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    max-width: 100%;
  }
`;

const MovieInfo = styled.div`
  width: 50%;
  margin-left: 50px;

  div {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
`;

const MovieTitle = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;

  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const MovieGenres = styled.div`
  font-weight: 500
`;

const MovieOverview = styled.div`
  font-size: 1.03rem;
  line-height: 1.2;
`;

const MovieMoreInfo = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  
  div {
    margin: 0 !important;
    
    h4 {
      &:not(:last-child) {
        margin: 0 0 10px 0 !important;
      }
    }
    
    p {
      &:not(:last-child) {
        margin: 0 0 10px 0 !important;
      }
    }
  }
`;

const Details = ({details, loading}) => {
  const {poster_img, backdrop_img, posterNotFound, backdropNotFound} =
    useGlobalContext();

  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
    release_date,
    runtime,
    budget,
    revenue,
    vote_average,
  } = details;

  let poster;
  poster_path ? (poster = poster_img + poster_path) : (poster = posterNotFound);

  let backdrop;
  backdrop_path
    ? (backdrop = backdrop_img + backdrop_path)
    : (backdrop = backdropNotFound);

  const backgroundImg = {
    background: `url(${backdrop}) no-repeat center center/cover fixed`,
  };

  const moneyConverter = (money) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    return formatter.format(money);
  };

  const timeConverter = (time) => {
    const hour = Math.floor(time / 60);
    const min = time % 60;
    return `${hour}h ${min}m`;
  };

  return (
    <Loading loading={loading}>
      <Movie className="fade_in" style={backgroundImg}>
        <MoviePoster>
          <img src={poster} alt={title || "movie_title"}/>
        </MoviePoster>
        <MovieInfo>
          <MovieTitle>{title}</MovieTitle>
          <MovieGenres>
            {genres?.map((genre) => {
              return genre.name;
            }).join(", ")}
          </MovieGenres>
          <div>
            <Rate
              value={vote_average / 2}
              count={5}
              disabled={true}
              allowHalf={true}
            />
          </div>
          <MovieOverview>{overview}</MovieOverview>
          <MovieMoreInfo>
            <div>
              <h4>Release:</h4>
              <h4>Runtime:</h4>
              <h4>Budget:</h4>
              <h4>Revenue:</h4>
            </div>
            <div>
              <p>
                {new Date(release_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>{timeConverter(runtime)}</p>
              <p>{moneyConverter(budget)}</p>
              <p>{moneyConverter(revenue)}</p>
            </div>
          </MovieMoreInfo>
        </MovieInfo>
      </Movie>
    </Loading>
  );
};

export default Details;
