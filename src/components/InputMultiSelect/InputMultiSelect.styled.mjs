import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
  max-width: 600px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 15px;
  }
`;

const ButtonAdd = styled.button`
  width: 25px;
  height: 25px;
  background-color: green;

  &:hover {
    box-shadow: 0px 0px 5px green;
  }
`;

const ItemsContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  height: 200px;

  & > span {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-secundary-color);
    padding: 0px 8px;
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  width: 100%;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;

  & > div {
    display: flex;
    justify-content: space-between;
    background-color: var(--text-color2);
    box-shadow: 0px 0px 2px var(--text-color2);
    color: black;
    border-radius: 3px;
    padding: 5px;
  }
`;

const ButtonDelete = styled.button`
  color: rgb(255, 0, 0);
  box-shadow: none !important;
  background-color: transparent;
`;

export { Container, ButtonAdd, ItemsContainer, Items, ButtonDelete };
