import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { API_URL, API_KEY } from "../helpers/Config";

import Details from "../components/details/Details";
import Cast from "../components/cast/Cast";
import Videos from "../components/videos/Videos";
import Photos from "../components/photos/Photos";
import Rec from "../components/Rec";
import Tabs from "../components/Tabs";

const SingleTvShow = () => {
  const {id} = useParams();
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [rec, setRec] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const getDetails = async (movie_id) => {
      try {
        const resp = await fetch(
          `${API_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await resp.json();
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails(id);
  }, [id]);

  useEffect(() => {
    const getCredits = async (movie_id) => {
      try {
        const response = await fetch(
          `${API_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();

        setCredits(data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getCredits(id);
  }, [id]);

  useEffect(() => {
    const getVideos = async (movie_id) => {
      try {
        const response = await fetch(
          `${API_URL}movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();

        setVideos(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getVideos(id);
  }, [id]);

  useEffect(() => {
    const getPhotos = async (movie_id) => {
      try {
        const response = await fetch(
          `${API_URL}movie/${movie_id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
        );
        const data = await response.json();

        setPhotos(data.backdrops);
      } catch (error) {
        console.log(error);
      }
    };
    getPhotos(id);
  }, [id]);

  useEffect(() => {
    const getRec = async (movie_id) => {
      try {
        const response = await fetch(
          `${API_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        setRec(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getRec(id);
  }, [id]);

  return (
    <>
      <Details details={details}/>

      <Tabs index={index} setIndex={setIndex}/>

      {index === 1 ? (
        <Cast credits={credits}/>
      ) : index === 2 ? (
        <Videos videos={videos}/>
      ) : index === 3 ? (
        <Photos photos={photos}/>
      ) : (
        ""
      )}

      <Rec rec={rec}/>
    </>
  );
};

export default SingleTvShow;
