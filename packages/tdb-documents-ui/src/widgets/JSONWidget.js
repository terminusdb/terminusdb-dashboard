import React, { useState } from "react"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import Stack from "react-bootstrap/Stack"
import * as CONST from "../constants"
import { TDBLabel } from "../components/LabelComponent"

/*{
  "kitty": "jose"
}*/

// widget displays input boxes 
export const TDBJSON = ({ id, name, value, required, mode, hideFieldLabel, onChange, comment, label }) => {

  if(mode === CONST.VIEW && !value) return <div className={`tdb__${name}__hidden`}/>

  function handleInput (data) {
    if(data.hasOwnProperty("jsObject") && Object.keys(data.jsObject).length > 0) {
      onChange(data.jsObject)
    }
  } 

  let displayJSON=value ? value : {}
  let readOnly= (mode === CONST.VIEW) ? true : false

  return <Stack direction="horizontal">
    <TDBLabel name={label ? label : name} 
      required={required} 
      hideFieldLabel={hideFieldLabel}
      comment={comment} 
      id={id}/>
    <JSONInput
      id          = {id}
      locale      = { locale }
      height      = {CONST.JSON_EDITOR_HEIGHT}
      width       = {CONST.JSON_EDITOR_WIDTH}
      viewOnly    = {readOnly}
      placeholder = {displayJSON}
      onBlur      = {handleInput}/>
  </Stack>
}