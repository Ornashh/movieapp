import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { useSelector } from "react-redux";

const App = () => {
  const { isOpenMediaModal, favoriteList } = useSelector((state) => state);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(favoriteList));
  }, [favoriteList]);

  useEffect(() => {
    if (isOpenMediaModal) {
      document.querySelector("body").classList.add("disable_scroll");
    } else {
      document.querySelector("body").classList.remove("disable_scroll");
    }
  }, [isOpenMediaModal]);

  return (
    <main>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes />
      </Router>
    </main>
  );
};

export default App;
