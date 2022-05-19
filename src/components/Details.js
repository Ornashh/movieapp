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
  min-height: 600px;
  padding: 20px 20px 20px 110px;
  z-index: 5;

  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 20px;
    padding: 0;
    height: auto;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  @media screen and (max-width: 1024px) {
    position: static;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    @media screen and (max-width: 1024px) {
      background-color: unset;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MoviePoster = styled.div`
  width: 300px;

  img {
    border-radius: 5px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    max-width: 100%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const MovieInfo = styled.div`
  width: 50%;
  margin-left: 50px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
    padding: 20px;
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
  font-weight: 500;
  margin: 15px 0;
`;

const MovieOverview = styled.div`
  font-size: 1.03rem;
  line-height: 1.2;
  margin: 15px 0;
`;

const MovieMoreInfo = styled.div`
  div {
    display: grid;
    grid-template-columns: 150px 1fr;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const Details = ({ details, loading }) => {
  const { poster_img, backdrop_img, posterNotFound, backdropNotFound } =
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
    production_countries,
    production_companies,
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

  const formatter = (data) => {
    return data
      ?.map((el) => {
        return el.name;
      })
      .join(", ");
  };

  const dateFormat = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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

  const productionFormat = production_companies
    ?.map((production) => {
      return production.name;
    })
    .join(", ");

  return (
    <Loading loading={loading}>
      <Movie className="fade_in">
        <BackgroundImage>
          <img src={backdrop} alt="#" />
        </BackgroundImage>
        <MoviePoster>
          <img src={poster} alt={title || "movie_title"} />
        </MoviePoster>
        <MovieInfo>
          <MovieTitle>{title}</MovieTitle>
          <MovieGenres>{formatter(genres)}</MovieGenres>
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
              <h4>Country:</h4>
              <p>{formatter(production_countries)}</p>
            </div>
            <div>
              <h4>Release:</h4>
              <p>{dateFormat}</p>
            </div>
            <div>
              <h4>Runtime:</h4>
              <p>{timeConverter(runtime)}</p>
            </div>
            <div>
              <h4>Budget:</h4>
              <p>{moneyConverter(budget)}</p>
            </div>
            <div>
              <h4>Revenue:</h4>
              <p>{moneyConverter(revenue)}</p>
            </div>
            <div>
              <h4>Production:</h4>
              <p>{productionFormat}</p>
            </div>
          </MovieMoreInfo>
        </MovieInfo>
      </Movie>
    </Loading>
  );
};

export default Details;
