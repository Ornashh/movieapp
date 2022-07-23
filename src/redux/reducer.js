import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITE_LIST,
  OPEN_MEDIA_MODAL,
} from "./action";

const movieFromLocalStorage = JSON.parse(localStorage.getItem("movie") || "[]");

const initialState = {
  favoriteList: movieFromLocalStorage,
  isOpenMediaModal: false,
};

export const AppState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      const exist = state.favoriteList.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        state.favoriteList.map((item) =>
          item.id === action.payload.id ? { ...exist } : item
        );
      } else {
        state.favoriteList.push({
          ...action.payload,
        });
      }

      return {
        ...state,
        favoriteList: [...state.favoriteList],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteList: state.favoriteList.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case CLEAR_FAVORITE_LIST:
      return {
        ...state,
        favoriteList: [],
      };

    case OPEN_MEDIA_MODAL:
      return {
        ...state,
        isOpenMediaModal: action.payload,
      };

    default:
      return state;
  }
};
