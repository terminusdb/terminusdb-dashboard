import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import { VIEW, LABEL } from "../constants" 
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"

// construct options to be supported by react-select
function constructOptionsFromArray(options) {
  let constructed = []
  options.map ( opts => {
    constructed.push(
      // default color "#adb5bd" 
      { value: opts, label: opts, color: "#adb5bd" }
    )
  })
  return constructed
}

// construct options to be supported by react-select
function constructOptionsFromDocumentation(options) {
  let constructed = []
  for(let opts in options){
    constructed.push(
      // default color "#adb5bd" 
      { value: opts, label: options[opts][LABEL], color: "#adb5bd" }
    )
  }
  return constructed
}

// construct options to be supported by react-select
function constructOptionsBasedOnDocumentation(options) {
  if(Array.isArray(options)) return constructOptionsFromArray(options) 
  else {
    // documentation might be defined in schema if not array 
    return constructOptionsFromDocumentation(options)
  }
}


// widget displays enum widget
export const TDBEnum = ({ id, options, name, value, required, mode, enumDocumentClass, hideFieldLabel, onChange, label }) => {

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>
  if(mode === VIEW && value) return <Stack direction="horizontal"  className="tdb__enum__input">
    <TDBLabel name={label ? label : name} 
      hideFieldLabel={hideFieldLabel}
      required={required} 
      id={id}/>
    <div className="w-100">
      {value}
    </div>
  </Stack>

  let constructedOpts= constructOptionsBasedOnDocumentation(options) 

  return <Stack direction="horizontal"  className="tdb__enum__input">
    <TDBLabel name={label ? label : name} required={required} hideFieldLabel={hideFieldLabel} id={id}/>
    <div className="w-100">
      <SelectComponent options={constructedOpts} 
        placeholder={`Select ${enumDocumentClass} ...`}
        value={getDefaultValue(constructedOpts, value)}
        id={id}
        mode={mode}
        onChange={onChange}/>
    </div>
  </Stack>
}