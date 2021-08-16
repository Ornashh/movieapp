import React, { useState } from "react";
import { useGlobalContext } from "../../context";

import css from "./photos.module.scss";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const { photo, photo_inner, item, modal, modal_inner, modal_close } = css;

const Photos = ({ photos }) => {
  const { backdrop_img, backdropNotFound } = useGlobalContext();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoPath, setPhotoPath] = useState("");

  const openModal = (photoPath) => {
    setModalIsOpen(true);
    setPhotoPath(photoPath);
  };

  return (
    <div className={`${photo} fade_in`}>
      <div className={photo_inner}>
        {photos &&
          photos.map((photo) => {
            const { file_path } = photo;
            return (
              <div key={uuidv4()} className={item}>
                <LazyLoadImage
                  wrapperClassName="lazyLoad"
                  src={file_path ? backdrop_img + file_path : backdropNotFound}
                  alt="movie_photo"
                  onClick={() => openModal(file_path)}
                />
              </div>
            );
          })}
        {modalIsOpen && (
          <div className={modal}>
            <div className={modal_inner}>
              <button
                className={modal_close}
                onClick={() => setModalIsOpen(false)}
              ></button>
              <img src={backdrop_img + photoPath} alt="movie_photo" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
