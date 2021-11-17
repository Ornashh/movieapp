import React from "react";
import { useGlobalContext } from "../context";

import NowPlaying from "../components/nowplaying/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";

import Loader from "react-loader-spinner";

const Home = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <Loader type="Puff" color="#1976D2" height={70} width={70} />
      </div>
    );
  }

  return (
    <>
      <NowPlaying />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
