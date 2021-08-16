import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { LazyLoadImage } from "react-lazy-load-image-component";

import css from "./pages.module.scss";

<<<<<<< HEAD
const { cards, cards_inner, cards_title, card } = css;
=======
const { favorite, cards_inner, cards_title, card } = css;
>>>>>>> 98643ee061112cb98326be195a60997631e63431

const Favorite = () => {
  const { favoriteArr, poster_img, posterNotFound } = useGlobalContext();

  return (
<<<<<<< HEAD
    <div className={`${cards} fade_in`}>
=======
    <div className={`${favorite} fade_in`}>
>>>>>>> 98643ee061112cb98326be195a60997631e63431
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
                      poster_path ? poster_img + poster_path : posterNotFound
                    }
                    alt={title}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorite;
