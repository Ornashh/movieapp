import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./cards.module.scss";
import { posterImageUrl } from "../../utils/Config";
import FavButton from "../FavButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cards = ({
  title,
  data,
  isFetching,
  page,
  totalPage,
  loadMore = true,
}) => {
  const { posterNotFoundImage } = useSelector((state) => state);

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
                          ? posterImageUrl + el.poster_path
                          : posterNotFoundImage
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
