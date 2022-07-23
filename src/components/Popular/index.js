import React, { useEffect, useState } from "react";

import Carousel from "../Carousel";
import Loading from "../Loading";
import { getPopular } from "../../api";
import { useSnackbar } from "notistack";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    getPopular()
      .then((res) => {
        setPopular(res.results);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} isHalf>
      <div className="mt-5">
        <Carousel title="Popular Movies" data={popular} />
      </div>
    </Loading>
  );
};

export default Popular;
