import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { SEARCH_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";
import FavoriteIcon from "../components/FavoriteIcon";

import styled from "styled-components";
import {
  CardsOuter,
  CardsInner,
  CardsTitle,
  Card,
  EmptyMessage
} from "../components/styledComponents/Cards";

const Form = styled.form`
  padding: 20px 20px 0 110px;

  input {
    outline: none;
    border: none;
    color: #000;
    font-size: 1.3rem;
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
`;

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
    <PageTitle title="Search">
      <Loading loading={loading}>
        <Form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search" ref={value} autoFocus/>
        </Form>

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
                    <FavoriteIcon element={movie} />
                  </Card>
                );
              })}
            </CardsInner>
          </CardsOuter>
        ) : (
          <EmptyMessage className="fade_in">No search results</EmptyMessage>
        )}
      </Loading>
    </PageTitle>
  );
};

export default Search;
