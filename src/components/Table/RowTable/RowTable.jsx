import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPenToSquare, faTrash, faUser, faUserTie } from "@/icons.mjs";
import {
  Actions,
  ButtonDelete,
  ButtonEdit,
  StyledTd,
} from "./RowTable.styled.mjs";

const RowTable = ({ rows, obj, onDelete, onEdit }) => {
  return (
    <tr>
      {rows.map((it, index) => (
        <React.Fragment key={`${it}-${index}`}>
          <StyledTd>
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
        </React.Fragment>
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
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>Editar</span>
          </ButtonEdit>
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
