import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getPopular = (page) => {
  return instance(true)
    .get(`movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
