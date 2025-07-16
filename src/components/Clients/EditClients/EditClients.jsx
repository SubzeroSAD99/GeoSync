import React, { useEffect, useState } from "react";
import { Title } from "./EditClients.styled.mjs";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../../utils/api.mjs";
import FormClients from "./../FormClients/FormClients";

const EditClients = ({ id }) => {
  const [infoClient, setInfoClient] = useState({});
  const { setEmployee } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/client/getOne", { id });

        if (response.data) {
          setInfoClient(response.data);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status === 401) setEmployee(null);

        toast.error(msg);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/client/edit", { id, ...values });

      if (response.data) {
        toast.success(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (err.status === 401) setEmployee(null);

      if (msg) toast.error(msg);
    }
  };

  return (
    <section>
      <Title>Editar Cliente</Title>

      <FormClients
        {...infoClient}
        handleSubmit={handleSubmit}
        textBtnSubmit={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditClients;
