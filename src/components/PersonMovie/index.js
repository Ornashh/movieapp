import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "../Loading";
import Carousel from "../Carousel";
import { getPersonMovie } from "../../api";

const PersonMovie = () => {
  const { id } = useParams();
  const [personMovie, setPersonMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPersonMovie(id)
      .then((res) => {
        setPersonMovie(res.cast);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} isHalf>
      <div className="mt-5 mb-5">
        <Carousel title="Movies" data={personMovie} />
      </div>
    </Loading>
  );
};

export default PersonMovie;
