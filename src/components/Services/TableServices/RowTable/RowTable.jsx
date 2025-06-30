import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  StyledTd,
  Actions,
  ButtonDelete,
  ButtonEdit,
  ButtonView,
  PriorityContainer,
  StatsContainer,
} from "./RowTable.styled.mjs";

const RowTable = ({
  id,
  clientName,
  serviceType,
  employeeName,
  municipality,
  priority,
  stats,
  createdDate,
  onDelete,
  onEdit,
}) => {
  return (
    <tr>
      <StyledTd>{clientName}</StyledTd>
      <StyledTd>{serviceType}</StyledTd>
      <StyledTd>{employeeName}</StyledTd>
      <StyledTd>{municipality}</StyledTd>
      <StyledTd>
        <PriorityContainer $priority={priority}>{priority}</PriorityContainer>
      </StyledTd>
      <StyledTd>
        <StatsContainer $stats={stats}>{stats}</StatsContainer>
      </StyledTd>
      <StyledTd>{createdDate}</StyledTd>
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
          <ButtonEdit
            onClick={() => {
              onEdit(id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Editar</span>
          </ButtonEdit>
          <ButtonView>
            <FontAwesomeIcon icon={faEye} />
            <span>Visualizar</span>
          </ButtonView>
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
