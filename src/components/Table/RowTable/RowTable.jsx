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

const RowTable = ({ key, rows, obj, onDelete, onEdit }) => {
  return (
    <tr key={key}>
      {rows.map((it, index) => (
        <>
          <StyledTd key={`${it}-${index}`}>
            {it === "role" && (
              <FontAwesomeIcon
                icon={
                  [
                    "aux. administrativo",
                    "ge. administrativo",
                    "socio",
                  ].includes(obj[it])
                    ? faUserTie
                    : faUser
                }
                style={{
                  paddingRight: "8px",
                }}
              />
            )}

            {obj[it]}
          </StyledTd>
        </>
      ))}

      <StyledTd>
        <Actions>
          <ButtonDelete
            onClick={() => {
              onDelete(obj.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Excluir</span>
          </ButtonDelete>
          <ButtonEdit
            onClick={() => {
              onEdit(obj.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Editar</span>
          </ButtonEdit>
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
