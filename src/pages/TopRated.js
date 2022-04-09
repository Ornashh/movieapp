import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { TOP_RATED_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../components/PageTitle";
import FavoriteIcon from "../components/FavoriteIcon";
import LoadMoreLoading from "../components/LoadMoreLoading";

import { CardsOuter, CardsInner, CardsTitle, Card } from "../components/styledComponents/Cards";

const TopRated = () => {
  const {poster_img, posterNotFound} = useGlobalContext();
  const [topRated, setTopRated] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isFetching, setFetching] = useState(true);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );

    if ((scrollHeight - currentHeight) <= 50) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetch(TOP_RATED_URL + page)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setTopRated((prevState) => {
            return [...prevState, ...data.results];
          });
          setTotalPage(data.total_pages);
          setPage(page => page + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [page, isFetching]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PageTitle title="Top Rated">
      <CardsOuter className="fade_in">
        <CardsTitle>Top Rated Movies</CardsTitle>
        <CardsInner>
          {topRated?.map((movie) => {
            const {id, title, poster_path} = movie;
            return (
              <Card key={id}>
                <Link to={`/movie/${id}`}>
                  <LazyLoadImage
                    wrapperClassName="lazyLoad"
                    src={
                      poster_path ? poster_img + poster_path : posterNotFound
                    }
                    alt={title}
                  />
                </Link>
                <FavoriteIcon element={movie}/>
              </Card>
            );
          })}
        </CardsInner>
        {isFetching || page === totalPage ? (
          <LoadMoreLoading/>
        ) : null}
      </CardsOuter>
    </PageTitle>
  );
};

export default TopRated;
