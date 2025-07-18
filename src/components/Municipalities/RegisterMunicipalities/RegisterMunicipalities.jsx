import React from "react";
import { Title } from "../Municipalities.styled.mjs";
import FormMunicipalities from "../FormMunicipalities/FormMunicipalities";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../utils/api.mjs";

const RegisterMunicipalities = () => {
  const { setUserLogged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/municipality/register", { ...values });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.error(msg);

      if (err.status == 401) return setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastro de Municipio</Title>

      <FormMunicipalities
        textBtnSubmit="Cadastrar"
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default RegisterMunicipalities;
