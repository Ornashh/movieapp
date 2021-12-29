import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { TOP_RATED_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";

import css from "./pages.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const TopRated = () => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} = useGlobalContext();
  const [topRated, setTopRated] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const {cards, cards_inner, cards_title, card, btn_fav} = css;

  useEffect(() => {
    fetch(TOP_RATED_URL + page)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTopRated([...topRated, ...data.results]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <Loading loading={loading}>
      <div className={`${cards} fade_in`}>
        <div className={cards_title}>Top Rated Movies</div>
        <div className={cards_inner}>
          {topRated?.map((movie) => {
            const {id, title, poster_path} = movie;
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
        <div className="btn_wrapper">
          <button onClick={() => setPage(page + 1)}>Load More</button>
        </div>
      </div>
    </Loading>
  );
};

export default TopRated;
