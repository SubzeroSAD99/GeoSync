import React, { useEffect, useRef, useState } from "react";
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

const SelectItem = ({
  options,
  title,
  placeholder = "Selecione",
  name,
  required,
  select,
  error,
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(select ?? "");
  const containerRef = useRef();

  useEffect(() => {
    setSelected(select ?? "");
  }, [select]);

  const selectedOption = options.find((opt) =>
    opt.value
      ? String(opt.value).toUpperCase() === String(selected).toUpperCase()
      : String(opt.label).toUpperCase() === String(selected).toUpperCase()
  );

  const filteredOptions =
    query === ""
      ? options
      : options.filter((it) =>
          it.label.toUpperCase().includes(query.toUpperCase())
        );

  return (
    <>
      <Container
        ref={containerRef}
        data-required={required}
        style={error ? { border: "1px solid red" } : undefined}
      >
        <Title>
          {title}
          {required && <span style={{ color: "red" }}> *</span>}
        </Title>

        <Combobox
          value={selected}
          onChange={(value) => {
            setSelected(value);
            containerRef.current.style.border = "";
          }}
          name={name}
        >
          <StyledCboxButton
            onClick={() => {
              setQuery("");
            }}
          >
            {selectedOption?.label?.toUpperCase() || placeholder?.toUpperCase()}
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
              <StyledCboxOption value={placeholder?.toUpperCase()}>
                {placeholder?.toUpperCase()}
              </StyledCboxOption>
              {/* Opções filtradas */}
              {filteredOptions.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Nada encontrado.
                </div>
              ) : (
                filteredOptions.map((it, index) => (
                  <StyledCboxOption
                    key={`${it}-${index}`}
                    value={it.value ?? it.label}
                  >
                    {it.label.toUpperCase()}
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
