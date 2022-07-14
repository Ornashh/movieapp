import React, { useState, useEffect } from "react";

import PageTitle from "../../components/PageTitle";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import { getPopular } from "./api";

const Popular = () => {
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
      getPopular(page)
        .then((res) => {
          setPopular((prevState) => {
            return [...prevState, ...res.results];
          });
          setTotalPage(res.total_pages);
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
      <Layout>
        <Cards
          title="Popular Movies"
          data={popular}
          isFetching={isFetching}
          page={page}
          totalPage={totalPage}
        />
      </Layout>
    </PageTitle>
  );
};

export default Popular;
