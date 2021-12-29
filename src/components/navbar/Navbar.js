import React from "react";
import { Link, useLocation } from "react-router-dom";

import css from "./navbar.module.scss";
import {
  AiOutlineFire,
  AiOutlineStar,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();
  const {nav, nav_link} = css;

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
    <nav className={nav}>
      <Link to={"/"} className={nav_link} title="Home">
        <AiOutlineHome color={location.pathname === "/" ? "#1976d2" : "#fff"}/>
      </Link>
      <Link to={"/search"} className={nav_link} title="Search">
        <AiOutlineSearch color={activeLink("search")}/>
      </Link>
      <Link to={"/popular"} className={nav_link} title="Popular">
        <AiOutlineFire color={activeLink("popular")}/>
      </Link>
      <Link to={"/top_rated"} className={nav_link} title="Top rated">
        <AiOutlineStar color={activeLink("top_rated")}/>
      </Link>
      <Link to={"/favorite"} className={nav_link} title="Favorite">
        <AiOutlineHeart color={activeLink("favorite")}/>
      </Link>
    </nav>
  );
};

export default Navbar;
