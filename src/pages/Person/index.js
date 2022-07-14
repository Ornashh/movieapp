import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PersonInfo from "../../components/PersonInfo";
import PersonMovie from "../../components/PersonMovie";
import PageTitle from "../../components/PageTitle";
import Layout from "../../components/Layout";
import { getPerson } from "./api";

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPerson(id)
      .then((res) => {
        setPerson(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <PageTitle title={person.name}>
      <Layout>
        <PersonInfo person={person} loading={loading} />
        <PersonMovie />
      </Layout>
    </PageTitle>
  );
};

export default Person;
