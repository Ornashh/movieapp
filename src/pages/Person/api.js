import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getPerson = (id) => {
  return instance(true)
    .get(`person/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
