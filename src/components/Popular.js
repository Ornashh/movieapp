import React, { useEffect, useState } from "react";

import { POPULAR_URL } from "../helpers/Config";
import { Carousel, Title } from "./Slider";
import Slider from "./Slider";
import Loading from "./Loading";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(POPULAR_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPopular(data.results);
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
      <div style={{marginBottom: 35}}>
        <Carousel className="fade_in">
          <Title>Popular Movies</Title>
          <Slider data={popular}/>
        </Carousel>
      </div>
    </Loading>
  );
};

export default Popular;
