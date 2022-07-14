import instance, { API_KEY } from "../../axios";

export const getPhotos = (id) => {
  return instance(true)
    .get(
      `movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
    )
    .then((res) => {
      return res?.data;
    });
};
