import React, { useState } from "react";

import s from "./person.module.scss";
import Loading from "../Loading";
import { POSTER_NOT_FOUND, POSTER_URL } from "../../utils/constants";

const PersonInfo = ({ person, loading }) => {
  const [readMore, setReadMore] = useState(false);

  const { profile_path, name, birthday, deathday, place_of_birth, biography } =
    person;

  let poster;
  profile_path
    ? (poster = POSTER_URL + profile_path)
    : (poster = POSTER_NOT_FOUND);

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Loading loading={loading} isHalf>
      <div className={s.person}>
        <div className={s.image}>
          <img src={poster} alt={name} />
        </div>
        <div className={s.info}>
          <h1>{name}</h1>
          <div>
            {dateFormat(birthday)} &#8212;
            {deathday === null ? "" : dateFormat(deathday)}
          </div>
          <div>{place_of_birth}</div>
          <div>
            {biography?.length <= 400 ? (
              biography
            ) : (
              <div className={s.bio}>
                {readMore ? biography : `${biography?.substring(0, 400)}...`}
                <button
                  className={s.read_more}
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default PersonInfo;
