import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledTd,
  Actions,
  Button,
  HighlightContainer,
} from "./RowTable.styled.mjs";

const RowTable = ({ id, item, options, actions = [] }) => {
  return (
    <tr key={id}>
      {options.map((it, index) => (
        <StyledTd key={`${it}-${index}`}>
          {it === "priority" || it === "status" || it === "paymentSituation" ? (
            <HighlightContainer $info={item[it]}>{item[it]}</HighlightContainer>
          ) : (
            item[it]
          )}
        </StyledTd>
      ))}
      <StyledTd>
        <Actions>
          {actions.map(({ condition, buttonInfo }, index) =>
            condition == undefined || condition ? (
              <Button
                key={`${buttonInfo.label}-${index}`}
                color={buttonInfo.color}
                onClick={() => {
                  buttonInfo.click(id);
                }}
              >
                <FontAwesomeIcon icon={buttonInfo.icon} />
                <span>{buttonInfo.label}</span>
              </Button>
            ) : null
          )}
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
