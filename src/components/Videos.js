import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  MediaOuter,
  MediaInner,
  MediaItem,
  InfoWrapper,
  Info,
} from "./styledComponents/Media";
import { Loading } from "./Loading";
import Modal from "./Modal";

import { FaPlay } from "react-icons/fa";

const Videos = ({ id }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [video_path, setVideoPath] = useState("");

  const openModal = (video_path) => {
    setModalIsOpen(true);
    setVideoPath(video_path);
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
    fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setVideos(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleClickAway = (e) => {
    if (e.target.id !== "video") {
      setModalIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <MediaOuter>
        <MediaInner>
          {videos?.map((el) => {
            const { id, key, name, type } = el;
            return (
              <MediaItem key={id}>
                <LazyLoadImage
                  src={`https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`}
                  alt={name}
                  effect="blur"
                />
                <InfoWrapper>
                  <FaPlay onClick={() => openModal(key)} />
                  <Info>
                    <h4>{name}</h4>
                    <p>{type}</p>
                  </Info>
                </InfoWrapper>
              </MediaItem>
            );
          })}
          {modalIsOpen && (
            <Modal
              handleClickAway={handleClickAway}
              handleClose={handleCloseModal}
            >
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${video_path}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen
                id="video"
              />
            </Modal>
          )}
        </MediaInner>
      </MediaOuter>
    </Loading>
  );
};

export default Videos;
