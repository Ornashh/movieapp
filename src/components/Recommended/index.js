import React, { useEffect, useState } from "react";

import s from "./recommended.module.scss";
import Carousel from "../Carousel";
import Loading from "../Loading";
import { API_KEY, API_URL } from "../../utils/Config";

const Recommended = ({ id }) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setRec(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <div className={s.recommended_wrapper}>
        {rec.length ? <Carousel title="Recommended Movies" data={rec} /> : null}
      </div>
    </Loading>
  );
};

export default Recommended;
