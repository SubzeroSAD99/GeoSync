import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { DateContainer, StyledInput } from "./InputDate.styled.mjs";

const CustomInput = React.forwardRef(({ value }, ref) => {
  const handleInput = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);

    if (v.length >= 5) {
      v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (v.length >= 3) {
      v = v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    e.target.value = v;
  };
  return (
    <StyledInput
      type="text"
      id="measurementDate"
      name="measurementDate"
      ref={ref}
      defaultValue={value || ""}
      placeholder="dd/mm/yyyy"
      onChange={handleInput}
    />
  );
});

const InputDate = ({ value }) => {
  const [date, setDate] = useState(value || "");

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  return (
    <DateContainer>
      <label htmlFor="measurementDate">Data</label>
      <Flatpickr
        value={date}
        onChange={(selectedDates) => {
          setDate(selectedDates[0]);
        }}
        options={{
          dateFormat: "d/m/Y",
          locale: Portuguese,
          allowInput: true,
        }}
        render={({ value, ...props }, ref) => (
          <CustomInput {...props} value={value} ref={ref} />
        )}
      />
    </DateContainer>
  );
};

export default InputDate;
