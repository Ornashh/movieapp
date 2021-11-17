import React from "react";
import css from "./details.module.scss";
import { useGlobalContext } from "../../context";

const Details = ({ details }) => {
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
  } = details;

  const {
    movie,
    movie_poster,
    movie_info,
    movie_name,
    movie_genres,
    movie_overview,
    movie_moreInfo,
    moreInfo_item
  } = css;

  let poster;
  poster_path ? (poster = poster_img + poster_path) : (poster = posterNotFound);

  let backdrop;
  backdrop_path
    ? (backdrop = backdrop_img + backdrop_path)
    : (backdrop = backdropNotFound);

  const backgroundImg = {
    background: `url(${backdrop}) no-repeat center center/cover`,
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
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`${movie} fade_in`} style={backgroundImg}>
      <div className={movie_poster}>
        <img src={poster} alt={title || "movie_title"} />
      </div>
      <div className={movie_info}>
        <div className={movie_name}>{title}</div>
        <div className={movie_genres}>
          {genres &&
            genres
              .map((genre, id) => {
                return genre.name;
              })
              .join(", ")}
        </div>
        <div className={movie_overview}>{overview}</div>
        <div className={movie_moreInfo}>
          <div className={moreInfo_item}>
            <div>Release</div>
            <div>Runtime</div>
            <div>Budget</div>
            <div>Revenue</div>
            <div>Rating</div>
          </div>
          <div className={moreInfo_item}>
            <div>{new Date(release_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric"})}</div>
            <div>{timeConverter(runtime)}</div>
            <div>{moneyConverter(budget)}</div>
            <div>{moneyConverter(revenue)}</div>
            <div>{vote_average}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
