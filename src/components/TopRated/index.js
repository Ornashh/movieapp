import React, { useEffect, useState } from "react";
import Carousel from "../Carousel";
import Loading from "../Loading";
import { TOP_RATED_URL } from "../../utils/Config";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(TOP_RATED_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTopRated(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <Carousel title="Top Rated Movies" data={topRated} />
    </Loading>
  );
};

export default TopRated;
