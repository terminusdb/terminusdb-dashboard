import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import { VIEW } from "../constants"
import { SelectComponent  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"

// construct options to be supported by react-select
function constructOptions(options) {
  let constructed = []
  options.map ( opts => {
    constructed.push(
      // default color "#adb5bd"
      {value: opts, label: opts, color: "#adb5bd"}
    )
  } )
  return constructed
}

// sends default value from options
function getDefaultValue(options, value) {
  let extractedOption=options.filter(opts => opts.value === value)
  return extractedOption
}

// widget displays enum widget
export const TDBEnum = ({ id, options, name, value, required, mode, enumDocumentClass, className, onChange, label }) => {

  if(mode === VIEW && !value) return <div className={`tdb__${name}__hidden`}/>
  if(mode === VIEW && value) return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={label ? label : name} required={required} id={id}/>
    <div className="w-100">
      {value}
    </div>
  </Stack>

  let constructedOpts= constructOptions(options)

  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={label ? label : name} required={required} id={id}/>
    <div className="w-100">
      <SelectComponent options={constructedOpts} 
        placeholder={`Select ${enumDocumentClass} ...`}
        value={getDefaultValue(constructedOpts, value)}
        id={id}
        onChange={onChange}/>
    </div>
  </Stack>
}