import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../utils/Config";
import styled from "styled-components";
import { Title } from "./Slider";
import Slider from "./Slider";
import { Loading } from "./Loading";

const RecOuter = styled.div`
  padding: 50px 0;

  @media screen and (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const RecInner = styled.div`
  padding-left: 20px;
`;

const Rec = ({ id }) => {
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
      {rec.length ? (
        <RecOuter>
          <RecInner className="fade_in">
            <Title>Recommended Movies</Title>
            <Slider data={rec} />
          </RecInner>
        </RecOuter>
      ) : null}
    </Loading>
  );
};

export default Rec;
