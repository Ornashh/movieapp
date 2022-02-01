import React from 'react';
import Loader from "react-loader-spinner";

import styled from "styled-components";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding-left: 110px;

    @media screen and (max-width: 1024px) {
      padding: 0;
    }
  }
`;

function Loading({loading = true, children, style = {}}) {
  return (
    <>
      {loading ? (
        <LoadingWrapper>
          <Loader type="Puff" color="#1976D2" height={70} width={70} style={style}/>
        </LoadingWrapper>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default Loading;