import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from "./helpers/ScrollToTop";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Favorite from "./pages/Favorite";
import SingleMovie from "./pages/SingleMovie";
import Person from "./pages/Person";

function App() {
  return (
    <main>
      <Router>
        <Navbar/>
        <ScrollToTop/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/search">
            <Search/>
          </Route>
          <Route path="/popular">
            <Popular/>
          </Route>
          <Route path="/top_rated">
            <TopRated/>
          </Route>
          <Route path="/favorite">
            <Favorite/>
          </Route>
          <Route path="/movie/:id" children={<SingleMovie/>}/>
          <Route path="/person/:id" children={<Person/>}/>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
