import React, { useState, useEffect } from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"
import { TDBSubDocument } from "./subDocumentWidget"
import { extractPropertyDocumentation } from "../helpers/widgetHelper"

function getChoices(documentFrame, property) {
  let options = []
  // documentFrame[property] will have choices
  documentFrame[property].map ( docs => {
    let documentChoice=docs[CONST.CLASS]
    options.push({ value: documentChoice, label: documentChoice, color: "#adb5bd" })
  })
  return options
}

const DisplaySelectedSubDocument = ({ props, selected, args }) => {
  let { reference, mode, fullFrame } = args
  const [extractedData, setExtractedData] = useState(props.formData ? props.formData : {})

  if(!selected) return <div/>

  function handleChoiceDocumentChange (data, fieldName) {
    setExtractedData(data)
    if(props.onChange) props.onChange(data)
    //console.log("onChange", data, fieldName)
  } 

  let extracted = util.availableInReference (reference, selected) ? reference[selected] : {}
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  let config = {
    required: props.required,
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: extractedData
  }
  //{ extracted, expanded, comment, props, hideFieldLabel, mode, linked_to, propertyDocumentation }
  return <Card.Body>
    <TDBSubDocument extracted={extracted} 
      //id={props.idSchema["$id"]}
      expanded={true}
      //comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      hideFieldLabel={true}
      propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={selected}
      props={config}/>
  </Card.Body>
}

export const TDBChoiceDocuments = ({ args, props, property }) => {
  
  const [selected, setSelected]=useState(props.formData ? props.formData["@type"] : false)
  let { documentFrame } = args

  function handleChoiceSelect(chosen) {
    if(chosen) setSelected(chosen)
  }

  let choices = getChoices(documentFrame, property)

  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={property} required={props.required} id={props.idSchema["$id"]}/>
    <Card bg="secondary" className="w-100 p-3">
      <SelectComponent options={choices} 
        placeholder={`Select choices ...`}
        value={getDefaultValue(choices, selected)}
        id={props.idSchema["$id"]}
        onChange={handleChoiceSelect}/>
      <DisplaySelectedSubDocument props={props} 
        selected={selected} 
        args={args} />
    </Card>
  </Stack>
}