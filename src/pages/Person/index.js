import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import s from "./person.module.scss";
import { API_KEY, API_URL, posterImageUrl } from "../../utils/Config";
import Loading from "../../components/Loading";
import PersonMovie from "../../components/PersonMovie";
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const { profile_path, name, birthday, deathday, place_of_birth, biography } =
    person;

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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <PageTitle title={name}>
      <Layout>
        <Loading loading={loading}>
          <div className={s.person_outer}>
            <div className={s.person_inner}>
              <div className={s.image}>
                <img src={posterImageUrl + profile_path} alt={name} />
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
                    <>
                      <div className={s.bio}>
                        {readMore
                          ? biography
                          : `${biography?.substring(0, 400)}...`}
                      </div>
                      <button
                        className={s.read_more}
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Read Less" : "Read More"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Loading>
        <PersonMovie />
      </Layout>
    </PageTitle>
  );
};

export default Person;
