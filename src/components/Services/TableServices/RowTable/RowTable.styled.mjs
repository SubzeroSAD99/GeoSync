import styled, { css, keyframes } from "styled-components";

const alertAnimation = keyframes`
  0% {
    box-shadow: 0px 0px 8px 3px transparent;
    transform: scale(1);
  }
  50% {
    box-shadow: 0px 0px 8px 3px #ff0000;
    transform: scale(1.1);
  }
  100% {
    box-shadow: 0px 0px 8px 3px transparent;
    transform: scale(1);
  }
`;

const StyledTd = styled.td({
  padding: "5px",
  border: "1px solid darkgray",
  textAlign: "center",
  fontSize: "1rem",
});

const PriorityContainer = styled.div(({ $priority }) => {
  let color = "transparent";
  let alert = false;

  switch ($priority.toUpperCase()) {
    case "BAIXA":
      color = "var(--main-color)";
      break;
    case "NORMAL":
      color = "rgb(175, 175, 0)";
      break;
    case "ALTA":
      color = "#ff0000";
      alert = true;
      break;
  }

  return css`
    justify-self: center;
    width: 80%;
    min-width: max-content;
    border-radius: 4px;
    padding: 5px;
    background-color: ${color};
    box-shadow: 0px 0px 5px 0px ${color};
    ${alert &&
    css`
      animation: ${alertAnimation} 1s linear infinite;
    `}
  `;
});

const StatsContainer = styled.div(({ $stats }) => {
  let color;

  switch ($stats.toUpperCase()) {
    case "ABERTA":
      color = "rgb(0, 190, 0)";
      break;
    case "FECHADA":
      color = "#ff0000";
      break;
  }

  return {
    justifySelf: "center",
    width: "max-content",
    padding: "5px",
    borderRadius: "4px",
    backgroundColor: color,
    boxShadow: `0px 0px 8px 2px ${color}`,
  };
});

const Actions = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "10px",
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

const ButtonView = styled.button({
  backgroundColor: "var(--main-color)",
  "&:hover": {
    boxShadow: "0px 0px 6px 0px var(--main-color)",
  },
});

export {
  StyledTd,
  PriorityContainer,
  StatsContainer,
  Actions,
  ButtonDelete,
  ButtonEdit,
  ButtonView,
};
