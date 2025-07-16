import styled from "styled-components";

const StyledTd = styled.td`
  padding: 10px 5px;
  font-size: 1rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  --_button-delete-color: #ff0000;
  --_button-edit-color: #e48900;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    max-width: 150px;
    flex: 1 1 auto;
    flex-wrap: wrap;
    font-size: 1rem;
    padding: 8px;
    cursor: pointer;
    border: none;
    border-radius: 2px;
    color: var(--text-color2);
    transition: filter 0.5s ease, box-shadow 0.4s linear;
    box-shadow: 0px 0px 6px 0px transparent;

    &:hover {
      filter: brightness(130%);
    }
  }
`;

const ButtonDelete = styled.button`
  background-color: var(--_button-delete-color);

  &:hover {
    box-shadow: 0px 0px 6px 0px var(--_button-delete-color);
  }
`;

const ButtonEdit = styled.button`
  background-color: var(--_button-edit-color);

  &:hover {
    box-shadow: 0px 0px 6px 0px var(--_button-edit-color);
  }
`;

export { StyledTd, Actions, ButtonDelete, ButtonEdit };
