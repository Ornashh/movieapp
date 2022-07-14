import instance, { API_KEY } from "../../axios";

export const getRecommended = (id) => {
  return instance(true)
    .get(`movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res?.data;
    });
};
