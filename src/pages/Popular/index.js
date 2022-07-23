import React, { useState, useEffect } from "react";

import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import { getPopular } from "../../api";
import { useSnackbar } from "notistack";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isFetching, setFetching] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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
          enqueueSnackbar(error.message, { variant: "error" });
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
    <Layout title="Popular">
      <Cards
        title="Popular Movies"
        data={popular}
        isFetching={isFetching}
        page={page}
        totalPage={totalPage}
      />
    </Layout>
  );
};

export default Popular;
