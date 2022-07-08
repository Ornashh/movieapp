export const addFavorite = (payload) => {
  return {
    type: "ADD_FAVORITE",
    payload,
  };
};

export const removeFavorite = (payload) => {
  return {
    type: "REMOVE_FAVORITE",
    payload,
  };
};

export const clearFavoriteList = () => {
  return {
    type: "CLEAR",
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      const exist = state.favoriteArr.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        state.favoriteArr.map((item) =>
          item.id === action.payload.id ? { ...exist } : item
        );
      } else {
        state.favoriteArr.push({
          ...action.payload,
        });
      }

      return {
        ...state,
        favoriteArr: [...state.favoriteArr],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favoriteArr: state.favoriteArr.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case "CLEAR":
      return {
        ...state,
        favoriteArr: [],
      };

    default:
      return state;
  }
};

export default reducer;
