import React, { useState, useEffect } from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"
import { TDBDocument } from "./documentWidget"
import { extractPropertyDocumentation } from "../helpers/widgetHelper"

const DisplaySelectedDocument = ({ props, selected, args, id, clickedUnlinked, choiceDocumentData, setChoiceDocumentData }) => {
  let { reference, mode, fullFrame, onSelect, onTraverse, documentFrame } = args
  
  if(!selected) return <div/> 

  function handleChoiceDocumentChange (data, fieldName) {
    // make sure data has @type same as that of selected 
    // if not then we force at this point - logic for type is controlled in 
    // choice documents rather than in TDB Document widget
    if(typeof data === CONST.OBJECT_TYPE) {
     data[CONST.TYPE]=selected
    }
    if(props.onChange) props.onChange(data)
  } 


  let extracted = util.availableInReference (reference, selected) ? reference[selected] : {}
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  let config = {
    required: props.required, 
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: extractDataBasedOnChoices(choiceDocumentData, selected)
    //formData: selected===choiceDocumentData[CONST.TYPE] ? choiceDocumentData : {}
  } 
 
  return <Card.Body>
    <TDBDocument extracted={extracted}  
      linkId={props.hasOwnProperty("id") ? props["id"] : null}
      //comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      hideFieldLabel={true}
      args={args}
      formData={props && props.formData ?  props.formData : false}
      onSelect={onSelect}
      clickedUnlinked={clickedUnlinked}
      reference={reference}
      onTraverse={onTraverse}
      propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={selected}
      unfoldable={util.isUnfoldable(fullFrame[selected])}
      props={config}/>
  </Card.Body>
}

function getChoicesToDisplay(mode, documentFrame, property, unlinked, choiceDocumentData) {
  let choices = util.getChoices(documentFrame, property)
  if(mode === CONST.EDIT && !unlinked && choiceDocumentData.hasOwnProperty(CONST.TYPE)) {
    // show only linked type here
    // if user wants to change this user will have to unlink the document 
    //to get both the choices back
    choices = choices.filter (arr => arr.value === choiceDocumentData[CONST.TYPE])
  }
  //else if(mode === CONST.EDIT && unlinked) choices = util.getChoices(documentFrame, property)
  return choices
}

// function which provides data to TDBDocuments based on choices selected 
function extractDataBasedOnChoices(choiceDocumentData, selected) {
  if(selected === extractSelectedChoice (choiceDocumentData))
    return choiceDocumentData
  return {}
}

// extract selected type from filled data when its a string (@unfoldbale is false)
function getTypeFromFilledData (formData) {
  let arr = formData.split("/")
  return arr[0] // arr[0] will have the type chosen to be displayed in select component 
}


// extract selected choice to display in select component
function extractSelectedChoice (formData) {
  if(formData) {
    if(typeof formData === CONST.STRING_TYPE) {
      //@unfolded is false in this case
      return getTypeFromFilledData (formData)
    }
    else {
      let type = util.checkIfGeometryCollectionType(formData)
      return type ? type : formData["@type"] // @unfolded is true
    }
  }
  return false
}

export const TDBChoiceDocuments = ({ args, props, property, id, choiceDocumentData, setChoiceDocumentData }) => { 
  
  const [selected, setSelected]=useState(extractSelectedChoice(props.formData)) 
  const [unlinked, clickedUnlinked]=useState(false)
  let { documentFrame, mode } = args 
  let displayChoices = getChoicesToDisplay(mode, documentFrame, property, unlinked, choiceDocumentData)
  const [choices, setChoices]= useState(displayChoices)

  if(mode === CONST.VIEW && props.formData && !Object.keys(props.formData).length) 
    return <div className={`tdb__${props.name}__hidden`}/>

  useEffect(() => {
    if(unlinked) setChoices(util.getChoices(documentFrame, property))
  }, [unlinked])


  function handleChoiceSelect(chosen) {
    if(chosen) setSelected(chosen) 
  }

  let documentation = util.checkIfPropertyHasDocumentation (args.extractedDocumentation, property, args.fullFrame[CONST.SELECTED_LANGUAGE]) 
 
  
  return <Stack direction="horizontal"  className="mb-3">
    <TDBLabel name={documentation.label ?  documentation.label : property} 
      required={props.required} 
      comment={documentation.comment} 
      id={id} 
      hideFieldLabel={props.hideFieldLabel}/>
    <Card bg="secondary" className="w-100 p-3" key={id}>
      <SelectComponent options={choices} 
        placeholder={`Select choices ...`}
        value={getDefaultValue(choices, selected)} 
        mode={args.mode}
        id={id}
        onChange={handleChoiceSelect}/> 
      <DisplaySelectedDocument props={props} 
        selected={selected} 
        clickedUnlinked={clickedUnlinked}
        choiceDocumentData={choiceDocumentData} 
        setChoiceDocumentData={setChoiceDocumentData}
        id={id}
        args={args} />
    </Card>
  </Stack>
}