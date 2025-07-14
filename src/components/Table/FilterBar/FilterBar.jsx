import React from "react";
import { Container, StyledInput } from "./FilterBar.styled.mjs";

const FilterBar = ({ label, filters, column, onChange }) => {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <StyledInput
        type="text"
        placeholder="Pesquisar..."
        id={label}
        value={filters[column]}
        onChange={(e) => onChange({ ...filters, [column]: e.target.value })}
      />
    </Container>
  );
};

export default FilterBar;
