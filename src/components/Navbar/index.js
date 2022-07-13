import React from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./navbar.module.scss";
import {
  AiOutlineFire,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

  const activeLink = (link) => {
    switch (location.pathname) {
      case `/${link}`: {
        return "#1976d2";
      }
      default:
        return "#fff";
    }
  };

  return (
    <div className={s.navbar}>
      <Link to={"/"} title="Home" className={s.link}>
        <AiOutlineHome color={location.pathname === "/" ? "#1976d2" : "#fff"} />
      </Link>
      <Link to={"/search"} title="Search" className={s.link}>
        <AiOutlineSearch color={activeLink("search")} />
      </Link>
      <Link to={"/popular"} title="Index" className={s.link}>
        <AiOutlineFire color={activeLink("popular")} />
      </Link>
      <Link to={"/top_rated"} title="Top rated" className={s.link}>
        <AiOutlineStar color={activeLink("top_rated")} />
      </Link>
      <Link to={"/favorite"} title="Index" className={s.link}>
        <AiOutlineHeart color={activeLink("favorite")} />
      </Link>
    </div>
  );
};

export default Navbar;
