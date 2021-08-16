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
    case "NOW_PLAYING":
      return {
        ...state,
        nowPlayingArr: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
