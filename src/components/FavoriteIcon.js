import React from 'react';

import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useGlobalContext } from "../context";

export const FavButton = styled.div`
  font-size: 2rem;
  color: #1976d2;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    opacity: 1;
    visibility: visible;
  }
`;

export default function FavoriteIcon({element}) {
  const {handleAdd, favoriteArr} = useGlobalContext();

  return (
    <FavButton
      onClick={() => handleAdd(element)}
      className="fav_btn"
    >
      {favoriteArr.find((item) => item.id === element.id) ? (
        <AiFillHeart/>
      ) : (
        <AiOutlineHeart/>
      )}
    </FavButton>
  );
}