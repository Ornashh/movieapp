import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

import { API_KEY, API_URL } from "../../helpers/Config";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Modal from "../Modal";
import Loading from "../Loading";

import css from "./photos.module.scss";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Photos = ({id}) => {
  const {backdrop_img, backdropNotFound} = useGlobalContext();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoPath, setPhotoPath] = useState("");

  const {photo, photo_inner, item} = css;

  const openModal = (photoPath) => {
    setModalIsOpen(true);
    setPhotoPath(photoPath);
  };

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`)
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

  const handleCloseModal = (e) => {
    if (e.target.id !== "img") {
      setModalIsOpen(false);
    }
  };

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className={`${photo} fade_in`}>
        <div className={photo_inner}>
          {photos?.map((photo) => {
            const {file_path} = photo;
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
            <Modal handleClickAway={handleCloseModal} handleClick={() => setModalIsOpen(false)}>
              <img src={backdrop_img + photoPath} alt="movie_photo" id="img"/>
            </Modal>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default Photos;
