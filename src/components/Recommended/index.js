import React, { useEffect, useState } from "react";

import Carousel from "../Carousel";
import Loading from "../Loading";
import { getRecommended } from "./api";
import { useSnackbar } from "notistack";

const Recommended = ({ id }) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    getRecommended(id)
      .then((res) => {
        setRec(res.results);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} isHalf>
      <div className="mt-10 mb-10">
        {rec.length ? <Carousel title="Recommended Movies" data={rec} /> : null}
      </div>
    </Loading>
  );
};

export default Recommended;
