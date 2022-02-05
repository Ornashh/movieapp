import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../helpers/Config";
import styled from "styled-components";
import { Carousel, Title } from "./Slider";
import Slider from "./Slider";
import Loading from "./Loading";

const RecWrapper = styled.div`
  padding: 0 20px 0 110px;
`;

const Rec = ({id}) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
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
    <Loading loading={loading} style={{height: "50vh"}}>
      <RecWrapper>
        <Carousel className="fade_in">
          <Title>Recommended Movies</Title>
          {rec.length === 0 ? (
            ""
          ) : (
            <Slider data={rec} />
          )}
        </Carousel>
      </RecWrapper>
    </Loading>
  );
};

export default Rec;
