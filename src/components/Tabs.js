import React from "react";
import styled from "styled-components";

const TabPanel = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 90px;

  @media screen and (max-width: 1024px) {
    padding-left: 0;
  }
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

function Tabs({ index, setIndex }) {
  return (
    <TabPanel>
      <Tab
        className={index === 1 ? "active-tab" : ""}
        onClick={() => setIndex(1)}
      >
        Cast
      </Tab>
      <Tab
        className={index === 2 ? "active-tab" : ""}
        onClick={() => setIndex(2)}
      >
        Videos
      </Tab>
      <Tab
        className={index === 3 ? "active-tab" : ""}
        onClick={() => setIndex(3)}
      >
        Photos
      </Tab>
    </TabPanel>
  );
}

export default Tabs;
