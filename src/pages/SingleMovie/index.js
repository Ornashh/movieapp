import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import Details from "../../components/Details";
import Tabs from "../../components/Tabs";
import Recommended from "../../components/Recommended";
import { getMovie } from "../../api";
import { useSnackbar } from "notistack";

const SingleMovie = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    getMovie(id)
      .then((res) => {
        setDetails(res);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Layout title={details.title}>
      <Details id={id} details={details} loading={loading} />
      <Tabs id={id} />
      <Recommended id={id} />
    </Layout>
  );
};

export default SingleMovie;
