import styled from "styled-components";

export const MediaOuter = styled.div`
  margin-top: 20px;
  padding: 0 20px 50px 110px;

  @media screen and (max-width: 1024px) {
    padding: 0 20px 50px 20px;
  }

  @media screen and (max-width: 425px) {
    padding: 0 0 50px 0;
  }
`;

export const MediaInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  justify-content: center;

  @media screen and (min-width: 660px) {
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  }

  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
`;

export const MediaItem = styled.div`
  border-radius: 5px;
  position: relative;
  transition: transform 0.3s ease-out;
  overflow: hidden;
  cursor: ${(props) => (props.pointer ? "pointer" : "")};

  &:hover {
    transform: scale(1.03);
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  span {
    height: 100%;
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 425px) {
    border-radius: 0;
  }
`;

export const InfoWrapper = styled.span`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-out;

  svg {
    font-size: 2rem;
    color: #1976d2;
    cursor: pointer;
  }
`;

export const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;

  h4 {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 3px;
  }

  p {
    font-size: 16px;
  }
`;
