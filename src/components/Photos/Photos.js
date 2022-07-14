import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "../Media/media.module.scss";
import Loading from "../Loading";
import Media from "../Media";
import Modal from "../Modal";
import { openMediaModal } from "../../store/action";
import { getPhotos } from "./api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BACKDROP_URL, BACKDROP_NOT_FOUND } from "../../utils/constants";
import { useSnackbar } from "notistack";

import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

const Photos = ({ id }) => {
  const dispatch = useDispatch();
  const { isOpenMediaModal } = useSelector((state) => state);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoPath, setPhotoPath] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar(error.message, { variant: "error" });
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
                src={file_path ? BACKDROP_URL + file_path : BACKDROP_NOT_FOUND}
                alt="movie_photo"
                effect="blur"
                onClick={() => handleClick(file_path)}
              />
            </div>
          );
        })}
        {isOpenMediaModal && (
          <Modal>
            <img src={BACKDROP_URL + photoPath} alt="movie_photo" id="img" />
          </Modal>
        )}
      </Media>
    </Loading>
  );
};

export default Photos;
