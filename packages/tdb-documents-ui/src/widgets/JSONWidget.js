import React, { useState } from "react"
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import Stack from "react-bootstrap/Stack"
import * as CONST from "../constants"
import { TDBLabel } from "../components/LabelComponent"
import { CompareDiffViewerWidget } from "./compareDiffViewerWidget"

// widget displays input boxes 
export const TDBJSON = ({ id, name, value, required, mode, hideFieldLabel, onChange, comment, label, className, compareFormData, index }) => {

  if(mode === CONST.VIEW && !value) return <div className={`tdb__${name}__hidden`}/>
  if(mode === CONST.VIEW && !Object.keys(value).length) return <div className={`tdb__${name}__hidden`}/>

  if(className === "tdb__doc__input tdb__diff__original" || 
    className === "tdb__doc__input tdb__diff__changed") {
      
    return <Stack direction="horizontal" className="mb-3">
      <TDBLabel name={label ? label : name} 
        required={required} 
        hideFieldLabel={hideFieldLabel}
        comment={comment} 
        id={id}/>
      <CompareDiffViewerWidget
        formData={JSON.stringify(value, null, 2)} 
        compareFormData={compareFormData.hasOwnProperty(name) ? index ? JSON.stringify(compareFormData[name][index], null, 2) : JSON.stringify(compareFormData[name], null, 2) : "" } 
        name={name} 
        classNameController={className === "tdb__doc__input tdb__diff__original" ? "tdb__markdown_diff__original" : "tdb__markdown_diff__changed"}
        index={index}
        className={className}
      />
    </Stack>
  }

  function handleInput (data) {
    if(data.hasOwnProperty("jsObject") && Object.keys(data.jsObject).length > 0) {
      onChange(data.jsObject)
    }
  } 

  let displayJSON=value ? value : {}
  let readOnly= (mode === CONST.VIEW) ? true : false

  return <Stack direction="horizontal" className="mb-3">
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
      style       = {{ container: { borderRadius: "4px" }}}
      onBlur      = {handleInput}/>
  </Stack>
}