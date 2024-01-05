import { baseApi } from "../baseApi";
import { Details, Movies } from "@/types/movie";
import { PersonMovies } from "@/types/person";
import { Collections } from "@/types/collection";
import { API_KEY } from "@/utils/constants";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrending: builder.query<Movies, void>({
      query: () => ({
        url: `trending/movie/day?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),

    getPopular: builder.query<Movies, void>({
      query: () => ({
        url: `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        method: "GET",
      }),
    }),

    getDetails: builder.query<Details, number>({
      query: (id) => ({
        url: `movie/${id}?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),

    getPersonMovies: builder.query<PersonMovies, number>({
      query: (id) => ({
        url: `person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),

    getCollection: builder.query<Collections, number>({
      query: (id) => ({
        url: `collection/${id}?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetPopularQuery,
  useGetDetailsQuery,
  useGetPersonMoviesQuery,
  useGetCollectionQuery,
} = moviesApi;
