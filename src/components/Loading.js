import React from 'react';
import Loader from "react-loader-spinner";

function Loading({loading = true, show = true, children, style = {}}) {
  return (
    <>
      {loading ? (
        <div className="loading_wrapper">
          <Loader type="Puff" color="#1976D2" height={70} width={70} style={style}/>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default Loading;