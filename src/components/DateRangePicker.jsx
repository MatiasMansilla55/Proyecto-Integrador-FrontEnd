import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ setStartDate, setEndDate }) => {
  const [startDate, localSetStartDate] = useState(null);
  const [endDate, localSetEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    localSetStartDate(date);
    setStartDate(date); 
  };

  const handleEndDateChange = (date) => {
    localSetEndDate(date);
    setEndDate(date); 
  };

  return (
    <div className="date-range-picker row">
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <label htmlFor="startDate" className="form-label"></label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control date-picker-check-in p-2 ms-0 ms-md-2 mb-2 mb-md-0"
          placeholderText="Check-in"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <label htmlFor="endDate" className="form-label"></label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control date-picker-check-out p-2"
          placeholderText="Check-out"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
