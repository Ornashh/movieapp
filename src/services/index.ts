import { Movies } from "@/types/movie";
import { API_KEY } from "@/utils/constants";

export const getPopular = async (page: number): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return await response.json();
};

export const getTopRated = async (page: number): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return await response.json();
};

export const getGenre = async ({
  id,
  page,
}: {
  id: number;
  page: number;
}): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}&page=${page}&sort_by=popularity.desc`
  );

  return await response.json();
};

export const search = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
  );

  return await response.json();
};
