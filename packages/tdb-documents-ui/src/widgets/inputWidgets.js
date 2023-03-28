import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import { VIEW } from "../constants"
import { checkIfReadOnly } from "../utils"
import { XSD_STRING  } from "../dataType.constants"
import { TDBLabel } from "../components/LabelComponent"


// widget displays input boxes 
export const TDBInput = ({ id, name, value, required, isKey, hideFieldLabel, mode, placeholder, className, onChange, comment, label }) => {
  // use this input Value to indentify if value was filled or not in EDIT mode 
  // input Value is used to check if peoperty isKey in EDIT mode so as to stop user 
  // from altering the value
  const [inputValue, setInputValue] = useState(value)

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>

  return <Stack direction="horizontal">
    <TDBLabel name={label ? label : name} 
      required={required} 
      comment={comment} 
      isKey={isKey}
      id={id} 
      hideFieldLabel={hideFieldLabel}/>
    {/** only allow numbers */}
    {placeholder !== XSD_STRING &&  <input type="number"
      id={id}   
      name={id}
      pattern="[0-9]*"
      className={`${className} rounded w-100 mb-3`}
      value={value}
      //key={inputKey}
      readOnly={checkIfReadOnly(mode, inputValue, isKey)}
      placeholder={placeholder}
      required={required}
      onChange={ (event) => onChange(event.target.value, name) } />}
    {/** display textearea for XSD_STRING */}
    {placeholder === XSD_STRING &&  <textarea type="text"
      id={id}
      name={id}
      //key={inputKey}
      className={`${className} rounded w-100 mb-3`}
      value={value}
      placeholder={placeholder}
      required={required}
      readOnly={checkIfReadOnly(mode, inputValue, isKey)}
      onChange={ (event) => onChange(event.target.value, name) } />}
  </Stack>
}