import React, { useEffect, useState } from "react";
import { Title } from "./RegisterServices.styled.mjs";
import api from "../../../utils/api.mjs";
import FormServices from "../FormServices/FormServices";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const RegisterServices = () => {
  const [errors, setErrors] = useState("");
  const [startingMDate, setStartingMDate] = useState("");
  const [searchParams] = useSearchParams();
  const { setUserLogged } = useAuth();

  useEffect(() => {
    const measurementDate = searchParams.get("measurementDate");

    if (measurementDate) setStartingMDate(measurementDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

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
      />
    </section>
  );
};

export default RegisterServices;
