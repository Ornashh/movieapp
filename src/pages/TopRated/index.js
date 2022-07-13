import React, { useEffect, useState } from "react";

import { TOP_RATED_URL } from "../../utils/Config";
import PageTitle from "../../components/PageTitle";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";

const Index = () => {
  const [topRated, setTopRated] = useState([]);
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
      fetch(TOP_RATED_URL + page)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setTopRated((prevState) => {
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
    <PageTitle title="Top Rated">
      <Layout>
        <Cards
          title="Top Rated Movies"
          data={topRated}
          isFetching={isFetching}
          page={page}
          totalPage={totalPage}
        />
      </Layout>
    </PageTitle>
  );
};

export default Index;
