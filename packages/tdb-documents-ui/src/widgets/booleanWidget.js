import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import * as CONST from "../constants"
import InputGroup from 'react-bootstrap/InputGroup';
import { TDBLabel } from "../components/LabelComponent"

// widget displays input boxes 
export const TDBBoolean = ({ id, name, value, required, mode, onChange, comment, label, hideFieldLabel }) => {
  
  const [checked, setChecked] = useState(mode !== CONST.CREATE ? value : false)

  if(mode === CONST.VIEW && !value) return <div className={`tdb__${name}__hidden`}/>
  
  function handleClick() {
    setChecked(!checked)
    onChange(!checked)
  }
  return <InputGroup className="mb-3">
    <TDBLabel name={label ? label : name} 
      required={required} 
      comment={comment} 
      hideFieldLabel={hideFieldLabel}
      className={"tdb__label__width"}/>
    <Stack direction={"horizontal"} gap={2}>
        {checked && <input type="checkbox" id={id} name={name} checked onChange={handleClick}/>}
        {!checked && <input type="checkbox" id={id} name={name} onChange={handleClick}/>}
        <span className="text-light">{name}</span>
    </Stack>
  </InputGroup>
}