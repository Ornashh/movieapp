import React from "react";
import s from "./loading.module.scss";

const Loading = ({ loading = true, children, style = {} }) => {
  return (
    <>
      {loading ? (
        <div className={s.loader_wrapper} style={style}>
          <div className={s.loader} />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Loading;
