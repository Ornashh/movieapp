import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import css from "./videos.module.scss";
import Loading from "../Loading";
import Modal from "../Modal";

const Videos = ({id}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [video_path, setVideoPath] = useState("");

  const {
    video,
    video_inner,
    item,
    desc,
    desc_name,
    desc_type,
  } = css;

  const openModal = (video_path) => {
    setModalIsOpen(true);
    setVideoPath(video_path);
  };

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json()
      }).then((data) => {
      setVideos(data.results);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    })
  }, [id]);

  const handleClickAway = (e) => {
    if (e.target.id !== "video") {
      setModalIsOpen(false)
    }
  }

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className={video}>
        <div className={`${video_inner} fade_in`}>
          {videos?.map((video) => {
            const {id, name, type, key} = video;
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
            <Modal handleClickAway={handleClickAway} handleClick={() => setModalIsOpen(false)}>
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${video_path}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen
                id="video"
              />
            </Modal>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default Videos;
