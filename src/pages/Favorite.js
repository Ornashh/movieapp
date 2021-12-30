import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { LazyLoadImage } from "react-lazy-load-image-component";

import css from "./pages.module.scss";
import { AiFillHeart } from "react-icons/ai";

const Favorite = () => {
  let {favoriteArr, poster_img, posterNotFound, handleRemove, handleClear} =
    useGlobalContext();

  const {cards, cards_inner, cards_title, card, center, btn_fav} =
    css;

  return (
    <div className={`${cards} fade_in`}>
      {favoriteArr?.length === 0 ? (
        <div className={clsx(cards_title, center)}>Favorite list is empty</div>
      ) : (
        <>
          <div className={cards_title}>Favorite Movies</div>
          <div className={cards_inner}>
            {favoriteArr?.map((movie) => {
              const {id, title, poster_path} = movie;
              return (
                <div key={id} className={card}>
                  <Link to={`/movie/${id}`}>
                    <LazyLoadImage
                      wrapperClassName="lazyLoad"
                      src={
                        poster_path
                          ? poster_img + poster_path
                          : posterNotFound
                      }
                      alt={title}
                    />
                  </Link>
                  <button
                    onClick={() => handleRemove(movie)}
                    className={btn_fav}
                  >
                    <AiFillHeart/>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="btn_wrapper">
            <button onClick={handleClear}>Clear all</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorite;
