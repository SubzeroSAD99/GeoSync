import React, { useEffect, useRef, useState } from "react";
import FormInputItem from "@components/FormInputItem/FormInputItem";
import {
  ButtonAdd,
  ButtonDelete,
  Container,
  Items,
  ItemsContainer,
} from "./InputMultiSelect.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TableServiceTypes from "../Management/ServiceTypes/TableServiceTypes/TableServiceTypes";

const InputMultiSelect = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [props.allValues]);

  return (
    <>
      <Container>
        <div>
          <FormInputItem
            {...props}
            onChange={(v) => setValue(v)}
            valueInput={value}
          />
          {value && (
            <ButtonAdd type="button" onClick={(e) => props.handleAdd(e, value)}>
              +
            </ButtonAdd>
          )}
        </div>
      </Container>
      {props.allValues.map((obj, blockIndex) =>
        Object.entries(obj).map(([key, val], entryIndex) => (
          <div
            key={`itemContainer${entryIndex + blockIndex}`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              gap: "8px",
              width: "100%",
            }}
          >
            <span>{key}</span>
            <ItemsContainer key={blockIndex}>
              <TableServiceTypes />
              <Items>
                {/* Renderiza os valores de cada bloco */}
                {val?.map((value2, index) => (
                  <div key={index}>
                    <span>{value2}</span>
                    <ButtonDelete
                      type="button"
                      onClick={() => {
                        props.setAllValues((prev) => {
                          // copia segura: clona o array e cada objeto interno
                          const updated = prev.map((b) => ({ ...b }));

                          const block = updated[blockIndex];
                          if (!block) return updated; // índice inválido

                          const current = block[key];

                          // se não existir array, nada a remover
                          if (!Array.isArray(current)) return updated;

                          const next = current.filter((v) => v !== value);

                          if (next.length) {
                            block[key] = next;
                          } else {
                            delete block[key]; // remove a chave vazia
                            // opcional: se o bloco ficar vazio, remove o bloco
                            if (Object.keys(block).length === 0) {
                              updated.splice(blockIndex, 1);
                            }
                          }

                          return updated;
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ButtonDelete>
                  </div>
                ))}
              </Items>
            </ItemsContainer>
          </div>
        ))
      )}
    </>
  );
};

export default InputMultiSelect;
