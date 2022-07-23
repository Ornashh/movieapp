import React from "react";
import s from "./layout.module.scss";

const Layout = ({ children, title }) => {
  document.title = `MovieApp | ${title ? title : "Loading"}`;
  return <div className={s.layout}>{children}</div>;
};

export default Layout;
