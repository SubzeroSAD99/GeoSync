import React, { useEffect, useState } from "react";
import api from "../../../utils/api.mjs";
import FormServices from "../FormServices/FormServices";
import { Title } from "./EditServices.styled.mjs";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const EditServices = (id) => {
  const { setEmployee } = useAuth();
  const [serviceInfo, setServiceInfo] = useState({});
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await api.post("/service/edit", { ...data, ...id });

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const field = err.response?.data?.field;
      const msg = err.response?.data?.msg;

      if (field) setErrors(field);
      if (msg) toast.error(msg);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getOne", id);

        if (response.data) setServiceInfo(response.data.service);
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) {
          setEmployee(null);
        }

        toast.error(msg);
      }
    })();
  }, []);

  return (
    <section>
      <Title>Editar Ordem Serviço</Title>

      <FormServices
        handleSubmit={handleSubmit}
        {...serviceInfo}
        errors={errors}
        textBtnSubmit={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditServices;
