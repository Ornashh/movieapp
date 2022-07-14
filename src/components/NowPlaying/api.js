import instance, { API_KEY } from "../../axios";

export const getNowPlaying = () => {
  return instance(true)
    .get(`movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res?.data;
    });
};
