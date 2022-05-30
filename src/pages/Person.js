import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL } from "../utils/Config";
import Loading from "../components/Loading";
import PersonMovie from "../components/PersonMovie";
import PageTitle from "../components/PageTitle";

import styled from "styled-components";

const PersonOuter = styled.div`
  padding: 20px 20px 20px 110px;

  @media screen and (max-width: 1024px) {
    padding: 20px 20px 100px;
  }
`;
const PersonInner = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const PersonImage = styled.div`
  border-radius: 5px;
  width: 300px;
  height: 450px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const PersonInfo = styled.div`
  padding: 10px 20px;

  div {
    margin-top: 10px;
  }

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

const PersonBiography = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const ReadMore = styled.button`
  font-size: 14px;
  color: #1976d2;
  padding: 3px 0;
`;

function Person() {
  const { id } = useParams();
  const { poster_img } = useGlobalContext();
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
      <Loading loading={loading}>
        <PersonOuter>
          <PersonInner>
            <PersonImage>
              <img src={poster_img + profile_path} alt="#" />
            </PersonImage>
            <PersonInfo>
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
                    <PersonBiography>
                      {readMore
                        ? biography
                        : `${biography?.substring(0, 400)}...`}
                    </PersonBiography>
                    <ReadMore onClick={() => setReadMore(!readMore)}>
                      {readMore ? "Read Less" : "Read More"}
                    </ReadMore>
                  </>
                )}
              </div>
            </PersonInfo>
          </PersonInner>
          <PersonMovie />
        </PersonOuter>
      </Loading>
    </PageTitle>
  );
}

export default Person;
