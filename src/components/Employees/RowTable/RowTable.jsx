import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faEdit,
  faTrash,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {
  Actions,
  ButtonDelete,
  ButtonEdit,
  StyledTd,
} from "./RowTable.styled.mjs";

const RowTable = ({ id, fullName, position, onDelete }) => {
  return (
    <tr>
      <StyledTd>{fullName}</StyledTd>
      <StyledTd>
        <FontAwesomeIcon
          icon={position === "administrador" ? faUserTie : faUser}
          style={{
            paddingRight: "8px",
          }}
        />

        {position}
      </StyledTd>
      <StyledTd>
        <Actions>
          <ButtonDelete
            onClick={() => {
              onDelete(id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Excluir</span>
          </ButtonDelete>
          <ButtonEdit>
            <FontAwesomeIcon icon={faEdit} />
            <span>Editar</span>
          </ButtonEdit>
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
