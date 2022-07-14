import React from "react";
import s from "./media.module.scss";

const Media = ({ children }) => {
  return (
    <div className={`${s.media_outer} fade_in`}>
      <div className={s.media_inner}>{children}</div>
    </div>
  );
};

export default Media;
