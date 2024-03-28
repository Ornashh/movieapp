import { baseApi } from "../baseApi";
import { Images, Reviews, Videos } from "@/types/media";
import { API_KEY } from "@/utils/constants";

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query<Images, number>({
      query: (id) => ({
        url: `movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`,
        method: "GET",
      }),
    }),

    getVideos: builder.query<Videos, number>({
      query: (id) => ({
        url: `movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),

    getReviews: builder.query<Reviews, number>({
      query: (id) => ({
        url: `movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetImagesQuery, useGetVideosQuery, useGetReviewsQuery } =
  mediaApi;
