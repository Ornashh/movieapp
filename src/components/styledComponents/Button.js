import styled from "styled-components";

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background-color: #1976d2;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #165ea5;
  }
`;