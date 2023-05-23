import React, {useState} from "react"
import DatePicker from 'react-datetime-picker';

export const DatePickerComponent = ({currentDay, setStartTime}) => {

    const [selected, onDateChange] = useState(currentDay || new Date())

    function handleOnChange(data) { 
        onDateChange(data)
        // 2023-05-10T10:39:09.865Z
        // convert to ISO timeStamp 
      console.log(data.toISOString())
      if(setStartTime)setStartTime(data)
      }
 
    return <DatePicker onChange={handleOnChange} 
            value={selected} 
            clearIcon={null}
            format="dd/MM/yyyy"/>
}