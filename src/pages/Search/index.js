import React, { useEffect, useRef, useState } from "react";

import s from "./search.module.scss";
import Loading from "../../components/Loading";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import { search } from "../../api";
import { useSnackbar } from "notistack";

const Search = () => {
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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
          enqueueSnackbar(error.message, { variant: "error" });
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
    <Layout title="Search">
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
  );
};

export default Search;
