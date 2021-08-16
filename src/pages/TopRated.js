import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { AiOutlineHeart } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

import css from "./pages.module.scss";

const TopRated = () => {
  const { topRatedArr, poster_img, posterNotFound, page, setPage, handleAdd } =
    useGlobalContext();

  const { cards, cards_inner, cards_title, card, btn_more, btn_fav } = css;

  return (
    <div className={`${cards} fade_in`}>
      <div className={cards_title}>Top Rated Movies</div>
      <div className={cards_inner}>
        {topRatedArr &&
          topRatedArr.map((movie) => {
            const { id, title, poster_path } = movie;
            return (
              <div key={id} className={card}>
                <Link to={`/movie/${id}`}>
                  <LazyLoadImage
                    wrapperClassName="lazyLoad"
                    src={
                      poster_path ? poster_img + poster_path : posterNotFound
                    }
                    alt={title}
                  />
                </Link>
                <button onClick={() => handleAdd(movie)} className={btn_fav}>
                  <AiOutlineHeart />
                </button>
              </div>
            );
          })}
      </div>
      <div className={btn_more}>
        <button onClick={() => setPage(page + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default TopRated;
