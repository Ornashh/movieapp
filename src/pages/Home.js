import React from "react";

import NowPlaying from "../components/nowplaying/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import PageTitle from "../components/PageTitle";

const Home = () => {
  return (
    <PageTitle title="Home">
      <div className="content">
        <NowPlaying/>
        <Popular/>
        <TopRated/>
      </div>
    </PageTitle>
  );
};

export default Home;
