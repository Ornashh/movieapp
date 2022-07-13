import React, { useEffect, useState } from "react";

import { backdropImageUrl } from "../../utils/Config";

import s from "../Media/media.module.scss";
import { API_KEY, API_URL } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Loading from "../Loading";

import SwiperCore, { Navigation } from "swiper/core";
import Media from "../Media";
import { useDispatch, useSelector } from "react-redux";
import { openMediaModal } from "../../store/action";
import Modal from "../Modal";
SwiperCore.use([Navigation]);

const Photos = ({ id }) => {
  const dispatch = useDispatch();
  const { backdropNotFoundImage, isOpenMediaModal } = useSelector(
    (state) => state
  );
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoPath, setPhotoPath] = useState("");

  const handleClick = (photoPath) => {
    dispatch(openMediaModal(true));
    setPhotoPath(photoPath);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPhotos(data.backdrops);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <Media>
        {photos?.map((el, i) => {
          const { file_path } = el;
          return (
            <div key={i} className={s.media_item}>
              <LazyLoadImage
                src={
                  file_path
                    ? backdropImageUrl + file_path
                    : backdropNotFoundImage
                }
                alt="movie_photo"
                effect="blur"
                onClick={() => handleClick(file_path)}
              />
            </div>
          );
        })}
        {isOpenMediaModal && (
          <Modal>
            <img
              src={backdropImageUrl + photoPath}
              alt="movie_photo"
              id="img"
            />
          </Modal>
        )}
      </Media>
    </Loading>
  );
};

export default Photos;
