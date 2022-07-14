import React from "react";
import s from "./loading.module.scss";

const Loading = ({ loading = true, children, isHalf = false }) => {
  return (
    <>
      {loading ? (
        <div className={`${s.loader_wrapper} ${isHalf ? s.halfHeight : ""}`}>
          <div className={s.loader} />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Loading;
