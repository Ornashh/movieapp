import React, { useState } from "react";
import styled from "styled-components";
import Cast from "./Cast";
import Videos from "./Videos";
import Photos from "./Photos";

const TabNav = styled.div`
  display: flex;
`;

const Tab = styled.button`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: #70757a;
  background-color: #1f1f1f;
  border-right: 1px solid #0e0e0e;
  width: 100%;
  padding: 15px 0;
  transition: all 0.3s ease;

  &:hover {
    color: #1976d2;
    background-color: #0e0e0e;
  }

  &:last-child {
    border: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const TabNavItem = ({ title, tab, tabName, setTabName }) => {
  const handleClick = () => {
    setTabName(tab);
  };

  return (
    <Tab className={tabName === tab ? "active-tab" : ""} onClick={handleClick}>
      {title}
    </Tab>
  );
};

const TabContent = ({ tab, tabName, children }) => {
  return tabName === tab ? <>{children}</> : null;
};

const Tabs = ({ id }) => {
  const [tabName, setTabName] = useState("Cast");

  return (
    <div>
      <TabNav>
        <TabNavItem
          title="Cast"
          tab="Cast"
          tabName={tabName}
          setTabName={setTabName}
        />
        <TabNavItem
          title="Videos"
          tab="Videos"
          tabName={tabName}
          setTabName={setTabName}
        />
        <TabNavItem
          title="Photos"
          tab="Photos"
          tabName={tabName}
          setTabName={setTabName}
        />
      </TabNav>

      <TabContent tab="Cast" tabName={tabName}>
        <Cast id={id} />
      </TabContent>
      <TabContent tab="Videos" tabName={tabName}>
        <Videos id={id} />
      </TabContent>
      <TabContent tab="Photos" tabName={tabName}>
        <Photos id={id} />
      </TabContent>
    </div>
  );
};

export default Tabs;
