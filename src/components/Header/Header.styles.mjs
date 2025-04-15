import styled from "styled-components";

const StyledHeader = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled.h1({
  borderLeft: "6px solid var(--main-color)",
  paddingLeft: "8px",
  borderRadius: "5px",
});

export { StyledHeader, Title };
