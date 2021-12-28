import React, { useState, useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";
import { SEARCH_URL } from "./helpers/Config";
import posterNotFound from "./assets/poster-not-found.jpg";
import backdropNotFound from "./assets/backdrop-not-found.jpg";

const movieFromLocalStorage = JSON.parse(localStorage.getItem("movie") || "[]");

const initialState = {
  resultsArr: [],
  favoriteArr: movieFromLocalStorage,
  name: "",
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const backdrop_img = "https://image.tmdb.org/t/p/w1280";
  const poster_img = "https://image.tmdb.org/t/p/w780";

  useEffect(() => {
    const getResults = async (query) => {
      try {
        const response = await fetch(SEARCH_URL + query);
        const data = await response.json();

        dispatch({type: "RESULTS", payload: data.results});
      } catch (error) {
        console.log(error);
      }
    };
    if (state.name) {
      getResults(state.name);
    }
  }, [state.name]);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(state.favoriteArr));
  }, [state.favoriteArr]);

  const search = (movie) => {
    dispatch({type: "SEARCH", payload: movie});
  };

  const handleAdd = (movie) => {
    dispatch({type: "ADD_FAVORITE", payload: movie});
  };

  const handleRemove = (movie) => {
    dispatch({type: "REMOVE_FAVORITE", payload: movie});
  };

  const handleClear = () => {
    dispatch({type: "CLEAR"});
  };

  return (
    <AppContext.Provider
      value={{
        state,
        ...state,
        poster_img,
        backdrop_img,
        posterNotFound,
        backdropNotFound,
        search,
        handleAdd,
        handleRemove,
        handleClear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
