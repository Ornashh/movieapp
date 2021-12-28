import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { API_KEY, API_URL } from "../helpers/Config";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "./Loading";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Rec = ({id}) => {
  const {poster_img, posterNotFound, handleAdd, favoriteArr} =
    useGlobalContext();
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
      .then((resp) => {
        return resp.json()
      }).then((data) => {
      setRec(data.results);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    })
  }, [id]);

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <div className="rec fade_in">
        <div className="main_title">Recommended Movies</div>
        {rec.length === 0 ? (
          ""
        ) : (
          <div className="rec_inner">
            <Swiper
              className="mySwiper"
              navigation={true}
              freeMode={true}
              spaceBetween={10}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
            >
              {rec?.map((movie) => {
                const {id, poster_path, title} = movie;
                return (
                  <div key={id}>
                    <SwiperSlide key={id}>
                      <div className="item">
                        <Link to={`/movie/${id}`}>
                          <LazyLoadImage
                            wrapperClassName="lazyLoad"
                            src={
                              poster_path
                                ? poster_img + poster_path
                                : posterNotFound
                            }
                            alt={title}
                          />
                        </Link>
                        <button
                          onClick={() => handleAdd(movie)}
                          className="btn_fav"
                        >
                          {favoriteArr.find(
                            (item) => item.id === movie.id
                          ) ? (
                            <AiFillHeart/>
                          ) : (
                            <AiOutlineHeart/>
                          )}
                        </button>
                      </div>
                    </SwiperSlide>
                  </div>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default Rec;
