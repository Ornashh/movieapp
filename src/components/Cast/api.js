import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getCast = (id) => {
  return instance(true)
    .get(`movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
