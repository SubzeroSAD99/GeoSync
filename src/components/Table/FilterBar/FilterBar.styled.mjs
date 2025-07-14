import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "100%",
  alignItems: "center",
  padding: "0px 20px",
});

const StyledInput = styled.input({
  border: "none",
  borderRadius: "10px",
  height: "23px",
  padding: "8px",
  outlineColor: "var(--main-color)",
  backgroundColor: "var(--bg-secundary-color)",
  color: "var(--text-color)",
  border: "1px solid gray",
  width: "100%",
  maxWidth: "400px",
});

export { Container, StyledInput };
