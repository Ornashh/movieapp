import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Details from "../components/details/Details";
import Tabs from "../components/Tabs";
import Cast from "../components/cast/Cast";
import Videos from "../components/Videos";
import Photos from "../components/Photos";
import Rec from "../components/Rec";

const SingleTvShow = () => {
  const {id} = useParams();
  const [index, setIndex] = useState(1);

  return (
    <>
      <Details id={id}/>

      <Tabs index={index} setIndex={setIndex}/>

      {index === 1 ? (
        <Cast id={id}/>
      ) : index === 2 ? (
        <Videos id={id}/>
      ) : index === 3 ? (
        <Photos id={id}/>
      ) : (
        ""
      )}

      <Rec id={id}/>
    </>
  );
};

export default SingleTvShow;
