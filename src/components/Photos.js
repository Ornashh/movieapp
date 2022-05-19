import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

import { API_KEY, API_URL } from "../helpers/Config";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { MediaInner, MediaItem, MediaOuter } from "./styledComponents/Media";
import Modal from "./Modal";
import Loading from "./Loading";

import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

const Photos = ({ id }) => {
  const { backdrop_img, backdropNotFound } = useGlobalContext();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoPath, setPhotoPath] = useState("");

  const openModal = (photoPath) => {
    setModalIsOpen(true);
    setPhotoPath(photoPath);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "unset";
    }
  }, [modalIsOpen]);

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

  const handleClickAway = (e) => {
    if (e.target.id !== "img") {
      setModalIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <MediaOuter className="fade_in">
        <MediaInner>
          {photos?.map((photo) => {
            const { file_path } = photo;
            return (
              <MediaItem key={uuidv4()} pointer>
                <LazyLoadImage
                  wrapperClassName="lazyLoad"
                  src={file_path ? backdrop_img + file_path : backdropNotFound}
                  alt="movie_photo"
                  effect="blur"
                  onClick={() => openModal(file_path)}
                />
              </MediaItem>
            );
          })}
          {modalIsOpen && (
            <Modal
              handleClickAway={handleClickAway}
              handleClick={handleCloseModal}
            >
              <img src={backdrop_img + photoPath} alt="movie_photo" id="img" />
            </Modal>
          )}
        </MediaInner>
      </MediaOuter>
    </Loading>
  );
};

export default Photos;
