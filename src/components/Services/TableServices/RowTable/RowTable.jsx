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
  owner,
  cadist,
  serviceType,
  municipality,
  priority,
  stats,
  createdDate,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <tr>
      <StyledTd>{owner}</StyledTd>
      <StyledTd>{serviceType}</StyledTd>
      <StyledTd>{cadist}</StyledTd>
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
          <ButtonView
            onClick={() => {
              onView(id);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
            <span>Visualizar</span>
          </ButtonView>
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
