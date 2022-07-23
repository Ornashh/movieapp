import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PersonInfo from "../../components/PersonInfo";
import PersonMovie from "../../components/PersonMovie";
import Layout from "../../components/Layout";
import { getPerson } from "../../api";
import { useSnackbar } from "notistack";

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    getPerson(id)
      .then((res) => {
        setPerson(res);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Layout title={person.name}>
      <PersonInfo person={person} loading={loading} />
      <PersonMovie />
    </Layout>
  );
};

export default Person;
