import styled from "styled-components";

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  border: "1px solid var(--main-color)",
  padding: "10px",
  borderRadius: "5px",
  position: "relative",
  width: "100%",
  maxWidth: "600px",
  overflow: "visible",

  "& > label": {
    position: "absolute",
    fontSize: "0.9rem",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    color: "gray",
    padding: "0px 5px",
    backgroundColor: "transparent",
    transition:
      "left 0.2s linear, transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.2s ease",
  },

  "& > input": {
    borderRadius: "5px",
    border: "none",
    height: "22px",
    outline: "none",
    padding: "5px",
  },

  "& > input:focus + label, & > input:not(:placeholder-shown) + label": {
    left: "20px",
    transition:
      "left 0.2s linear, transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease 0.2s",
    transform: "translateY(-30px)",
    backgroundColor: "var(--bg-secundary-color)",
    color: "var(--text-color)",
  },
});

export { InputContainer };
