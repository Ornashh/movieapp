import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Favorite from "./pages/Favorite";
import SingleMovie from "./pages/SingleMovie";
import Person from "./pages/Person";
import ScrollToTop from "./utils/scrollToTop";

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
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/popular">
            <Popular />
          </Route>
          <Route path="/top_rated">
            <TopRated />
          </Route>
          <Route path="/favorite">
            <Favorite />
          </Route>
          <Route path="/movie/:id" children={<SingleMovie />} />
          <Route path="/person/:id" children={<Person />} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
