import React, { useEffect, useState } from "react";
import { Container } from "../Sector.styled.mjs";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import SelectItem from "@components/SelectItem/SelectItem";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";

const AddressSector = ({
  neighborhood,
  number,
  cep,
  road,
  city,
  complement,
  state,
  uf,
}) => {
  const [allStates, setAllStates] = useState([]);
  const [allUfs, setAllUfs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/ufs.json");

        if (response.data) {
          setAllStates(
            response.data.map((it) => {
              return {
                label: it.state,
              };
            })
          );
          setAllUfs(
            response.data.map((it) => {
              return {
                label: it.uf,
              };
            })
          );
        }
      } catch (error) {
        toast.error("Erro ao pegar UFs e Estados!");
      }
    })();
  }, []);
  return (
    <div>
      <h3>Endereço</h3>

      <Container>
        <SelectItem
          title="Estado"
          options={allStates}
          name="state"
          select={state}
        />

        <SelectItem title="UF" options={allUfs} name="uf" select={uf} />

        <FormInputItem id="road" type="text" label="Rua" valueInput={road} />

        <FormInputItem id="city" type="text" label="Cidade" valueInput={city} />

        <FormInputItem
          id="neighborhood"
          type="text"
          label="Bairro"
          valueInput={neighborhood}
        />

        <FormInputItem
          id="number"
          type="number"
          label="Nº"
          valueInput={number}
          placeholder="S/N"
        />

        <FormInputItem
          id="cep"
          type="text"
          label="CEP"
          valueInput={cep}
          mask="00000-000"
          placeholder="_____-___"
        />

        <FormInputItem
          id="complement"
          type="text"
          label="Complemento"
          valueInput={complement}
        />
      </Container>
    </div>
  );
};

export default AddressSector;
