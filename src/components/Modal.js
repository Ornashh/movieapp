import React from 'react';
import { FaTimes } from "react-icons/fa";

function Modal({handleClickAway, handleClick, children}) {
  return (
    <div className="modal" onClick={handleClickAway}>
      <button
        className="modal_close"
        onClick={handleClick}
      >
        <FaTimes size={"3em"}/>
      </button>
      <div className="modal_inner" id="video">
        {children}
      </div>
    </div>
  );
}

export default Modal;