import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "../Media/media.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { backdropImageUrl } from "../../utils/Config";
import Loading from "../Loading";
import Media from "../Media";
import Modal from "../Modal";
import { openMediaModal } from "../../store/action";
import { getPhotos } from "./api";

import SwiperCore, { Navigation } from "swiper/core";
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
    getPhotos(id)
      .then((res) => {
        setPhotos(res.backdrops);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} isHalf>
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
