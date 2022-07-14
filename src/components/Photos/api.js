import instance from "../../axios";
import { API_KEY } from "../../utils/constants";

export const getPhotos = (id) => {
  return instance(true)
    .get(
      `movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
    )
    .then((res) => {
      return res?.data;
    });
};
