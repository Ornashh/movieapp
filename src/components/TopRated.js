import React, { useEffect, useState } from "react";

import { TOP_RATED_URL } from "../helpers/Config";
import { Carousel, Title } from "./Slider";
import Slider from "./Slider";
import Loading from "./Loading";

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
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className="fade_in" style={{ marginBottom: 35 }}>
        <Carousel>
          <Title>Top Rated Movies</Title>
          <Slider data={topRated} />
        </Carousel>
      </div>
    </Loading>
  );
};

export default TopRated;
