import React, { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import {
  InfoContainer,
  StyledButton,
  StyledFontAwesome,
  StyledTable,
  StyledTd,
  StyledTh,
  TableContainer,
} from "./ScheduleService.styled.mjs";
import {
  faCheck,
  faLocationDot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import api from "@utils/api.mjs";
import { toast } from "react-toastify";
import { useAuth } from "@contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScheduleServices = () => {
  const [eventsByTopographer, setEventsByTopographer] = useState({});
  const [selected, setSelected] = useState({ day: "", topographer: "" });
  const [topographers, setTopographers] = useState([]);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/employee/getTopographers");

        if (response.data) setTopographers(response.data.topographers);
      } catch (err) {
        const msg = err?.response?.data?.msg;

        if (err.status === 401) setUserLogged(null);

        toast.error(msg);
      }
    })();
  }, []);

  const setEventsFor = (topographer) => (newEvents) => {
    setEventsByTopographer((prev) => ({
      ...prev,
      [topographer.id]: newEvents,
    }));
  };

  const confirmService = async (id) => {
    const toastId = toast.loading("Confirmando agendamento...");

    try {
      const response = await api.post("/service/confirm", { id });

      if (response.data) {
        setEventsByTopographer((prev) => {
          const { topographer, day } = selected;
          const dayEvents = prev[topographer]?.[day] || [];
          const updated = dayEvents.map((item) =>
            item.id === id ? { ...item, confirmed: true } : item
          );
          return {
            ...prev,
            [topographer]: {
              ...prev[topographer],
              [day]: updated,
            },
          };
        });
        if (response.data?.warn)
          toast.update(toastId, {
            render: response.data.msg,
            type: "warn",
            isLoading: false,
            autoClose: 3000,
          });
        else
          toast.update(toastId, {
            render: response.data.msg,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
      }
    } catch (err) {
      const msg = err?.response?.data?.msg;

      if (err.status === 401) setUserLogged(null);

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <section style={{ gap: "40px" }}>
      {selected.day ? (
        <InfoContainer
          onClick={() => setSelected({ day: "", topographer: "" })}
        >
          <TableContainer onClick={(e) => e.stopPropagation()}>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Tipo de Serviço</StyledTh>
                  <StyledTh>Proprietário</StyledTh>
                  <StyledTh>Contratante</StyledTh>
                  <StyledTh>Guia</StyledTh>
                  <StyledTh>Municipio / Local</StyledTh>
                  <StyledTh>Horario</StyledTh>
                  <StyledTh>Obs</StyledTh>
                  <StyledTh>Localização</StyledTh>
                  <StyledTh>Confirmar</StyledTh>
                </tr>
              </thead>
              <tbody>
                {eventsByTopographer[selected.topographer][selected.day].map(
                  ({
                    id,
                    serviceType,
                    owner,
                    contractor,
                    guide,
                    municipality,
                    locality,
                    measurementHour,
                    internalObs,
                    location,
                    confirmed,
                  }) => (
                    <tr key={id}>
                      <StyledTd>
                        {serviceType.map((it) => (
                          <p style={{ padding: "2px" }}>{it}</p>
                        ))}
                      </StyledTd>
                      <StyledTd>{owner}</StyledTd>
                      <StyledTd>{contractor}</StyledTd>
                      <StyledTd>{guide}</StyledTd>
                      <StyledTd>
                        {municipality.map((it, index) => (
                          <p style={{ padding: "2px" }}>
                            {it}
                            {locality[index] && ` / ${locality[index]}`}
                          </p>
                        ))}
                      </StyledTd>
                      <StyledTd>{measurementHour}</StyledTd>
                      <StyledTd>{internalObs}</StyledTd>
                      <StyledTd>
                        {location ? (
                          <a
                            href={location}
                            target="_blank"
                            style={{
                              backgroundColor: "transparent",
                              boxShadow: "none",
                              color: "var(--highlight-main-color)",
                            }}
                          >
                            <FontAwesomeIcon icon={faLocationDot} />
                          </a>
                        ) : null}
                      </StyledTd>
                      <StyledTd>
                        {!confirmed ? (
                          <StyledButton
                            onClick={() => {
                              confirmService(id);
                            }}
                          >
                            <StyledFontAwesome icon={faSquareCheck} />
                          </StyledButton>
                        ) : (
                          <StyledFontAwesome icon={faCheck} />
                        )}
                      </StyledTd>
                    </tr>
                  )
                )}
              </tbody>
            </StyledTable>
          </TableContainer>
        </InfoContainer>
      ) : (
        <></>
      )}
      {topographers.map((topographer) => (
        <Calendar
          key={topographer.id}
          topographer={topographer}
          events={eventsByTopographer[topographer.id] || {}}
          setEvents={setEventsFor(topographer)}
          setViewScheduleDay={(day) =>
            setSelected({ day, topographer: topographer.id })
          }
        />
      ))}
    </section>
  );
};

export default ScheduleServices;
