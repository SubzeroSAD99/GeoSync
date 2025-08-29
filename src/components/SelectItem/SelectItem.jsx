// SelectItem.jsx
import React, { useEffect, useState, useRef } from "react";
import Select, { components } from "react-select";
import { FixedSizeList as List } from "react-window";
import { ButtonInfo, Container, Title } from "./SelectItem.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEM_H = 35;
const MAX_H = 300;

// 1) Wrapper que intercepta o wheel em capture
const OuterList = React.forwardRef(({ children, style, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    onWheelCapture={(e) => e.stopPropagation()}
    {...rest}
  >
    {children}
  </div>
));

// 2) MenuList que usa esse OuterList
const MenuList = (props) => {
  const { options, children, getValue } = props;
  const [value] = getValue();

  return (
    <components.MenuList
      {...props}
      style={{
        padding: "0px",
        maxHeight: "none",
        overscrollBehavior: "contain",
        zIndex: 0,
      }}
    >
      <List
        height={Math.min(MAX_H, children.length * ITEM_H)}
        itemCount={children.length}
        itemSize={ITEM_H}
        width="100%"
        outerElementType={OuterList}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </components.MenuList>
  );
};

const SelectItem = ({
  options,
  title,
  name,
  required,
  select,
  placeholder,
  onChange,
  btnInfo,
  error,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    if (select != null) {
      const match = options.find(
        (opt) =>
          String(opt.label).toUpperCase() === String(select).toUpperCase() ||
          String(opt.value).toUpperCase() === String(select).toUpperCase()
      );
      setSelectedOption(match || null);
    }
  }, [select, options]);

  const handleChange = (opt) => {
    setSelectedOption(opt);

    onChange && onChange(opt?.label, setSelectedOption);

    if (containerRef.current) containerRef.current.style.border = "";
  };

  return (
    <Container
      ref={containerRef}
      data-required={required}
      style={error && !selectedOption ? { border: "1px solid red" } : undefined}
    >
      <Title>
        {title}
        {required && <span style={{ color: "red" }}> *</span>}
      </Title>

      <Select
        name={name}
        options={options}
        value={selectedOption}
        getOptionLabel={(opt) => opt.label}
        getOptionValue={(opt) => opt.value ?? opt.label}
        onChange={handleChange}
        placeholder={placeholder ?? "SELECIONE..."}
        isSearchable
        isClearable
        menuShouldBlockScroll={false}
        components={{ MenuList }}
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
          }),

          control: (base) => ({
            ...base,
            border: error && !selectedOption ? "1px solid red" : base.border,
            boxShadow: "none",
            textTransform: "uppercase",
          }),
          menu: (base) => ({
            ...base,
            overflow: "visible",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            backgroundColor: "white",
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
            maxHeight: "none",
            overflow: "hidden",
            overscrollBehavior: "contain",
          }),

          option: (base, { isSelected, isFocused }) => ({
            ...base,
            color: isSelected ? "var(--text-color2)" : "black",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",

            backgroundColor: isSelected
              ? "var(--main-color)" // só o selecionado
              : isFocused
              ? "#eee" // hover
              : "white",
          }),

          dropdownIndicator: (base) => ({
            ...base,
            color: "var(--main-color)",
          }),

          clearIndicator: (base) => ({
            ...base,
            color: "red",
          }),
        }}
        maxMenuHeight={MAX_H}
      />

      {btnInfo && selectedOption && (
        <ButtonInfo type="button" onClick={btnInfo.click}>
          <FontAwesomeIcon icon={btnInfo.icon} />
        </ButtonInfo>
      )}
    </Container>
  );
};

export default SelectItem;
