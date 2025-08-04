import React from "react";
import { Title } from "./RegisterVehicles.styled.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";
import FormVehicles from "../FormVehicles/FormVehicles.jsx";

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
      const response = await api.post("/vehicle/register", { ...values });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.warn(msg);

      if (err.status == 401) return setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Veiculo</Title>
      <FormVehicles handleSubmit={handleSubmit} btnSubmitValue="Cadastrar" />
    </section>
  );
};

export default RegisterEquipments;
