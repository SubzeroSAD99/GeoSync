import React from "react";
import { Title } from "./RegisterServices.styled.mjs";
import api from "../../../utils/api.mjs";
import FormServices from "../FormServices/FormServices";

const RegisterServices = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const emptyFields = Object.entries(data)
      .filter(([name, v]) => {
        if (form.elements[name].parentNode.dataset.required && !v.trim())
          return !v.trim();
      })
      .map(([key]) => key);

    emptyFields.forEach((name) => {
      const field = form.elements[name];

      if (field) {
        field.parentNode.style.border = "1px solid red";
      }
    });

    if (emptyFields.length > 0) return;

    const response = await api.post("/registerOS", data);
  };

  return (
    <section>
      <Title>Cadastrar Ordem Serviço</Title>

      <FormServices handleSubmit={handleSubmit} textBtnSubmit={"Cadastrar"} />
    </section>
  );
};

export default RegisterServices;
