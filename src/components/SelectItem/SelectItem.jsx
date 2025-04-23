import React, { useState } from "react";
import {
  SearchContainer,
  InputSearch,
  StyledCboxButton,
  StyledCboxOption,
  StyledCboxOptions,
  OptionsContainer,
  StyledFontAwesome,
  Container,
  Title,
} from "./SelectItem.styled.mjs";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Combobox } from "@headlessui/react";

const SelectItem = ({ options, title, placeholder }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((it) => it.toUpperCase().includes(query.toUpperCase()));
  return (
    <>
      <Container>
        <Title>{title}</Title>

        <Combobox value={selected} onChange={setSelected}>
          <StyledCboxButton onClick={() => setQuery("")}>
            {selected || placeholder}
            <StyledFontAwesome icon={faCaretDown} />
          </StyledCboxButton>
          <StyledCboxOptions>
            <SearchContainer>
              <InputSearch
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                onMouseDown={(e) => e.stopPropagation()}
              />
            </SearchContainer>

            <OptionsContainer>
              <StyledCboxOption value="">{placeholder}</StyledCboxOption>
              {/* Opções filtradas */}
              {filteredOptions.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Nada encontrado.
                </div>
              ) : (
                filteredOptions.map((it, index) => (
                  <StyledCboxOption key={`${it}-${index}`} value={it}>
                    {it}
                  </StyledCboxOption>
                ))
              )}
            </OptionsContainer>
          </StyledCboxOptions>
        </Combobox>
      </Container>
    </>
  );
};

export default SelectItem;
