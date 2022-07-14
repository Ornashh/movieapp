import instance, { API_KEY } from "../../axios";

export const getPerson = (id) => {
  return instance(true)
    .get(`person/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
