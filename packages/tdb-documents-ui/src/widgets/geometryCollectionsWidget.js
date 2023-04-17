import React, { useState, useEffect } from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"
import { TDBDocument } from "./documentWidget"
import { extractPropertyDocumentation } from "../helpers/widgetHelper"
import { displayPointEditDocument } from "../helpers/displayHelper"
import { constructGeoJSONProps } from "../arrayHelpers/geoJsonProps"

/*const Display = ({ props, args, selected, clickedUnlinked, collectionData, setCollectionData })  => {
  let id = props.id 
  let newProps = constructGeoJSONProps(props)
  let argsHolder = {...args} 
  argsHolder.documentFrame={ [CONST.POINT] : args.fullFrame[CONST.POINT] }
  return displayPointEditDocument(newProps, argsHolder, CONST.POINT)
}*/

const DisplaySelectedDocument = ({ props, selected, args, id, clickedUnlinked, choiceDocumentData, setChoiceDocumentData }) => {
  let { reference, mode, fullFrame, onSelect, onTraverse, documentFrame } = args
  
  if(!selected) return <div/>

  function handleChoiceDocumentChange (data, property, fieldID) {
    // make sure data has @type same as that of selected 
    // if not then we force at this point - logic for type is controlled in 
    // choice documents rather than in TDB Document widget
    if(props.onChange) props.onChange(data)
  } 


  let extracted = util.availableInReference (reference, selected) ? reference[selected] : {}
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  let config = {
    required: props.required, 
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: props.formData,
    //formData: extractDataBasedOnChoices(choiceDocumentData, selected)
    //formData: selected===choiceDocumentData[CONST.TYPE] ? choiceDocumentData : {}
  } 
 
  return <Card.Body>
    <TDBDocument extracted={extracted}  
      linkId={props.hasOwnProperty("id") ? props["id"] : null}
      //comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      hideFieldLabel={true}
      args={args}
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

function getGeomteryChoices(mode, documentFrame, property, unlinked, choiceDocumentData) {
  let options = []
  CONST.GEOMETRY_ARRAY.map ( docs => {
    options.push({ value: docs, label: docs, color: "#adb5bd" })
  })
  return options
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
    return formData["@type"] // @unfolded is true
  }
  return false
}

export const TDBGeometryCollections = ({ args, props, property, id, collectionData, setCollectionData }) => { 
  
  const [selected, setSelected]=useState(extractSelectedChoice(props.formData))
  const [unlinked, clickedUnlinked]=useState(false)
  let { documentFrame, mode } = args
  let displayChoices = getGeomteryChoices(mode, documentFrame, property, unlinked, collectionData)
  const [choices, setChoices]= useState(displayChoices)

  useEffect(() => {
    if(unlinked) setChoices(util.getChoices(documentFrame, property))
  }, [unlinked])

  useEffect(() => {
    if(selected) setCollectionData({ [CONST.TYPE]: selected })
  }, [selected])


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
      {/*<Display props={props}
        selected={selected} 
        clickedUnlinked={clickedUnlinked}
        collectionData={collectionData} 
        setCollectionData={setCollectionData}
        args={args} 
        id={id}/>*/}
      {<DisplaySelectedDocument props={props} 
        selected={selected} 
        clickedUnlinked={clickedUnlinked}
        choiceDocumentData={collectionData} 
        setChoiceDocumentData={setCollectionData}
        id={id}
        args={args} />}
    </Card>
  </Stack>
}