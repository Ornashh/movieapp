import styled from "styled-components";

export const CardsOuter = styled.div`
  padding: 50px 20px 20px 110px;

  @media screen and (max-width: 1024px) {
    padding: 50px 20px 100px 20px;
  }
`;

export const CardsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  justify-content: flex-start;
  gap: 20px;

  @media screen and (min-width: 660px) {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(18%, 1fr));
  }

  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  }
`;

export const CardsTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  text-align: ${(props) => (props.center ? "center" : "")};
  margin-bottom: 30px;

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
`;

export const Card = styled.div`
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease !important;

  &:hover {
    transform: scale(1.03);
  }

  &:hover .fav_btn {
    opacity: 1;
    visibility: visible;
  }

  img {
    box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.4);
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const EmptyMessage = styled.div`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  padding: 20px 20px 20px 110px;

  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
`;
