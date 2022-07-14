import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getPopular = () => {
  return instance(true)
    .get(`movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res?.data;
    });
};
