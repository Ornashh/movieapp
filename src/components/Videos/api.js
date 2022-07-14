import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getVideos = (id) => {
  return instance(true)
    .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
