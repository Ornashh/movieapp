import React, { useEffect, useRef, useState } from "react";

import s from "./search.module.scss";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import { search } from "./api";

const Search = () => {
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (name) {
      search(name)
        .then((res) => {
          setResults((prevState) => {
            return [...prevState, ...res.results];
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
          <div className="empty_message fade_in ">No search results</div>
        )}
      </Layout>
    </PageTitle>
  );
};

export default Search;
