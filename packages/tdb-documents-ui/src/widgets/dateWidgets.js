import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Stack from "react-bootstrap/Stack"
import { VIEW } from "../constants"
import { checkIfReadOnly } from "../utils"
import { TDBLabel } from "../components/LabelComponent"

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(s)
  //return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

// get default value to pass to date-picker
function fetchDateValue (value) {
  if(value) return parseISOString(value)
  return null
}

//XSD_DATE_TIME
export const TDBDateTime = ({ id, name, value, required, isKey, mode, onChange, comment, label, hideFieldLabel }) => {
  const [selected, setSelected] = useState(fetchDateValue(value));

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>

  function handleOnChange(data) { 
    setSelected(data)
    // convert to ISO timeStamp 
    if(data) onChange(data.toISOString())
  }

  //"2023-03-15T08:44:00.000Z"
  return <Stack direction="horizontal" className="mb-3">
    <TDBLabel name={label ? label : name} 
      required={required} 
      hideFieldLabel={hideFieldLabel}
      isKey={isKey}
      comment={comment} 
      className={"tdb__label__width"}/>
    <DateTimePicker
      amPmAriaLabel="Select AM/PM"
      id={id}
      disabled={checkIfReadOnly(mode, selected, isKey)}
      calendarAriaLabel="Toggle calendar"
      clearAriaLabel="Clear value"
      dayAriaLabel="Day"
      hourAriaLabel="Hour"
      maxDetail="second"
      minuteAriaLabel="Minute"
      monthAriaLabel="Month"
      nativeInputAriaLabel="Date and time"
      required={required}
      onChange={handleOnChange}
      secondAriaLabel="Second"
      disableClock={true}
      value={selected}
      yearAriaLabel="Year"
    />
  </Stack>
}


//XSD_DATE
export const TDBDate = ({ id, name, value, required, isKey, mode, onChange, comment, hideFieldLabel }) => {
  const [selected, setSelected] = useState(fetchDateValue(value));

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>

  function handleOnChange(data) { 
    setSelected(data)
    // convert to ISO timeStamp 
    if(data) onChange(data.toISOString())
  }

  return <Stack direction="horizontal" className="mb-3">
    <TDBLabel name={name} 
      hideFieldLabel={hideFieldLabel}
      required={required} 
      isKey={isKey}
      comment={comment} 
      className={"tdb__label__width"}/>
    <DatePicker onChange={handleOnChange} 
      value={selected} 
      disabled={checkIfReadOnly(mode, selected, isKey)}
      format="dd/MM/yyyy"/>
  </Stack>
}