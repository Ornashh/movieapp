import axios from "axios";
import { API_KEY, API_URL } from "@/utils/constants";

axios.defaults.baseURL = API_URL;

export const getNowPlaying = async (page: number) => {
  const response = await axios.get(
    `movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return response.data;
};

export const getPopular = async (page: number) => {
  const response = await axios.get(
    `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return response.data;
};

export const getTopRated = async (page: number) => {
  const response = await axios.get(
    `movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return response.data;
};

export const getGenre = async ({ id, page }: { id: number; page: number }) => {
  const response = await axios.get(
    `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}&page=${page}&sort_by=popularity.desc`
  );

  return response.data;
};

export const search = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
  );

  return response.data;
};
