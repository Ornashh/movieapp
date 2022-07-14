import React, { useEffect, useState } from "react";

import Carousel from "../Carousel";
import Loading from "../Loading";
import { getTopRated } from "./api";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTopRated()
      .then((res) => {
        setTopRated(res.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} isHalf>
      <div className="mt-5">
        <Carousel title="Top Rated Movies" data={topRated} />
      </div>
    </Loading>
  );
};

export default TopRated;
