import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledTd,
  Actions,
  Button,
  HighlightContainer,
} from "./RowTable.styled.mjs";

const evaluateCondition = (condition, ctx) => {
  if (typeof condition === "function") return !!condition(ctx);
  if (condition === undefined) return true;
  return !!condition;
};

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
          ) : [
              "serviceType",
              "step",
              "serviceValue",
              "municipality",
              "cadists",
            ].includes(it) ? (
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
          {actions.map(({ buttonInfo }, index) => {
            const shouldShow = evaluateCondition(
              buttonInfo.condition,
              item.paymentSituation
            );

            if (!shouldShow) return null;

            return (
              <Button
                key={`${buttonInfo.label}-${index}`}
                color={buttonInfo.color}
                onClick={() => buttonInfo.click(id)}
              >
                <FontAwesomeIcon icon={buttonInfo.icon} />
                <span>{buttonInfo.label}</span>
              </Button>
            );
          })}
        </Actions>
      </StyledTd>
    </tr>
  );
};

export default RowTable;
