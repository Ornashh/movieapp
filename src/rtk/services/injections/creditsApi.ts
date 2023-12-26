import { baseApi } from "../baseApi";
import { Credits } from "@/types/credits";
import { API_KEY } from "@/utils/constants";

export const creditsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCredits: builder.query<Credits, number>({
      query: (id) => ({
        url: `movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCreditsQuery } = creditsApi;
