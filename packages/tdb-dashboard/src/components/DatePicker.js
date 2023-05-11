

import React, {useState} from "react"
//import 'react-dates/initialize'
//import 'react-dates/lib/css/_datepicker.css'
//import {DateRangePicker, isInclusivelyBeforeDay, SingleDatePicker} from "react-dates"
//import {TimeTravelControl} from "../hooks/TimeTravelControl"
import Calendar from 'react-calendar';

export const DatePicker = ({currentDay, setStartTime}) => {

    // const {
    //     currentDay,
    //     setStartTime
    // } = TimeTravelControl() 

    const [value, onChange] = useState(new Date());
  //  const [selectedDay, onDateChange] = useState(currentDay)
 //   const [focused,onFocusChange] = useState(false)

    return <Calendar onChange={onChange} value={value} /> /*<SingleDatePicker
        dark
        showDefaultInputIcon
        date={selectedDay}
        onDateChange={(selectedDay)=>{
            onDateChange(selectedDay)
            setStartTime(selectedDay.clone())}}
        focused={focused}
        onFocusChange={({focused})=>{
            onFocusChange(focused)
        }}
        numberOfMonths={1}
        displayFormat='DD-MM-YYYY'
        placeholder='dd-mm-yyyy'
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
     />*/
}