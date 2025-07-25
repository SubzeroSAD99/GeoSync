import React, { useEffect, useState } from "react";
import { Title } from "./EditEquipments.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import FormEquipments from "../FormEquipments/FormEquipments";

const EditEquipments = ({ id }) => {
  const [infoEquipment, setInfoEquipment] = useState({});
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/equipment/getOne", { id });

        if (response.data) {
          setInfoEquipment(response.data);
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
      const response = await api.post("/equipment/edit", { id, ...values });

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
      <Title>Editar Equipamento</Title>

      <FormEquipments
        {...infoEquipment}
        handleSubmit={handleSubmit}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditEquipments;
