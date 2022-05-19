import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import styled from "styled-components";
import FavoriteIcon from "./FavoriteIcon";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

export const SliderOuter = styled.div`
  margin-bottom: 35px;
  padding-left: 110px;

  @media screen and (max-width: 1024px) {
    padding: 0 10px;
  }
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const SliderCard = styled.div`
  border-radius: 4px;
  position: relative;
  width: inherit;
  height: 350px;
  overflow: hidden;

  &:hover .fav_btn {
    opacity: 1;
    visibility: visible;
  }

  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }

  &:hover a {
    transform: scale(1.05);
  }

  span {
    width: 100%;
    height: 100%;
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.2s linear;
  }

  @media screen and (max-width: 768px) {
    height: 170px;
  }
`;

function Slider({ data }) {
  const { poster_img, posterNotFound } = useGlobalContext();

  return (
    <Swiper
      className="mySwiper"
      navigation={true}
      freeMode={true}
      slidesPerView={3}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1440: {
          slidesPerView: 6,
        },
        1700: {
          slidesPerView: 7,
        },
      }}
    >
      {data?.map((movie) => {
        const { id, title, poster_path } = movie;
        return (
          <SwiperSlide key={id}>
            <SliderCard>
              <Link to={`/movie/${id}`}>
                <LazyLoadImage
                  effect="blur"
                  src={poster_path ? poster_img + poster_path : posterNotFound}
                  alt={title}
                />
              </Link>
              <FavoriteIcon element={movie} />
            </SliderCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
