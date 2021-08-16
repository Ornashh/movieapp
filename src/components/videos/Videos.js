import React, { useState } from "react";

import css from "./videos.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const {
  video,
  video_inner,
  item,
  desc,
  desc_name,
  desc_type,
  modal,
  modal_inner,
  modal_close,
} = css;

const Videos = ({ videos }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [video_path, setVideoPath] = useState("");

  const openModal = (video_path) => {
    setModalIsOpen(true);
    setVideoPath(video_path);
  };

  return (
    <div className={video}>
      <div className={`${video_inner} fade_in`}>
        {videos &&
          videos.map((video) => {
            const { id, name, type, key } = video;
            return (
              <div key={id} className={item}>
                <LazyLoadImage
                  wrapperClassName="lazyLoad"
                  src={`https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`}
                  alt="video"
                  onClick={() => openModal(key)}
                />
                <div className={desc}>
                  <div className={desc_name}>{name}</div>
                  <div className={desc_type}>{type}</div>
                </div>
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
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${video_path}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
