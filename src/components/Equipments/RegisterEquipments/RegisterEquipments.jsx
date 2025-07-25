import React from "react";
import { Title } from "./RegisterEquipments.styled.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";
import FormEquipments from "../FormEquipments/FormEquipments.jsx";

const RegisterEquipments = () => {
  const { setUserLogged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/equipment/register", { ...values });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.warn(msg);

      if (err.status == 401) return setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Equipamento</Title>
      <FormEquipments
        handleSubmit={handleSubmit}
        options={[]}
        role="FUNCIONARIO"
        btnSubmitValue="Cadastrar"
      />
    </section>
  );
};

export default RegisterEquipments;
