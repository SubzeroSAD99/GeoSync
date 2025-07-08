import React, { useEffect, useState } from "react";
import {
  CalendarBody,
  CalendarCell,
  CalendarContainer,
  CalendarDays,
  CalendarEventContainer,
  CalendarHeader,
  StyledButton,
} from "./Calendar.styled.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import api from "../../../utils/api.mjs";
import { toast } from "react-toastify";

const Calendar = ({ meter, setInfo }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [events, setEvents] = useState({});
  const { setEmployee } = useAuth();
  const navigate = useNavigate();

  const goToPrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const goToPrevYear = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1)
    );
  };

  const goToNextYear = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1)
    );
  };

  const getDaysArray = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();

    const startWeekDay = firstDayOfMonth.getDay(); // 0..6

    const days = [];

    // Dias vazios antes do dia 1
    for (let i = 0; i < startWeekDay; i++) {
      days.push(null);
    }

    // Dias do mes
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const redirectSchedule = (day) => {
    navigate(
      `/servicos/cadastrar?measurementDate=${String(day).padStart(
        2,
        "0"
      )}-${String(month + 1).padStart(2, "0")}-${year}`
    );
  };

  const days = getDaysArray();

  const viewSchedule = async (day) => {
    try {
      const response = await api.post("/service/getAllByDate", {
        month: month + 1,
        year,
        day,
        meter,
      });

      if (!response.data) return;

      console.log(response.data.services);
      setInfo(response.data.services);
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg) toast.error(msg);

      if (err.status === 401) setEmployee(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAllOfMonth", {
          month: month + 1,
          year,
          meter,
        });

        if (!response.data) return;

        const nextEvents = response.data.services.reduce((acc, it) => {
          const day = it.measurementDate.slice(-2);
          acc[day] = it;
          return acc;
        }, {});

        setEvents(nextEvents);
      } catch (err) {
        const msg = err.response?.data?.msg;

        if (msg) toast.error(msg);

        if (err.status === 401) setEmployee(null);
      }
    })();
  }, [month, year]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <div>
          <StyledButton onClick={goToPrevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </StyledButton>
          <h2>
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <StyledButton onClick={goToNextMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </StyledButton>
        </div>
        <h3>{meter.split(" ")[1]}</h3>
      </CalendarHeader>
      <CalendarDays>
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </CalendarDays>
      <CalendarBody>
        {days.map((d, index) => (
          <CalendarCell key={index} className={!d && "empty-cell"}>
            <StyledButton onClick={() => redirectSchedule(d)}>
              {d ? String(d).padStart(2, "0") : ""}
            </StyledButton>

            {events[String(d).padStart(2, "0")] && (
              <CalendarEventContainer>
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ cursor: "pointer" }}
                  onClick={() => viewSchedule(d)}
                />
              </CalendarEventContainer>
            )}
          </CalendarCell>
        ))}
      </CalendarBody>
    </CalendarContainer>
  );
};

export default Calendar;
