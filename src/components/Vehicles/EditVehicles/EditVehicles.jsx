import React, { useEffect, useState } from "react";
import { Title } from "./EditVehicles.styled.mjs";
import { useAuth } from "@contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@utils/api.mjs";
import FormVehicles from "../FormVehicles/FormVehicles";

const EditVehicles = ({ id }) => {
  const [infoVehicle, setInfoVehicle] = useState({});
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/vehicle/getOne", { id });

        if (response.data) {
          setInfoVehicle(response.data);
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
      const response = await api.post("/vehicle/edit", { id, ...values });

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
      <Title>Editar Veiculo</Title>

      <FormVehicles
        {...infoVehicle}
        handleSubmit={handleSubmit}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditVehicles;
