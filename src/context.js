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

  const handleToggleFavorite = (movie) => {
    if (state.favoriteArr.find((item) => item.id === movie.id)) {
      dispatch({type: "REMOVE_FAVORITE", payload: movie})
    } else {
      dispatch({type: "ADD_FAVORITE", payload: movie})
    }
  };

  const handleRemoveFavorite = (movie) => {
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
        handleToggleFavorite,
        handleRemoveFavorite,
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
