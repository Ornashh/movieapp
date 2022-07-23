import React from "react";

import Layout from "../../components/Layout";
import NowPlaying from "../../components/NowPlaying";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <Layout title="Home">
      <NowPlaying />
      <Popular />
      <TopRated />
      <Footer />
    </Layout>
  );
};

export default Home;
