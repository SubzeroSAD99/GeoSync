import React, { useEffect, useState } from "react";
import { Title } from "../Employees.styled.mjs";
import FormEmployees from "../FormEmployees/FormEmployees";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";

const EditEmployees = ({ id }) => {
  const [infoEmployee, setInfoEmployee] = useState({});
  const [role, setRole] = useState("CADISTA");
  const allRoles = [
    { label: "CADISTA" },
    { label: "TOPOGRAFO" },
    { label: "ADMINISTRADOR" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/employee/getOne", { id });

        if (response.data) {
          setInfoEmployee(response.data);
          setRole(response.data.role);
        }
      } catch (err) {
        console.log(err);
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
      const response = await api.post("/employee/edit", { id, ...values });

      if (response.data) {
        setRole(values.role);
        toast.success(response.data.msg);
      }
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.error(msg);
    }
  };

  return (
    <section>
      <Title>Editar Funcionario</Title>

      <FormEmployees
        {...infoEmployee}
        handleSubmit={handleSubmit}
        options={allRoles.filter((it) => it.label !== role.toUpperCase())}
        role={role}
        btnSubmitValue={"Salvar Alterações"}
      />
    </section>
  );
};

export default EditEmployees;
