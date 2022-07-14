import React from "react";

import s from "./details.module.scss";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import Loading from "../Loading";
import {
  POSTER_URL,
  BACKDROP_URL,
  POSTER_NOT_FOUND,
  BACKDROP_NOT_FOUND,
} from "../../utils/constants";

const Details = ({ details, loading }) => {
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
  poster_path
    ? (poster = POSTER_URL + poster_path)
    : (poster = POSTER_NOT_FOUND);

  let backdrop;
  backdrop_path
    ? (backdrop = BACKDROP_URL + backdrop_path)
    : (backdrop = BACKDROP_NOT_FOUND);

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
      <div className={`${s.movie} fade_in`}>
        <div className={s.backdrop}>
          <img src={backdrop} alt={title} />
        </div>
        <div className={s.poster}>
          <img src={poster} alt={title || "movie_title"} />
        </div>
        <div className={s.info}>
          <div className={s.title}>{title}</div>
          <div className={s.genres}>{formatter(genres)}</div>
          <div>
            <Rate
              value={vote_average / 2}
              count={5}
              disabled={true}
              allowHalf={true}
            />
          </div>
          <div className={s.overview}>{overview}</div>
          <div className={s.more_info}>
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
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Details;
