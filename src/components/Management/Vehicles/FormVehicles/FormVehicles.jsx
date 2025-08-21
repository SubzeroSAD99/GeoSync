import React, { useEffect, useState } from "react";
import { Container, StyledButton, StyledForm } from "./FormVehicles.styled.mjs";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import SelectItem from "@components/SelectItem/SelectItem";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/AuthContext.jsx";
import api from "@utils/api.mjs";

const FormVehicles = ({
  handleSubmit,
  name,
  year,
  plate,
  color,
  topographer,
  btnSubmitValue,
}) => {
  const { setUserLogged } = useAuth();
  const [allTopographers, setAllTopographers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("employee/getTopographers");

        if (response.data) {
          setAllTopographers(
            response.data.topographers.map((it) => {
              return {
                label: it.fullName,
                value: it.id,
              };
            })
          );
        }
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status == 401) setUserLogged(null);

        if (msg) toast.error(msg);
      }
    })();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <SelectItem
          options={allTopographers}
          title="Topografo"
          name="topographer"
          select={topographer}
        />

        <FormInputItem id="name" type="text" label="Nome" valueInput={name} />

        <FormInputItem
          id="year"
          type="number"
          mask="0000"
          label="Ano"
          valueInput={String(year)}
        />

        <FormInputItem
          id="plate"
          type="text"
          label="Placa"
          mask={[
            {
              mask: "***-****",
              definitions: {
                "*": /[a-zA-Z0-9]/,
              },
            },
          ]}
          valueInput={plate}
        />

        <FormInputItem id="color" type="text" label="Cor" valueInput={color} />
      </Container>

      <StyledButton type="submit">{btnSubmitValue}</StyledButton>
    </StyledForm>
  );
};

export default FormVehicles;
