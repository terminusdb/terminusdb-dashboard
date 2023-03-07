import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';



export const DateTimeField = ({ onChange, mode, required }) => {
  const [value, onChange] = useState(null);

  function handleOnChange(data) { 
    onChange(data)
    // convert to ISO timeStamp 
    if(data) props.onChange(data.toISOString())
  }

  //"2023-03-15T08:44:00.000Z"
  return <div className="d-flex mb-3 w-100">
    <label className="control-label">{props.name}</label>
    <DateTimePicker
      amPmAriaLabel="Select AM/PM"
      calendarAriaLabel="Toggle calendar"
      clearAriaLabel="Clear value"
      dayAriaLabel="Day"
      hourAriaLabel="Hour"
      maxDetail="second"
      minuteAriaLabel="Minute"
      monthAriaLabel="Month"
      nativeInputAriaLabel="Date and time"
      required={props.required}
      onChange={handleOnChange}
      secondAriaLabel="Second"
      value={value}
      yearAriaLabel="Year"
    />
  </div>
}