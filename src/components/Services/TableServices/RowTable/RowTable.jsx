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
          {["priority", "finished", "paymentSituation"].includes(it) ? (
            <HighlightContainer
              $info={
                it === "finished" ? (item[it] ? "FECHADO" : "ABERTO") : item[it]
              }
            >
              {it === "finished" ? (item[it] ? "FECHADO" : "ABERTO") : item[it]}
            </HighlightContainer>
          ) : ["serviceType", "step", "serviceValue", "municipality"].includes(
              it
            ) ? (
            item[it].map((it, idx) => (
              <p key={`${it}item${idx}`} style={{ padding: "5px 0px" }}>
                {it}
              </p>
            ))
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
