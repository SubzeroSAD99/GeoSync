import React, { useEffect, useState } from "react";
import api from "@utils/api.mjs";
import FormServices from "../FormServices/FormServices";
import { Title } from "./EditServices.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";

const EditServices = ({ id }) => {
  const { setUserLogged } = useAuth();
  const [serviceInfo, setServiceInfo] = useState({});
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState("");

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

    const newForm = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => newForm.append(key, v ?? "")); // repete a mesma chave
      } else {
        newForm.append(key, value ?? "");
      }
    });

    newForm.append("id", id);

    try {
      const response = await api.post("/service/edit", newForm);

      if (response.data) toast.success(response.data.msg);
    } catch (err) {
      const field = err.response?.data?.field;
      const msg = err.response?.data?.msg;

      if (err.status == 401) {
        setUserLogged(null);
      }

      if (field) setErrors(field);
      if (msg) toast.error(msg);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getOne", { id });

        if (response.data) {
          setServiceInfo(response.data.service);
          setFiles(response.data.files);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) {
          setUserLogged(null);
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
        files={files}
        errors={errors}
        textBtnSubmit={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditServices;
