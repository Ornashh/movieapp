import { baseApi } from "../baseApi";
import { Person } from "@/types/person";
import { API_KEY } from "@/utils/constants";

export const personApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPerson: builder.query<Person, number>({
      query: (id) => ({
        url: `person/${id}?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPersonQuery } = personApi;
