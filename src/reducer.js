const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SEARCH":
      return { ...state, name: action.payload };
    case "RESULTS":
      return {
        ...state,
        resultsArr: action.payload,
      };
    case "NOW_PLAYING":
      return {
        ...state,
        nowPlayingArr: action.payload,
        loading: false,
      };
    case "POPULAR":
      return {
        ...state,
        popularArr: [...state.popularArr, ...action.payload],
        loading: false,
      };
    case "TOP_RATED":
      return {
        ...state,
        topRatedArr: [...state.topRatedArr, ...action.payload],
        loading: false,
      };
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

    default:
      return state;
  }
};

export default reducer;
