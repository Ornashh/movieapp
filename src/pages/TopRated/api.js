import instance, { API_KEY } from "../../axios";

export const getTopRated = (page) => {
  return instance(true)
    .get(`movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
