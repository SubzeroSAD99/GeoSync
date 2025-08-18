import React, { useEffect, useState } from "react";
import { Title } from "./RegisterBudget.styled.mjs";
import api from "@utils/api.mjs";
import FormBudget from "../FormBudget/FormBudget";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/AuthContext";

const RegisterBudget = () => {
  const [errors, setErrors] = useState("");
  const { setUserLogged } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    const multiFields = [
      "serviceType",
      "serviceValue",
      "quantity",
      "municipality",
      "locality",
      "location",
    ];

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      if (!multiFields.includes(key)) {
        if (acc[key] !== undefined) {
          acc[key] = Array.isArray(acc[key])
            ? [...acc[key], value]
            : [acc[key], value];
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});

    // Para cada campo multiFields, use getAll (sempre retorna array)
    multiFields.forEach((field) => {
      data[field] = formData.getAll(field);
    });

    try {
      const response = await api.post("/budget/register", data);

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const field = err.response?.data?.field;
      const msg = err.response?.data?.msg;

      if (field) setErrors(field);
      if (msg) toast.error(msg);

      if (err.status === 401) setUserLogged(null);
    }
  };

  return (
    <section>
      <Title>Cadastrar Orçamento</Title>

      <FormBudget
        handleSubmit={handleSubmit}
        textBtnSubmit={"Cadastrar"}
        errors={errors}
      />
    </section>
  );
};

export default RegisterBudget;
