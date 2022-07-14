import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const search = (name) => {
  return instance(true)
    .get(`search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${name}`)
    .then((res) => {
      return res?.data;
    });
};
