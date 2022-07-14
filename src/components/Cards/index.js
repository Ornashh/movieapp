import React from "react";
import { Link } from "react-router-dom";

import s from "./cards.module.scss";
import FavButton from "../FavButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { POSTER_URL, POSTER_NOT_FOUND } from "../../utils/constants";

const Cards = ({
  title,
  data,
  isFetching,
  page,
  totalPage,
  loadMore = true,
}) => {
  return (
    <div className={s.cards_outer}>
      <div className={s.cards_title}>{title}</div>
      <div className={s.cards_inner}>
        {data?.map((el) => {
          return (
            <div key={el.id} className={s.card}>
              <Link to={`/movie/${el.id}`}>
                <figure>
                  <picture>
                    <LazyLoadImage
                      effect="blur"
                      src={
                        el.poster_path
                          ? POSTER_URL + el.poster_path
                          : POSTER_NOT_FOUND
                      }
                      alt={title}
                    />
                  </picture>
                </figure>
              </Link>
              <FavButton element={el} />
            </div>
          );
        })}
      </div>
      {loadMore && (isFetching || page === totalPage) ? (
        <div className={s.loading}>Loading...</div>
      ) : null}
    </div>
  );
};

export default Cards;
