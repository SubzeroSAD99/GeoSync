import React, { useEffect, useState } from "react";
import api from "../../../utils/api.mjs";
import FormServices from "../FormServices/FormServices";
import { Title } from "./EditServices.styled.mjs";
import { useAuth } from "../../../contexts/AuthContext";

const EditServices = (id) => {
  const { setEmployee } = useAuth();
  const [serviceInfo, setServiceInfo] = useState({});

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

    try {
      const response = await api.post("/editOS", { ...data, ...id });

      if (response.data) console.log("Serviço atualizado com sucesso!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/getService", id);

        if (response.data) setServiceInfo(response.data.service);
      } catch (err) {
        if (err.statusCode == 401) setEmployee(null);
      }
    })();
  }, []);

  return (
    <section>
      <Title>Editar Ordem Serviço</Title>

      <FormServices
        handleSubmit={handleSubmit}
        {...serviceInfo}
        textBtnSubmit={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditServices;
