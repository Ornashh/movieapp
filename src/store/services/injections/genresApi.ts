import { baseApi } from "../baseApi";
import { Genres } from "@/types/genres";
import { API_KEY } from "@/utils/constants";

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<Genres, void>({
      query: () => ({
        url: `genre/movie/list?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
