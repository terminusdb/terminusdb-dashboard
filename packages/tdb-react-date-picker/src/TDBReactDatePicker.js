import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

import React, { useState } from "react"
//import {useWorker} from "@terminusdb-live/react-worker"


export const  TDBReactDatePicker = (props) =>{
    const startData= props.startData || []
    const config=props.config || {}

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    //const {onChange,error,loading,dataProvider} = useWorker(startData,props.onLoad)
    return <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
    />
    

    //return <div>LOADING</div>
 }


