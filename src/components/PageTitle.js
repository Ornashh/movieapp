import React from "react";

const PageTitle = ({ children, title }) => {
  document.title = `MovieApp | ${title ? title : "Loading"}`;
  return <>{children}</>;
};

export default PageTitle;