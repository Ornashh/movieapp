import React from 'react';
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import styled from "styled-components";
import FavoriteIcon from "./FavoriteIcon";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

export const Carousel = styled.div`
  //margin-bottom: 35px;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const CarouselCard = styled.div`
  border-radius: 5px;
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
    transition: transform 0.3s ease-out;
  }

  &:hover img {
    transform: scale(1.05);
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;


function Slider({data}) {
  const {poster_img, posterNotFound} = useGlobalContext();

  return (
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
          slidesPerView: 5,
        },
        1440: {
          slidesPerView: 6
        },
        1700: {
          slidesPerView: 7
        }
      }}
    >
      {data?.map((movie) => {
        const {id, title, poster_path} = movie;
        return (
          <SwiperSlide key={id}>
            <CarouselCard>
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
              <FavoriteIcon element={movie} />
            </CarouselCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;