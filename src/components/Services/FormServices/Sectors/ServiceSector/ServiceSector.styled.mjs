import styled from "styled-components";

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

export { ServiceContainer, TitleContainer };
