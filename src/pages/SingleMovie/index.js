import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL } from "../../utils/Config";
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import Details from "../../components/Details";
import Tabs from "../../components/Tabs";
import Recommended from "../../components/Recommended";

const SingleMovie = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <PageTitle title={details.title}>
      <Layout>
        <Details id={id} details={details} loading={loading} />
        <Tabs id={id} />
        <Recommended id={id} />
      </Layout>
    </PageTitle>
  );
};

export default SingleMovie;
