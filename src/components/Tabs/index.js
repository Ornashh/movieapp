import React, { useState } from "react";

import s from "./tabs.module.scss";

import Cast from "../Cast";
import Videos from "../Videos/Videos";
import Photos from "../Photos/Photos";

const TabNavItem = ({ title, tab, tabName, setTabName }) => {
  const handleClick = () => {
    setTabName(tab);
  };

  return (
    <button
      className={tabName === tab ? `${s.tab} ${s.active_tab}` : `${s.tab}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

const TabContent = ({ tab, tabName, children }) => {
  return tabName === tab ? <>{children}</> : null;
};

const Tabs = ({ id }) => {
  const [tabName, setTabName] = useState("Cast");
  return (
    <>
      <div className={s.tab_nav}>
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
      </div>

      <TabContent tab="Cast" tabName={tabName}>
        <Cast id={id} />
      </TabContent>
      <TabContent tab="Videos" tabName={tabName}>
        <Videos id={id} />
      </TabContent>
      <TabContent tab="Photos" tabName={tabName}>
        <Photos id={id} />
      </TabContent>
    </>
  );
};

export default Tabs;
