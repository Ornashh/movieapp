import instance, { API_KEY } from "../../axios";

export const getPopular = (page) => {
  return instance(true)
    .get(`movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
