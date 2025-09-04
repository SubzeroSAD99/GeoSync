import styled from "styled-components";
import { media } from "@utils/Media.styles.mjs";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > button {
    width: 25px;
    height: 25px;
  }
`;

const TableContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  grid-gap: 20px;
  padding: 10px;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  z-index: 1;

  & > div:nth-child(1) {
    grid-column: 1 / -1;
    justify-self: end;
  }

  ${media(`
    grid-template-columns: 1fr;
  `)}
`;

const ButtonCloseTable = styled.button`
  background-color: red;
  width: 25px;
  height: 25px;
  box-shadow: 0px 0px 5px red !important;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & button {
    background-color: red;
    width: 25px;
    height: 25px;
    align-self: flex-end;

    &:hover {
      box-shadow: 0px 0px 5px red;
    }
  }
`;

export { ServiceContainer, TitleContainer, TableContainer, ButtonCloseTable };
