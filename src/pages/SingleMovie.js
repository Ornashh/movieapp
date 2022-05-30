import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Details from "../components/Details";
import Tabs from "../components/Tabs";
import Rec from "../components/Rec";
import PageTitle from "../components/PageTitle";
import { API_KEY, API_URL } from "../utils/Config";

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
      <Details id={id} details={details} loading={loading} />
      <Tabs id={id} />
      <Rec id={id} />
    </PageTitle>
  );
};

export default SingleMovie;
