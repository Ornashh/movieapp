import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../components/PageTitle";

import { CardsOuter, CardsInner, CardsTitle, Card } from "../components/styledComponents/Cards";
import Button from "../components/Button"
import { FavButton } from "../components/FavoriteIcon";
import { AiFillHeart } from "react-icons/ai";

const Favorite = () => {
  let {favoriteArr, poster_img, posterNotFound, handleRemove, handleClear} =
    useGlobalContext();

  return (
    <PageTitle title={"Favorite"}>
      <CardsOuter className="fade_in">
        {favoriteArr?.length === 0 ? (
          <CardsTitle center>Favorite list is empty</CardsTitle>
        ) : (
          <>
            <CardsTitle>Favorite Movies</CardsTitle>
            <CardsInner>
              {favoriteArr?.map((movie) => {
                const {id, title, poster_path} = movie;
                return (
                  <Card key={id}>
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
                    <FavButton
                      onClick={() => handleRemove(movie)}
                      className="fav_btn"
                    >
                      <AiFillHeart/>
                    </FavButton>
                  </Card>
                );
              })}
            </CardsInner>
            <Button handleClick={handleClear}>Clear all</Button>
          </>
        )}
      </CardsOuter>
    </PageTitle>
  );
};

export default Favorite;
