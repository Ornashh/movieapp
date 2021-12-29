import React, { useState, useEffect } from 'react';
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL } from "../helpers/Config";
import Loading from "../components/Loading";
import PersonMovie from "../components/PersonMovie";
import PersonShow from "../components/PersonShow";

import css from "./pages.module.scss";

function Person() {
  const {id} = useParams();
  const {poster_img} = useGlobalContext();
  const [person, setPerson] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    person_outer,
    person_inner,
    person_img,
    person_info,
    person_name,
    person_date,
    person_place,
    person_biography,
    btn_readMore,
  } = css;

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography
  } = person;

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetch(`${API_URL}person/${id}?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPerson(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading}>
      <div className={person_outer}>
        <div className={person_inner}>
          <div className={person_img}>
            <img src={poster_img + profile_path} alt="#"/>
          </div>
          <div className={person_info}>
            <h1 className={person_name}>{name}</h1>
            <div className={person_date}>
              {dateFormat(birthday)} &#8212; {deathday === null ? "" : dateFormat(deathday)}
            </div>
            <div className={person_place}>
              {place_of_birth}
            </div>
            <div>
              {biography?.length <= 300 ? biography : (
                <>
                  <p className={person_biography}>
                    {readMore ? biography : `${biography?.substring(0, 300)}...`}
                  </p>
                  <button className={btn_readMore} onClick={() => setReadMore(!readMore)}>
                    {readMore ? "Read Less" : "Read More"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <PersonMovie/>
        <PersonShow/>
      </div>
    </Loading>
  );
}

export default Person;