import React from 'react';
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ModalOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  img {
    border-radius: 5px;
    max-width: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
`;

const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 60%;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ModalCloseButton = styled.button`
  color: #fff;
  width: 50px;
  height: 50px;
  margin: 10px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

function Modal({handleClickAway, handleClick, children}) {
  return (
    <ModalOuter onClick={handleClickAway}>
      <ModalCloseButton
        onClick={handleClick}
      >
        <FaTimes size={"3em"}/>
      </ModalCloseButton>
      <ModalInner className="modal_inner" id="video">
        {children}
      </ModalInner>
    </ModalOuter>
  );
}

export default Modal;