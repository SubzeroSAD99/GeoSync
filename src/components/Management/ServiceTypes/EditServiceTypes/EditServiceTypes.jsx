import React, { useEffect, useState } from "react";
import { Title } from "./EditServiceTypes.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import FormServiceTypes from "../FormServiceTypes/FormServiceTypes";

const EditServiceTypes = ({ id }) => {
  const [infoServiceType, setInfoServiceType] = useState({});
  const [allValues, setAllValues] = useState([]);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/serviceType/getOne", { id });

        if (response.data) {
          setAllValues(response.data?.values);
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

    try {
      const response = await api.post("/serviceType/edit", {
        id,
        name,
        values: allValues,
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
        allValues={allValues}
        setAllValues={setAllValues}
        handleSubmit={handleSubmit}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditServiceTypes;
