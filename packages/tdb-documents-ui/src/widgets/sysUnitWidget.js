import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import * as CONST from "../constants"
import { TDBLabel } from "../components/LabelComponent"
 
export const TDBSysUnit = ({ id, name, value, required, mode, hideFieldLabel, className, comment, label }) => {
  if(mode === CONST.VIEW && !value) return <div className={`tdb__${name}__hidden`}/>


  return <Stack direction="horizontal" className="mb-3">
    <TDBLabel name={label ? label : name} 
      required={required} 
      className={"tdb__label__width"}
      hideFieldLabel={hideFieldLabel}
      comment={comment} 
      id={id}/>
   
    <TDBLabel name={label ? label : name} 
      hideFieldLabel={false}
      className={className}
      id={id}/>

    
  </Stack>

}