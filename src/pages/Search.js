import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { SEARCH_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";

import css from "../pages/pages.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Search = () => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} = useGlobalContext();
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const {cards, cards_inner, cards_title, card, btn_fav, form, empty} = css;

  useEffect(() => {
    if (name) {
      setLoading(true);
      fetch(SEARCH_URL + name)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setResults(data.results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setName(value.current.value);
    value.current.value = "";
  };

  return (
    <Loading loading={loading}>
      <form className={form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" ref={value}/>
      </form>

      {name ? (
        <div className={`${cards} fade_in`}>
          <div className={cards_title}>Results: {name}</div>
          <div className={cards_inner}>
            {results?.map((movie) => {
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
                    onClick={() => handleAdd(movie)}
                    className={btn_fav}
                  >
                    {favoriteArr.find((item) => item.id === movie.id) ? (
                      <AiFillHeart/>
                    ) : (
                      <AiOutlineHeart/>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={`${empty} fade_in`}>No search results</div>
      )}
    </Loading>
  );
};

export default Search;
