import React from 'react';
import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoadMoreWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const LoadMoreLoading = () => {
  return (
    <LoadMoreWrapper>
      <Loader type="Puff" color="#1976D2" height={50} width={50}/>
    </LoadMoreWrapper>
  );
};

export default LoadMoreLoading;