import React, { useState, useEffect } from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"
import { TDBSubDocument } from "./subDocumentWidget"
import { extractPropertyDocumentation } from "../helpers/widgetHelper"

const DisplaySelectedSubDocument = ({ props, selected, args, id, choiceSubDocumentData, setChoiceSubDocumentData }) => {
  let { reference, mode, fullFrame } = args
  
  if(!selected) return <div/>

  function handleChoiceDocumentChange (data, fieldName) {
    //setExtractedData(data)
    if(props.onChange) props.onChange(data)
    //console.log("onChange", data, fieldName)
  } 

  let extracted = util.availableInReference (reference, selected) ? reference[selected] : {}
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  let config = {
    required: props.required,
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: choiceSubDocumentData
  } 
  //{ extracted, expanded, comment, props, hideFieldLabel, mode, linked_to, propertyDocumentation }
  return <Card.Body>
    <TDBSubDocument extracted={extracted} 
      //id={props.idSchema["$id"]}
      id={id}
      expanded={true}
      subDocumentData={choiceSubDocumentData} 
      setSubDocumentData={setChoiceSubDocumentData}
      //comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      hideFieldLabel={true}
      propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={selected}
      props={config}/>
  </Card.Body>
}
 
export const TDBChoiceSubDocuments = ({ args, props, property, id, choiceSubDocumentData, setChoiceSubDocumentData }) => { 
  
  const [selected, setSelected]=useState(props.formData ? props.formData["@type"] : false)
  let { documentFrame, mode } = args

  useEffect(() => {
    if(selected) {
      if(mode === CONST.EDIT) {
        if(props.formData && props.formData.hasOwnProperty(CONST.TYPE) && selected !== props.formData[CONST.TYPE]) {
          setChoiceSubDocumentData({ [CONST.TYPE]: selected })
        }
        else if(props.formData) setChoiceSubDocumentData(props.formData)
        else setChoiceSubDocumentData({ [CONST.TYPE]: selected }) // when props.formData not populated
      }
      else if (mode === CONST.CREATE) setChoiceSubDocumentData({ [CONST.TYPE]: selected })
    }
  }, [selected])

  function handleChoiceSelect(chosen) {
    if(chosen) setSelected(chosen) 
  }

  let choices = util.getChoices(documentFrame, property)

  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={property} required={props.required} id={id} hideFieldLabel={props.hideFieldLabel}/>
    <Card bg="secondary" className="w-100 p-3" key={id}>
      <SelectComponent options={choices} 
        placeholder={`Select choices ...`}
        value={getDefaultValue(choices, selected)} 
        id={id}
        onChange={handleChoiceSelect}/>
      <DisplaySelectedSubDocument props={props} 
        selected={selected} 
        choiceSubDocumentData={choiceSubDocumentData} 
        setChoiceSubDocumentData={setChoiceSubDocumentData}
        id={id}
        args={args} />
    </Card>
  </Stack>
}