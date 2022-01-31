import styled from "styled-components";

export const MediaOuter = styled.div`
  padding: 0 20px 50px 110px;

  @media screen and (max-width: 1024px) {
    padding: 0 20px 50px 20px;
  }
`;

export const MediaInner = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 330px);
  gap: 20px;
  justify-content: center;
`;

export const MediaItem = styled.div`
  border-radius: 5px;
  position: relative;
  width: 330px;
  height: 200px;
  transition: transform 0.3s ease-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
  
  &:hover span {
    opacity: 1;
    visibility: visible;
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
`;

export const PlayIcon = styled.span`
  font-size: 2rem;
  color: #1976d2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-out;
`;