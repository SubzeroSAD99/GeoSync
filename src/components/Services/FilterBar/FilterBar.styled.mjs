import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

const StyledInput = styled.input({
  border: "none",
  borderRadius: "10px",
  height: "20px",
  padding: "8px",
  outlineColor: "var(--main-color)",
  backgroundColor: "var(--bg-secundary-color)",
  color: "var(--text-color)",
  border: "1px solid gray",
});

export { Container, StyledInput };
