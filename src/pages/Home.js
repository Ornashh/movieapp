import React from "react";

import styled from "styled-components";

import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";
import PageTitle from "../components/PageTitle";
import { AiFillGithub } from "react-icons/ai";

const Content = styled.div`
  @media screen and (max-width: 1024px) {
    padding-bottom: 80px;
  }
`;

const Footer = styled.div`
  padding: 50px 20px 50px 110px;

  @media screen and (max-width: 1024px) {
    padding: 50px 20px;
  }

  p {
    font-size: 16px;
    font-weight: 600;
    color: #767676;
    margin-bottom: 20px;
  }

  a {
    font-size: 32px;
    color: #767676;
  }
`;

const Home = () => {
  return (
    <PageTitle title="Home">
      <Content>
        <NowPlaying />
        <Popular />
        <TopRated />

        <Footer>
          <p>Build on React • 2021</p>
          <a href="https://github.com/ornashh">
            <AiFillGithub />
          </a>
        </Footer>
      </Content>
    </PageTitle>
  );
};

export default Home;
