import React from "react";

import styled from "styled-components";

import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import PageTitle from "../components/PageTitle";

const Content = styled.div`
  padding: 40px 20px 20px 110px;
  
  @media screen and (max-width: 1024px) {
    padding: 40px 20px 100px 20px;
  }
`;

const Home = () => {
  return (
    <PageTitle title="Home">
      <Content>
        <NowPlaying/>
        <Popular/>
        <TopRated/>
      </Content>
    </PageTitle>
  );
};

export default Home;
