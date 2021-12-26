import React, { useState, useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  SEARCH_URL,
  NOW_PLAYING_URL,
  POPULAR_URL,
  TOP_RATED_URL,
} from "./helpers/Config";
import posterNotFound from "./assets/poster-not-found.jpg";
import backdropNotFound from "./assets/backdrop-not-found.jpg";

const movieFromLocalStorage = JSON.parse(localStorage.getItem("movie") || "[]");

const initialState = {
  resultsArr: [],
  nowPlayingArr: [],
  popularArr: [],
  topRatedArr: [],
  favoriteArr: movieFromLocalStorage,
  name: "",
  loading: true,
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(1);

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
    const getNowPlaying = async () => {
      try {
        dispatch({type: "LOADING"});
        const response = await fetch(NOW_PLAYING_URL);
        const data = await response.json();

        dispatch({
          type: "NOW_PLAYING",
          payload: data.results,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getNowPlaying();
  }, []);

  useEffect(() => {
    const getPopular = async (p) => {
      try {
        dispatch({type: "LOADING"});
        const response = await fetch(POPULAR_URL + p);
        const data = await response.json();

        dispatch({
          type: "POPULAR",
          payload: data.results,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPopular(page);
  }, [page]);

  useEffect(() => {
    const getTopRated = async (p) => {
      try {
        dispatch({type: "LOADING"});
        const response = await fetch(TOP_RATED_URL + p);
        const data = await response.json();

        dispatch({
          type: "TOP_RATED",
          payload: data.results,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTopRated(page);
  }, [page]);

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
        page,
        setPage,
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
