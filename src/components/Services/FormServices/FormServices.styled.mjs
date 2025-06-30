import styled from "styled-components";

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px",
  width: "100%",
});

const StyledButton = styled.button({
  alignSelf: "flex-end",
  width: "100%",
  maxWidth: "200px",
  height: "25px",
  fontSize: "1rem",
});

export { StyledForm, StyledButton };
