import styled from "styled-components";

const StyledForm = styled.form({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
  placeItems: "center",
  gap: "20px",
  width: "100%",
  padding: "20px",

  "> div:first-child": {
    gridColumn: "1 / -1",
    width: "100%",
    maxWidth: "600px",
  },
});

const StyledButton = styled.button({
  placeSelf: "self-end",
  gridColumn: "1 / -1",
  width: "200px",
  height: "25px",
  fontSize: "1rem",
});

export { StyledForm, StyledButton };
