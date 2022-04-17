import React from 'react';
import styled from "styled-components";

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  
  button {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    background-color: #1976d2;
    border-radius: 5px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #165ea5;
    }
  }
`;

export default function Button({children, handleClick}) {
  return (
    <ButtonWrapper>
      <button onClick={handleClick}>{children}</button>
    </ButtonWrapper>
  );
}