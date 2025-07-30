import React, { useEffect, useRef, useState } from "react";
import {
  SearchContainer,
  InputSearch,
  StyledCboxButton,
  StyledOptionContainer,
  StyledCboxOptions,
  OptionsContainer,
  StyledFontAwesome,
  Container,
  Title,
} from "./SelectItem.styled.mjs";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Combobox, ComboboxOption } from "@headlessui/react";
import { FixedSizeList as List } from "react-window";

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
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const containerRef = useRef();

  useEffect(() => {
    setSelected(select ?? "");
  }, [select]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Espera 300ms após o usuário parar de digitar

    return () => clearTimeout(timer); // Limpa o timer ao fazer uma nova digitação
  }, [query]);

  const selectedOption = options.find((opt) =>
    opt.value
      ? String(opt.value).toUpperCase() === String(selected).toUpperCase()
      : String(opt.label).toUpperCase() === String(selected).toUpperCase()
  );

  const filteredOptions =
    debouncedQuery === ""
      ? options
      : options.filter((it) =>
          it.label.toUpperCase().includes(debouncedQuery.toUpperCase())
        );

  const optionsWithPlaceholder = [
    { label: placeholder, value: null },
    ...filteredOptions,
  ];

  const listHeight = Math.min(optionsWithPlaceholder.length * 35, 300);

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
              {/* Opções filtradas */}
              {optionsWithPlaceholder.length === 1 ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Nada encontrado.
                </div>
              ) : (
                <List
                  height={listHeight} // Definindo altura visível
                  itemCount={optionsWithPlaceholder.length} // Número de itens na lista
                  itemSize={35} // Tamanho de cada item
                  width="100%"
                >
                  {({ index, style }) => {
                    const item = optionsWithPlaceholder[index];

                    return (
                      <StyledOptionContainer
                        key={item.value ?? index}
                        onClick={() => {
                          setSelected(item.value ?? item.label);
                        }}
                        style={style}
                      >
                        {optionsWithPlaceholder[index].label?.toUpperCase()}
                      </StyledOptionContainer>
                    );
                  }}
                </List>
              )}
            </OptionsContainer>
          </StyledCboxOptions>
        </Combobox>
      </Container>
    </>
  );
};

export default SelectItem;
