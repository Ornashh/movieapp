import React from "react";
import { Link } from "react-router-dom";

import css from "./navbar.module.scss";
import {
  AiOutlineFire,
  AiOutlineStar,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";

const { nav, nav_link } = css;

const Navbar = () => {
  return (
    <nav className={nav}>
      <Link to={"/"} className={nav_link} title="Home">
        <AiOutlineHome />
      </Link>
      <Link to={"/search"} className={nav_link} title="Search">
        <AiOutlineSearch />
      </Link>
      <Link to={"/popular"} className={nav_link} title="Popular">
        <AiOutlineFire />
      </Link>
      <Link to={"/top_rated"} className={nav_link} title="Top rated">
        <AiOutlineStar />
      </Link>
      <Link to={"/favorite"} className={nav_link} title="Favorite">
        <AiOutlineHeart />
      </Link>
    </nav>
  );
};

export default Navbar;
