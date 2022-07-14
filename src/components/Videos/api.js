import instance, { API_KEY } from "../../axios";

export const getVideos = (id) => {
  return instance(true)
    .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
