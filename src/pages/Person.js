import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL } from "../helpers/Config";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import css from "./pages.module.scss"
import Loading from "../components/Loading";

function Person() {
  const {id} = useParams();
  const [loading, setLoading] = useState(true)
  const {poster_img, posterNotFound} = useGlobalContext();
  const [person, setPerson] = useState({});
  const [readMore, setReadMore] = useState(false);

  const {
    person_outer,
    person_inner,
    person_img,
    person_info,
    person_name,
    person_date,
    person_place,
    person_biography,
    read_more,
    btn_readMore,
  } = css;

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography
  } = person

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  useEffect(() => {
    const getPerson = async (person_id) => {
      try {
        setLoading(true);
        const resp = await fetch(
          `${API_URL}person/${person_id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await resp.json();
        setPerson(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPerson(id);
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
              <p className={readMore ? `${read_more} ${person_biography}` : `${person_biography}`}>
                {biography}
              </p>
              <button onClick={() => setReadMore(!readMore)} className={btn_readMore}>
                {readMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Person;