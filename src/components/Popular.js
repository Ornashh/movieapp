import React, { useEffect, useState } from "react";

import { POPULAR_URL } from "../helpers/Config";
import { SliderOuter, Title } from "./Slider";
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
      <SliderOuter>
        <div className="fade_in">
          <Title>Popular Movies</Title>
          <Slider data={popular}/>
        </div>
      </SliderOuter>
    </Loading>
  );
};

export default Popular;
