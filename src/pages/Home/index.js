import React from "react";

import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import NowPlaying from "../../components/NowPlaying";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <PageTitle title="Home">
      <Layout>
        <NowPlaying />
        <Popular />
        <TopRated />
        <Footer />
      </Layout>
    </PageTitle>
  );
};

export default Home;
