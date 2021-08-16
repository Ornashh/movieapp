const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "39008b197a5755859d6786a809d485be";

const SEARCH_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=`;
const NOW_PLAYING_URL = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const POPULAR_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=`;
const TOP_RATED_URL = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;

export {
  API_URL,
  API_KEY,
  SEARCH_URL,
  NOW_PLAYING_URL,
  POPULAR_URL,
  TOP_RATED_URL,
};
