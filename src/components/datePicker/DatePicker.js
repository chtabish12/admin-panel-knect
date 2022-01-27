import React, { useState } from "react";
import { DateRangePicker } from "materialui-daterange-picker";
import "./DatePicker.css";

const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const toggle = () => setOpen(!open);
  return (
    <>
      <button className="date-button" onClick={toggle}>
        Date filter
        <DateRangePicker
          open={open}
          toggle={toggle}
          onChange={(range) => setDateRange(range)}
        />
      </button>
    </>
  );
};

export default DatePicker;
