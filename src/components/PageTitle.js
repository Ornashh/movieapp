import React from "react";

const PageTitle = ({ children, title }) => {
  document.title = `MovieApp | ${title}`;
  return <>{children}</>;
};

export default PageTitle;