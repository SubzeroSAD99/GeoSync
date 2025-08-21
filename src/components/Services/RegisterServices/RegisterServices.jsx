import React, { useEffect, useState } from "react";
import { Title } from "./RegisterServices.styled.mjs";
import api from "@utils/api.mjs";
import FormServices from "../FormServices/FormServices";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

const RegisterServices = () => {
  const [errors, setErrors] = useState("");
  const [startingMDate, setStartingMDate] = useState("");
  const [topographer, setTopographer] = useState("");
  const { setUserLogged } = useAuth();
  const { state } = useLocation();

  useEffect(() => {
    const data = state?.data;

    setStartingMDate(data?.measurementDate ?? "");
    setTopographer(data?.topographer ?? "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    const multiFields = [
      "code",
      "serviceType",
      "serviceValue",
      "step",
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
      const response = await api.post("/service/register", data);

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
      <Title>Cadastrar Ordem Serviço</Title>

      <FormServices
        handleSubmit={handleSubmit}
        textBtnSubmit={"Cadastrar"}
        errors={errors}
        measurementDate={startingMDate}
        topographer={topographer}
      />
    </section>
  );
};

export default RegisterServices;
