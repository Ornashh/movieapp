import React from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import {
  AiOutlineFire,
  AiOutlineStar,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";

const Nav = styled.nav`
  background-color: #000;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  width: 90px;
  height: 100%;
  padding: 15px;
  z-index: 10;

  @media screen and (max-width: 1024px) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 80px;
  }
`;

const NavLink = styled(Link)`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  
  svg {
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    color: #1976d2 !important;
  }
`

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
    <Nav>
      <NavLink to={"/"} title="Home">
        <AiOutlineHome color={location.pathname === "/" ? "#1976d2" : "#fff"}/>
      </NavLink>
      <NavLink to={"/search"} title="Search">
        <AiOutlineSearch color={activeLink("search")}/>
      </NavLink>
      <NavLink to={"/popular"} title="Popular">
        <AiOutlineFire color={activeLink("popular")}/>
      </NavLink>
      <NavLink to={"/top_rated"} title="Top rated">
        <AiOutlineStar color={activeLink("top_rated")}/>
      </NavLink>
      <NavLink to={"/favorite"} title="Favorite">
        <AiOutlineHeart color={activeLink("favorite")}/>
      </NavLink>
    </Nav>
  );
};

export default Navbar;
