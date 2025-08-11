import React, { useState } from "react";
import { Title } from "./RegisterServiceTypes.styled.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";
import FormServiceTypes from "../FormServiceTypes/FormServiceTypes.jsx";

const RegisterServiceTypes = () => {
  const { setUserLogged } = useAuth();
  const [allValues, setAllValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name");

    try {
      const response = await api.post("/serviceType/register", {
        name,
        values: allValues,
      });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.warn(msg);

      if (err.status == 401) return setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Tipos de Serviços</Title>
      <FormServiceTypes
        handleSubmit={handleSubmit}
        options={[]}
        allValues={allValues}
        setAllValues={setAllValues}
        btnSubmitValue="Cadastrar"
      />
    </section>
  );
};

export default RegisterServiceTypes;
