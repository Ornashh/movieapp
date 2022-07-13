import React, { useEffect, useState } from "react";

import Carousel from "../Carousel";
import Loading from "../Loading";
import { POPULAR_URL } from "../../utils/Config";

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
    <Loading loading={loading} style={{ height: "50vh" }}>
      <Carousel title="Popular Movies" data={popular} />
    </Loading>
  );
};

export default Popular;
