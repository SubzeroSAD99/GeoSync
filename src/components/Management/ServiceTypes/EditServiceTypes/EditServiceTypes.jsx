import React, { useEffect, useState } from "react";
import { Title } from "./EditServiceTypes.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import FormServiceTypes from "../FormServiceTypes/FormServiceTypes";

const EditServiceTypes = ({ id }) => {
  const [infoServiceType, setInfoServiceType] = useState({});
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/serviceType/getOne", { id });

        if (response.data) {
          setInfoServiceType(response.data);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status === 401) setUserLogged(null);

        toast.error(msg);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name");
    const values = form.getAll("values");

    try {
      const response = await api.post("/serviceType/edit", {
        id,
        name,
        values,
      });

      if (response.data) {
        toast.success(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (err.status === 401) setUserLogged(null);

      if (msg) toast.error(msg);
    }
  };

  return (
    <section>
      <Title>Editar Tipos de Serviços</Title>

      <FormServiceTypes
        {...infoServiceType}
        handleSubmit={handleSubmit}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditServiceTypes;
