import styled from "styled-components";

const StyledTd = styled.td({
  padding: "10px 5px",
  fontSize: "1rem",
});

const Actions = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",

  "--_button-delete-color": "#ff0000",
  "--_button-edit-color": "#e48900",

  "& button": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    flex: "1 1 auto",
    flexWrap: "wrap",
    fontSize: "1rem",
    padding: "8px",
    cursor: "pointer",
    border: "none",
    borderRadius: "2px",
    color: "var(--text-color2)",
    transition: "filter 0.5s ease, box-shadow 0.4s linear",
    boxShadow: "0px 0px 6px 0px transparent",

    "&:hover": {
      filter: "brightness(130%)",
    },
  },
});

const ButtonDelete = styled.button({
  backgroundColor: "var(--_button-delete-color)",

  "&:hover": {
    boxShadow: "0px 0px 6px 0px var(--_button-delete-color)",
  },
});

const ButtonEdit = styled.button({
  backgroundColor: "var(--_button-edit-color)",

  "&:hover": {
    boxShadow: "0px 0px 6px 0px var(--_button-edit-color)",
  },
});

export { StyledTd, Actions, ButtonDelete, ButtonEdit };
