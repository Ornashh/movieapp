import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { POPULAR_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button"
import FavoriteIcon from "../components/FavoriteIcon";

import { CardsOuter, CardsInner, CardsTitle, Card } from "../components/styledComponents/Cards";

const Popular = () => {
  const {poster_img, posterNotFound} = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(POPULAR_URL + page).then((resp) => {
      return resp.json();
    })
      .then((data) => {
        setPopular([...popular, ...data.results]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <PageTitle title="Popular">
      <Loading loading={loading}>
        <CardsOuter className="fade_in">
          <CardsTitle>Popular Movies</CardsTitle>
          <CardsInner>
            {popular?.map((movie) => {
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
          <Button handleClick={() => setPage(page + 1)}>Load More</Button>
        </CardsOuter>
      </Loading>
    </PageTitle>
  );
};

export default Popular;
