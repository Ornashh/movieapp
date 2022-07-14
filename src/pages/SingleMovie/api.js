import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getMovie = (id) => {
  return instance(true)
    .get(`movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
