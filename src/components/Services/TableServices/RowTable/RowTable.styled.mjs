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

const StyledTd = styled.td`
  padding: 5px;
  border: 1px solid darkgray;
  text-align: center;
  font-size: 1rem;
`;

const HighlightContainer = styled.div(({ $info }) => {
  let color = "transparent";
  let alert = false;

  switch ($info?.toUpperCase()) {
    case "ABERTO":
      color = "rgb(0, 190, 0)";
      break;
    case "FECHADO":
      color = "#ff0000";
      break;
    case "BAIXA":
      color = "var(--main-color)";
      break;
    case "NORMAL":
      color = "rgb(182, 182, 0)";
      break;
    case "ALTA":
      color = "#ff0000";
      alert = true;
      break;
    case "ISENTO":
      color = "#00aeffff";
      break;
    case "NÃO PAGO":
      color = "#ff0000";
      break;
    case "PARCIALMENTE PAGO":
      color = "rgba(209, 209, 0, 1)";
      break;
    case "PAGO":
      color = "rgb(0, 190, 0)";
      break;
  }

  return css`
    justify-self: center;
    width: 60%;
    min-width: max-content;
    border-radius: 3px;
    padding: 2px;
    background-color: ${color};
    box-shadow: 0px 0px 4px 0px ${color};
    ${alert &&
    css`
      animation: ${alertAnimation} 1s linear infinite;
    `}
  `;
});

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex: 1 1 auto;
  flex-wrap: wrap;
  padding: 8px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  color: var(--text-color2);
  transition: filter 0.5s ease, box-shadow 0.4s linear;
  box-shadow: 0px 0px 6px 0px transparent;
  font-size: 1rem;

  &:hover {
    filter: brightness(130%);
    box-shadow: 0px 0px 6px 0px ${(props) => props.color};
  }
`;

export { StyledTd, HighlightContainer, Actions, Button };
