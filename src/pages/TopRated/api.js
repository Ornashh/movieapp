import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getTopRated = (page) => {
  return instance(true)
    .get(`movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
