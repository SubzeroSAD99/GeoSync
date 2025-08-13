import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  position: relative;
  overflow: visible;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  padding: 15px;
  width: 100%;
`;

const Title = styled.p`
  position: absolute;
  top: -12px;
  left: 8px;
  font-size: 1rem;
  background-color: var(--bg-secundary-color);
  padding: 0px 5px;
`;

const ButtonInfo = styled.button`
  align-self: center !important;
  width: 25px !important;
  height: 25px !important;
  background-color: var(--main-color) !important;
  box-shadow: 0px 0px 5px var(--main-color) !important;
`;

export { Container, Title, ButtonInfo };
