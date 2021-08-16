import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { LazyLoadImage } from "react-lazy-load-image-component";

import css from "./pages.module.scss";

const { cards, cards_inner, cards_title, card, center } = css;

const Favorite = () => {
  const { favoriteArr, poster_img, posterNotFound } = useGlobalContext();

  return (
    <div className={`${cards} fade_in`}>
      {favoriteArr.length === 0 ? (
        <div className={`${cards_title} ${center}`}>Favorite list is empty</div>
      ) : (
        <>
          <div className={cards_title}>Favorite Movies</div>
          <div className={cards_inner}>
            {favoriteArr &&
              favoriteArr.map((movie) => {
                const { id, title, poster_path } = movie;
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
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorite;
