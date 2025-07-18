import React, { useEffect, useState } from "react";
import {
  CheckPath,
  FullLinesGroup,
  GlobalStyle,
  LinesGroup,
  StepsGroup,
  StyledHeader,
  StyledMain,
  StyledSection,
  Text,
} from "./TrackingService.styled.mjs";
import api from "../../../utils/api.mjs";
import { toast } from "react-toastify";

const TrackingService = ({ id }) => {
  const [step, setStep] = useState(0);
  const [owner, setOwner] = useState("");
  const [animationInProgress, setAnimationInProgress] = useState(false);

  const STEPS = [
    "agendado",
    "medido",
    "processado",
    "confeccao",
    "impresso",
    "concluido",
    "em rota de entrega",
    "em local de retirada",
    "finalizado",
  ];

  const stepsData = [
    {
      label: "Agendado",
      transform: "matrix(1.1717903,0,0,1.2018361,-25.388795,-111.01958)",
      textX: 129.77438,
      checkPath: "m 182.65807,544.07762 7.7978,10.12554 15.88606,-23.40614",
    },
    {
      label: "Medido",
      transform: "matrix(1.1717903,0,0,1.2018361,194.20449,-111.01958)",
      textX: 146.38113,
    },
    {
      label: "Processado",
      transform: "matrix(1.1717903,0,0,1.2018361,413.79779,-111.01958)",
      textX: 115.65591,
    },
    {
      label: "Confecção",
      transform: "matrix(1.1717903,0,0,1.2018361,633.39108,-111.01958)",
      textX: 124.56084,
    },
    {
      label: "Impresso",
      transform: "matrix(1.1717903,0,0,1.2018361,852.98436,-111.01958)",
      textX: 130.90459,
    },
    {
      label: "Concluido",
      transform: "matrix(1.1717903,0,0,1.2018361,1072.5776,-111.01958)",
      textX: 129.14548,
    },
    {
      label: "Em Rota",
      transform: "matrix(1.1717903,0,0,1.2018361,1292.1709,-111.01958)",
      textX: 139.02568,
    },
    {
      label: "Retirada",
      transform: "matrix(1.1717903,0,0,1.2018361,1511.7642,-111.01958)",
      textX: 136.31865,
    },
    {
      label: "Finalizado",
      transform: "matrix(1.1717903,0,0,1.2018361,1731.3575,-111.01958)",
      textX: 128.47099,
    },
  ];

  const linesData = [
    {
      transform: "matrix(1.1717903,0,0,1.2018361,-25.388795,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,194.20449,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,413.79778,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,633.39108,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,852.98436,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,1072.5776,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,1292.1709,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,1511.7642,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,1731.3575,-111.01958)",
    },

    {
      transform: "matrix(1.1717903,0,0,1.2018361,1950.9508,-111.01958)",
    },
  ];

  const totalTimePerStep = `calc(var(--_time-line) + var(--_step-circle-time) + var(--_step-check-time))`;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getStep", { id });

        if (response.data)
          setStep(
            STEPS.indexOf(
              response.data.service.step
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ç/g, "c")
            ) + 1
          );

        setOwner(response.data.service.owner);
      } catch (err) {
        const msg = err?.response?.data?.msg;

        toast.error(msg);
      }
    })();
  }, []);

  return (
    <>
      <GlobalStyle />
      <StyledHeader>
        <h1>GeoSync</h1>
      </StyledHeader>
      <StyledMain>
        <h2>{owner}</h2>
        <StyledSection>
          <svg viewBox="0 0 1774.4827 112" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-56.636534,-464.00002)">
              {/* Steps */}
              <StepsGroup transform="matrix(0.85339505,0,0,0.83206021,21.666672,92.374979)">
                {stepsData.map((it, index) => (
                  <g
                    transform={it.transform}
                    key={`step-${index}`}
                    style={{
                      "--_time-delay": `calc((${index}) * ${totalTimePerStep})`,
                      "--_step-circle-delay": `calc(var(--_time-delay) + var(--_time-line))`,
                      "--_step-check-delay":
                        "calc(var(--_step-circle-delay) + var(--_step-circle-time))",
                    }}
                    className={index <= step ? "step-animation" : ""}
                  >
                    <Text
                      x={it.textX}
                      y="502.59613"
                      transform="scale(1.0197032, 0.98067751)"
                    >
                      <tspan>{it.label}</tspan>
                    </Text>
                    <circle
                      cx="194.5"
                      cy="542.5"
                      r="32.5"
                      style={
                        index === step
                          ? { "--_color": "orange", strokeWidth: 3 }
                          : {}
                      }
                      className={
                        index === step && animationInProgress
                          ? "in-progress"
                          : ""
                      }
                      onAnimationEnd={
                        index === step
                          ? () => {
                              setAnimationInProgress(true);
                            }
                          : null
                      }
                    />
                    {index === step + 1 ? (
                      <Text
                        x="3"
                        y="555"
                        style={
                          animationInProgress ? { opacity: 1 } : { opacity: 0 }
                        }
                      >
                        <tspan>!</tspan>
                      </Text>
                    ) : index < step ? (
                      <CheckPath d="m 182.65807,544.07762 7.7978,10.12554 15.88607,-23.40614" />
                    ) : null}
                  </g>
                ))}
              </StepsGroup>

              {/* Lines */}
              <LinesGroup transform="matrix(0.85339505,0,0,0.83206021,21.666672,92.374982)">
                {linesData.map((it, index) => (
                  <rect
                    key={`lines-${index}`}
                    width="87.88427"
                    height="5.8589511"
                    x="56.636532"
                    y="539.5705"
                    ry="2.9294755"
                    transform={it.transform}
                  />
                ))}
              </LinesGroup>

              {/* FullLines */}
              <FullLinesGroup transform="matrix(0.85339505,0,0,0.83206021,21.666672,92.374982)">
                {linesData.map((it, index) => (
                  <rect
                    key={`fullLines-${index}`}
                    width="87.88427"
                    height="5.8589511"
                    x="56.636532"
                    y="539.5705"
                    ry="2.9294755"
                    transform={it.transform}
                    style={{
                      "--_time-delay": `calc((${index}) * ${totalTimePerStep})`,
                      ...(index === step &&
                        index < STEPS.length && { "--_color": "orange" }),
                    }}
                    className={index <= step ? "line-animation" : ""}
                  />
                ))}
              </FullLinesGroup>
            </g>
          </svg>
        </StyledSection>
      </StyledMain>
      <footer>
        <h2>anexos</h2>
      </footer>
    </>
  );
};

export default TrackingService;
