import React from "react";
import s from "./footer.module.scss";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={s.footer}>
      <p className={s.footer_text}>Build on React • 2021</p>
      <a href="https://github.com/ornashh" className={s.footer_link}>
        <AiFillGithub />
      </a>
    </div>
  );
};

export default Footer;
