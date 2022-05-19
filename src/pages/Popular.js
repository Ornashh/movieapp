import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { POPULAR_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../components/PageTitle";
import FavoriteIcon from "../components/FavoriteIcon";
import LoadMoreLoading from "../components/LoadMoreLoading";

import {
  CardsOuter,
  CardsInner,
  CardsTitle,
  Card,
} from "../components/styledComponents/Cards";

const Popular = () => {
  const { poster_img, posterNotFound } = useGlobalContext();
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isFetching, setFetching] = useState(true);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 500) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetch(POPULAR_URL + page)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setPopular((prevState) => {
            return [...prevState, ...data.results];
          });
          setTotalPage(data.total_pages);
          setPage((page) => page + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PageTitle title="Popular">
      <CardsOuter className="fade_in">
        <CardsTitle>Popular Movies</CardsTitle>
        <CardsInner>
          {popular?.map((movie) => {
            const { id, title, poster_path } = movie;
            return (
              <Card key={id}>
                <Link to={`/movie/${id}`}>
                  <LazyLoadImage
                    effect="blur"
                    src={
                      poster_path ? poster_img + poster_path : posterNotFound
                    }
                    alt={title}
                  />
                </Link>
                <FavoriteIcon element={movie} />
              </Card>
            );
          })}
        </CardsInner>
        {isFetching || page === totalPage ? <LoadMoreLoading /> : null}
      </CardsOuter>
    </PageTitle>
  );
};

export default Popular;
