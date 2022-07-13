import React, { useEffect, useRef, useState } from "react";

import s from "./search.module.scss";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import { SEARCH_URL } from "../../utils/Config";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";

const Search = () => {
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (name) {
      fetch(`${SEARCH_URL}page=1&query=${name}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setResults((prevState) => {
            return [...prevState, ...data.results];
          });
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
    setResults([]);
  };

  return (
    <PageTitle title="Search">
      <Layout>
        <form onSubmit={handleSubmit} className={s.form}>
          <input type="text" placeholder="Search" ref={value} />
        </form>

        {name ? (
          <Loading loading={loading}>
            <Cards title={`Results: ${name}`} data={results} loadMore={false} />
          </Loading>
        ) : (
          <div className={s.empty_message}>No search results</div>
        )}
      </Layout>
    </PageTitle>
  );
};

export default Search;
