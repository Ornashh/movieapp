import React from "react";

import NowPlaying from "../components/nowplaying/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";

const Home = () => {
  return (
    <div className="content">
      <NowPlaying/>
      <Popular/>
      <TopRated/>
    </div>
  );
};

export default Home;
