import React, { useEffect, useState } from "react";
import FormMunicipalities from "../FormMunicipalities/FormMunicipalities";
import { Title } from "../Municipalities.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";

const EditMunicipalities = ({ id }) => {
  const [name, setName] = useState("");
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/municipality/getOne", { id });

        if (response.data) {
          setName(response.data.name);
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status === 401) setUserLogged(null);

        toast.error(msg);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const values = form.entries().reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});

    try {
      const response = await api.post("/municipality/edit", { id, ...values });

      if (response.data) {
        toast.success(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (err.status === 401) setUserLogged(null);

      if (msg) toast.error(msg);
    }
  };

  return (
    <section>
      <Title>Editar Municipio</Title>

      <FormMunicipalities
        name={name}
        handleSubmit={handleSubmit}
        textBtnSubmit={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditMunicipalities;
