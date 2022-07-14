import instance, { API_KEY } from "../../axios";

export const getPersonMovie = (id) => {
  return instance(true)
    .get(`person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
