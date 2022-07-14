import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "../Media/media.module.scss";
import { FaPlay } from "react-icons/fa";

import Loading from "../Loading";
import Modal from "../Modal";
import Media from "../Media";
import { openMediaModal } from "../../store/action";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getVideos } from "./api";

const Videos = ({ id }) => {
  const dispatch = useDispatch();
  const { isOpenMediaModal } = useSelector((state) => state);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video_path, setVideoPath] = useState("");

  const handleClick = (video_path) => {
    dispatch(openMediaModal(true));
    setVideoPath(video_path);
  };

  useEffect(() => {
    setLoading(true);
    getVideos(id)
      .then((res) => {
        setVideos(res.results);
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
        {videos?.map((el) => {
          const { id, key, name, type } = el;
          return (
            <div
              key={id}
              className={s.media_item}
              style={{ cursor: "default" }}
            >
              <LazyLoadImage
                src={`https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`}
                alt={name}
                effect="blur"
              />
              <span className={s.video_info_outer}>
                <FaPlay onClick={() => handleClick(key)} />
                <div className={s.video_info_inner}>
                  <h4>{name}</h4>
                  <p>{type}</p>
                </div>
              </span>
            </div>
          );
        })}
        {isOpenMediaModal && (
          <Modal>
            <iframe
              title="frame"
              src={`https://www.youtube.com/embed/${video_path}?autoplay=1&mute=1`}
              frameBorder="0"
              allowFullScreen
              id="video"
            />
          </Modal>
        )}
      </Media>
    </Loading>
  );
};

export default Videos;
