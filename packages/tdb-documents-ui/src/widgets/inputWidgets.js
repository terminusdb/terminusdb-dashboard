import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import { VIEW, CREATE } from "../constants"
import { checkIfReadOnly } from "../utils"
import { XSD_ANY_URI, XSD_STRING, NUMBER_ARRAY, XSD_LANGUAGE  } from "../dataType.constants"
import { TDBLabel } from "../components/LabelComponent"
import { HiddenInputWidgets } from "./hiddenWidgets"

/*
 * 
 * @param {*} data - filled data of a string field
 * @returns row height to display in textareas for xsd:string data type field 
 */
export function getRowHeight(data) {
  let minRows=2
  if(!data) return minRows
  let rows = data.split(/\r\n|\r|\n/).length, maxRows=10
  return rows > maxRows ? maxRows : rows < minRows ? minRows : rows
}

// widget displays input boxes 
export const TDBInput = ({ id, name, value, required, isKey, hideFieldLabel, mode, placeholder, className, onChange, comment, label }) => {
  // use this input Value to indentify if value was filled or not in EDIT mode 
  // input Value is used to check if peoperty isKey in EDIT mode so as to stop user 
  // from altering the value
  const [inputValue, setInputValue] = useState(value)

  if(mode === VIEW && !value) {
    if(className === "tdb__doc__input tdb__diff__original__deleted" || 
    className === "tdb__doc__input tdb__diff__changed__deleted" )
      return <HiddenInputWidgets name={label ? label : name} 
        required={required}
        comment={comment} 
        isKey={isKey} 
        className={className}
        id={id} 
        hideFieldLabel={hideFieldLabel}
      />
    return <div className={`tdb__${name}__hidden`}/>
  }
  

  return <Stack direction="horizontal">
    <TDBLabel name={label ? label : name} 
      required={required} 
      comment={comment} 
      isKey={isKey}
      id={id} 
      hideFieldLabel={hideFieldLabel}/>
    {/** any URI */}
    {placeholder === XSD_ANY_URI &&  <input type="url"
      id={id}   
      name={id}
      className={`${className} tdb-number rounded w-100 text-white`}
      value={value}
      //key={inputKey}
      readOnly={checkIfReadOnly(mode, inputValue, isKey)}
      placeholder={placeholder}
      required={required}
      onChange={ (event) => onChange(event.target.value, name) } />}
    {/** only allow numbers */} 
    {NUMBER_ARRAY.includes(placeholder) &&  <input type="number"
      step="any"
      id={id}   
      name={id}
      pattern="[0-9]*"
      className={`${className} tdb-number rounded w-100`}
      value={value}
      //key={inputKey}
      readOnly={checkIfReadOnly(mode, inputValue, isKey)}
      placeholder={placeholder}
      required={required}
      onChange={ (event) => onChange(event.target.value, name) } />}
    {/** display textearea for XSD_STRING */}
    {!NUMBER_ARRAY.includes(placeholder) && placeholder !== XSD_ANY_URI && <textarea type="text"
      id={id}
      name={id}
      //key={inputKey}
      className={`${className} rounded w-100`}
      value={value} 
      placeholder={placeholder}
      required={required}
      rows={mode !== CREATE ? getRowHeight(value) : 2}
      readOnly={checkIfReadOnly(mode, inputValue, isKey)}
      onChange={ (event) => onChange(event.target.value, name) } />}
  </Stack>
}