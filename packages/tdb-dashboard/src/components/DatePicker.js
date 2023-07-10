import React, {useState,useEffect} from "react"
import DatePicker from 'react-datetime-picker';

export const DatePickerComponent = ({currentDay, setStartTime}) => {

    const [selected, setCurrentDate] = useState(currentDay || new Date())

    function handleOnChange(data) { 
      setCurrentDate(data)
        // 2023-05-10T10:39:09.865Z
        // convert to ISO timeStamp 
      if(setStartTime)setStartTime(data)
    }

    useEffect(()=>{
      setCurrentDate(currentDay)
    },[currentDay])
 
    return <DatePicker onChange={handleOnChange} 
            value={selected} 
            clearIcon={null}
            format="dd/MM/yyyy"/>
}