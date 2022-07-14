import React from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./favbtn.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../../store/action";

const FavButton = ({ element }) => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state);

  const handleToggleFavorite = () => {
    if (favoriteList.find((item) => item.id === element.id)) {
      dispatch(removeFavorite(element));
    } else {
      dispatch(addFavorite(element));
    }
  };

  return (
    <div onClick={handleToggleFavorite} className={s.icon}>
      {favoriteList.find((item) => item.id === element.id) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      )}
    </div>
  );
};

export default FavButton;
