import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { AiOutlineHeart } from "react-icons/ai";
import css from "../pages/pages.module.scss";

const { cards, cards_inner, cards_title, card, btn_fav } = css;

const Search = () => {
  const { resultsArr, poster_img, posterNotFound, name, search, handleAdd } =
    useGlobalContext();

  const value = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    search(value.current.value);
    value.current.value = "";
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" ref={value} />
      </form>

      <div className={`${cards} fade_in`}>
        {name && <div className={cards_title}>Results: {name}</div>}
        <div className={cards_inner}>
          {resultsArr &&
            resultsArr.map((movie) => {
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
      </div>
    </>
  );
};

export default Search;
