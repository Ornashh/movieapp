import React from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./favbtn.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../../store/action";

const FavButton = ({ element }) => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state);

  const handleToggleFavorite = (movie) => {
    if (favoriteList.find((item) => item.id === movie.id)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div onClick={() => handleToggleFavorite(element)} className={s.icon}>
      {favoriteList.find((item) => item.id === element.id) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      )}
    </div>
  );
};

export default FavButton;
