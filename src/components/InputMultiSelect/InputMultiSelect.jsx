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
              <Items>
                {/* Renderiza os valores de cada bloco */}
                {val?.map((value2, index) => (
                  <div key={index}>
                    <span>{value2}</span>
                    <ButtonDelete
                      type="button"
                      onClick={() => {
                        props.setAllValues((prev) => {
                          // clona o array de blocos
                          const updated = prev.map((b) => ({ ...b }));

                          // clona o bloco alvo para evitar mutação direta
                          const block = { ...updated[blockIndex] };
                          updated[blockIndex] = block;

                          const current = Array.isArray(block[key])
                            ? [...block[key]]
                            : [];

                          const next = current.filter((_, i) => i !== index);

                          if (next.length) {
                            block[key] = next;
                          } else {
                            delete block[key];
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
