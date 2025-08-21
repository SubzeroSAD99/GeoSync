import React, { useEffect, useState } from "react";
import {
  Circle,
  GlobalStyle,
  ListContainer,
  ListItem,
  ServiceContainer,
  StepLabelContainer,
  StyledHeader,
  StyledMain,
  StyledSection,
  Title,
  TitleContainer,
} from "./TrackingService.styled.mjs";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";

const TrackingService = ({ id }) => {
  const [service, setService] = useState({});

  const STEPS = [
    "agendado",
    "medido",
    "processado",
    "confecção",
    "impresso",
    "concluido",
    "entrega",
    "retirada",
    "finalizado",
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getStep", { id });

        if (response.data) {
          setService(response.data.service);
        }
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
        <TitleContainer>
          <img src="/img/logo.webp" alt="Logo Topodatum" />
          <div>
            <Title>GeoSync</Title>
            <span>Topodatum Topografia LTDA</span>
          </div>
        </TitleContainer>
      </StyledHeader>
      <StyledMain>
        <h2>{service.owner}</h2>

        {service?.serviceType?.map((it, idx) => {
          const step = STEPS.indexOf(service.step[idx]) + 1;

          return (
            <StyledSection key={it + idx}>
              <ServiceContainer>
                <h3>{it}</h3>
              </ServiceContainer>
              <ListContainer
                style={{
                  "--_step": step === STEPS.length ? step : step + 1,
                  "--_gradient-final-color1":
                    step === STEPS.length ? "" : "rgba(230, 161, 71, 1)",
                  "--_gradient-final-color2":
                    step === STEPS.length ? "" : " rgba(202, 115, 0, 1)",
                }}
              >
                {STEPS.map((it, index) => (
                  <ListItem
                    key={it + index}
                    className={
                      step > index
                        ? "active"
                        : index === step
                        ? "active end-frame"
                        : null
                    }
                    style={{
                      "--circle-delay": `calc((var(--_time-line) / ${
                        STEPS.length
                      }) * ${index + 1})`,
                    }}
                  >
                    <Circle>
                      <svg
                        viewBox="0 0 100 100"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="white"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 55 L40 75 L80 30" />
                      </svg>
                      <span>!</span>
                    </Circle>
                    <StepLabelContainer>
                      <span>{it}</span>
                    </StepLabelContainer>
                  </ListItem>
                ))}
              </ListContainer>
            </StyledSection>
          );
        })}
      </StyledMain>
      <footer>
        <h2>anexos</h2>
      </footer>
    </>
  );
};

export default TrackingService;
