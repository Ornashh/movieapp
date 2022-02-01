import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { SEARCH_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";

import { CardsOuter, CardsInner, CardsTitle, Card, FavButton, EmptyMessage } from "../components/styledComponents/Cards";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Search = () => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} = useGlobalContext();
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" ref={value} autoFocus/>
      </form>

      {name ? (
        <CardsOuter className="fade_in">
          <CardsTitle>Results: {name}</CardsTitle>
          <CardsInner>
            {results?.map((movie) => {
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
                    onClick={() => handleAdd(movie)}
                    className="fav_btn"
                  >
                    {favoriteArr.find((item) => item.id === movie.id) ? (
                      <AiFillHeart/>
                    ) : (
                      <AiOutlineHeart/>
                    )}
                  </FavButton>
                </Card>
              );
            })}
          </CardsInner>
        </CardsOuter>
      ) : (
        <EmptyMessage className="fade_in">No search results</EmptyMessage>
      )}
    </Loading>
  );
};

export default Search;
