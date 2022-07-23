import instance from "../axios";
import { API_KEY } from "../utils/constants";

export const getCast = (id) => {
  return instance(true)
    .get(`movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};

export const getNowPlaying = () => {
  return instance(true)
    .get(`movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res?.data;
    });
};

export const getPersonMovie = (id) => {
  return instance(true)
    .get(`person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};

export const getPhotos = (id) => {
  return instance(true)
    .get(
      `movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getVideos = (id) => {
  return instance(true)
    .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};

export const getPopular = (page) => {
  return instance(true)
    .get(
      `movie/popular?api_key=${API_KEY}&language=en-US&page=${page ? page : 1}`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getTopRated = (page) => {
  return instance(true)
    .get(
      `movie/top_rated?api_key=${API_KEY}&language=en-US&page=${
        page ? page : 1
      }`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getRecommended = (id) => {
  return instance(true)
    .get(`movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res?.data;
    });
};

export const getPerson = (id) => {
  return instance(true)
    .get(`person/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};

export const search = (name) => {
  return instance(true)
    .get(`search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${name}`)
    .then((res) => {
      return res?.data;
    });
};

export const getMovie = (id) => {
  return instance(true)
    .get(`movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res?.data;
    });
};
