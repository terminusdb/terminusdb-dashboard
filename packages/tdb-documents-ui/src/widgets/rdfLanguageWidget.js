import React, { useState } from "react"
import Stack from "react-bootstrap/Stack"
import * as CONST from "../constants"
import { XSD_STRING } from "../dataType.constants"
import Card from "react-bootstrap/Card"
import { TDBLabel } from "../components/LabelComponent"
import { TDBInput } from "./inputWidgets"

function extractValue(mode, formData) {
  if(mode === CONST.EDIT && formData) return formData
  else return {}
}


/**
 * 
 * if property rdf:language display 2 fields language & value
 */
export const TDBRDFLanguage = ({ name, formData, mode, comment, id, className, onChange, required, hideFieldLabel }) => {
  
  const [rdfData, setRDFData] = useState(extractValue(mode, formData))

  function handleChange(data, fieldName) {
    let tempRDFData = rdfData
    tempRDFData[fieldName]=data
    setRDFData(tempRDFData)
    if(onChange) onChange(tempRDFData)
  } 

  return <Stack direction="horizontal" className="mb-3">
    <TDBLabel name={name} 
      required={required} 
      comment={comment} 
      className={"tdb__label__width"} 
      id={id} 
      hideFieldLabel={hideFieldLabel}/>

    <Card bg="secondary" className="w-100">
      <Card.Body>
        {/** language */}
        <TDBInput name={CONST.RDF_LANGUAGE} 
          value={ formData && formData.hasOwnProperty(CONST.RDF_LANGUAGE) ? formData[CONST.RDF_LANGUAGE] : "" } 
          label={CONST.RDF_LANGUAGE_LABEL}
          mode={mode} 
          id={`${CONST.RDF_LANGUAGE_LABEL}_${id}`}
          placeholder={XSD_STRING} 
          className={className} 
          onChange={handleChange}/>
        {/** value */}
        <TDBInput name={CONST.RDF_VALUE} 
          value={ formData && formData.hasOwnProperty(CONST.RDF_VALUE) ? formData[CONST.RDF_VALUE] : "" } 
          label={CONST.RDF_VALUE_LABEL}
          mode={mode} 
          id={`${CONST.RDF_VALUE_LABEL}_${id}`}
          placeholder={XSD_STRING} 
          className={className} 
          onChange={handleChange}/>
      </Card.Body>
    </Card>
  </Stack>
}

