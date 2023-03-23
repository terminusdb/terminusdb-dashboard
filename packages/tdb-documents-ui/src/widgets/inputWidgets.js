import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import { VIEW } from "../constants"
import { XSD_STRING  } from "../dataType.constants"
import { TDBLabel } from "../components/LabelComponent"

// widget displays input boxes 
export const TDBInput = ({ id, name, value, required, hideFieldLabel, mode, placeholder, className, onChange, comment, label }) => {

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>

  return <Stack direction="horizontal">
    <TDBLabel name={label ? label : name} 
      required={required} 
      comment={comment} 
      id={id} 
      hideFieldLabel={hideFieldLabel}/>
    {/** only allow numbers */}
    {placeholder !== XSD_STRING &&  <input type="number"
      id={id}   
      name={id}
      pattern="[0-9]*"
      className={`${className} rounded w-100 mb-3`}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={ (event) => onChange(event.target.value, name) } />}
    {/** display textearea for XSD_STRING */}
    {placeholder === XSD_STRING &&  <textarea type="text"
      id={id}
      name={id}
      className={`${className} rounded w-100 mb-3`}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={ (event) => onChange(event.target.value, name) } />}
  </Stack>
}