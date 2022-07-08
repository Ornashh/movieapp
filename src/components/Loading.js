import React from "react";
import styled from "styled-components";

const CustomLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CustomLoader = styled.div`
  width: 70px;
  height: 70px;
  border-right: 4px solid #1976d2;
  border-radius: 100%;
  animation: spinRight 800ms linear infinite;

  &:before,
  &:after {
    content: "";
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    border-left: 3px solid #1976d2;
    border-radius: 100%;
    animation: spinLeft 800ms linear infinite;
  }

  &:after {
    width: 40px;
    height: 40px;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    border: 0;
    border-right: 2px solid #1976d2;
    animation: none;
  }

  @keyframes spinLeft {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(720deg);
    }
  }

  @keyframes spinRight {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

export const Loading = ({ loading = true, children, style = {} }) => {
  return (
    <>
      {loading ? (
        <CustomLoaderWrapper style={style}>
          <CustomLoader />
        </CustomLoaderWrapper>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export const LoadMore = ({ style = {} }) => {
  return (
    <CustomLoaderWrapper style={style}>
      <CustomLoader />
    </CustomLoaderWrapper>
  );
};
