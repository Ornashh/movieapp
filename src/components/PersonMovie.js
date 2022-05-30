import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Title } from "./Slider";

import { API_KEY, API_URL } from "../utils/Config";
import Loading from "./Loading";
import Slider from "./Slider";

function PersonMovie() {
  const { id } = useParams();
  const [personMovie, setPersonMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${API_URL}person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPersonMovie(data.cast);
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
      <div className="fade_in">
        <Title>Movies</Title>
        <Slider data={personMovie} />
      </div>
    </Loading>
  );
}

export default PersonMovie;
