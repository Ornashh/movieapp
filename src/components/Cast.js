import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

import { API_KEY, API_URL } from "../helpers/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "./Loading";

import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

const CastWrapper = styled.div`
  margin: 20px 0 50px 0;
  padding: 0 20px 0 110px;

  @media screen and (max-width: 1024px) {
    padding: 0 20px 0 20px;
  }
`;

const Card = styled.div`
  border-radius: 5px;
  position: relative;
  width: inherit;
  height: 320px;
  overflow: hidden;

  a {
    display: block;
    width: 100%;
    height: 100%;
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

  @media screen and (max-width: 768px) {
    height: 250px;
  }
`;

const CardDesc = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 10px 0 3px 0;

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  p {
    color: #70757a;
    font-weight: 500;

    @media screen and (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

const Cast = ({id}) => {
  const {poster_img, posterNotFound} = useGlobalContext();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCredits(data.cast);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} style={{height: "50vh"}}>
      <CastWrapper className="fade_in">
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
          {credits?.map((cast) => {
            const {id, profile_path, name, character} = cast;
            return (
              <SwiperSlide key={id}>
                <Card>
                  <Link to={`/person/${id}`}>
                    <LazyLoadImage
                      wrapperClassName="lazyLoad"
                      src={
                        profile_path
                          ? poster_img + profile_path
                          : posterNotFound
                      }
                      alt={name}
                    />
                  </Link>
                </Card>
                <CardDesc>
                  <h3>{name}</h3>
                  <p>{character}</p>
                </CardDesc>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CastWrapper>
    </Loading>
  );
};

export default Cast;
