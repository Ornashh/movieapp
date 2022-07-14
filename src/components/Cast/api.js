import instance, { API_KEY } from "../../axios";

export const getCast = (id) => {
  return instance(true)
    .get(`movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
