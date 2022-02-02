import React, { useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";
import posterNotFound from "./assets/poster-not-found.jpg";
import backdropNotFound from "./assets/backdrop-not-found.jpg";

const movieFromLocalStorage = JSON.parse(localStorage.getItem("movie") || "[]");

const initialState = {
  favoriteArr: movieFromLocalStorage,
};

const backdrop_img = "https://image.tmdb.org/t/p/w1280";
const poster_img = "https://image.tmdb.org/t/p/w780";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(state.favoriteArr));
  }, [state.favoriteArr]);

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
