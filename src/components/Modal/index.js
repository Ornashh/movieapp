import React from "react";
import { useDispatch } from "react-redux";

import s from "./modal.module.scss";
import { FaTimes } from "react-icons/fa";
import { openMediaModal } from "../../redux/action";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const handleClickAway = (e) => {
    if (e.target.id !== "video" && e.target.id !== "img") {
      dispatch(openMediaModal(false));
    }
  };

  const handleClose = () => {
    dispatch(openMediaModal(false));
  };

  return (
    <div onClick={handleClickAway} className={s.modal_outer}>
      <button onClick={handleClose} className={s.modal_btn}>
        <FaTimes size={"3em"} />
      </button>
      <div className={s.modal_inner}>{children}</div>
    </div>
  );
};

export default Modal;
