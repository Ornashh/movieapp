export const ADD_FAVORITE = "addFavorite";
export const REMOVE_FAVORITE = "removeFavorite";
export const CLEAR_FAVORITE_LIST = "clearFavoriteList";
export const OPEN_MEDIA_MODAL = "openMediaModal";

export const addFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload,
  };
};

export const removeFavorite = (payload) => {
  return {
    type: REMOVE_FAVORITE,
    payload,
  };
};

export const clearFavoriteList = () => {
  return {
    type: CLEAR_FAVORITE_LIST,
  };
};

export const openMediaModal = (payload) => {
  return {
    type: OPEN_MEDIA_MODAL,
    payload,
  };
};
