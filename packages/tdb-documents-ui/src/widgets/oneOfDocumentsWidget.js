import React, { useState, useEffect } from "react"
import * as util from "../utils"
import * as CONST from "../constants"
import Stack from "react-bootstrap/Stack"
import Card from "react-bootstrap/Card"
import { SelectComponent, getDefaultValue  } from "../components/SelectComponent"
import { TDBLabel } from "../components/LabelComponent"
import { TDBSubDocument } from "./subDocumentWidget"
import { extractPropertyDocumentation } from "../helpers/widgetHelper"
import { getDisplay } from "../helpers/fieldDisplay"
import { SYS_UNIT_DATA_TYPE } from "../dataType.constants"

const DisplaySelectedChoices = ({ props, selected, args, id, selectedIndex,  onChange, oneOfData, setOneOfData }) => {
  let { reference, mode, fullFrame } = args
  
  if(!selected) return <div/>

  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  
 
  // get order_by
  // at this point selected is the linked_to documnet in fullframe
  let order_by = false
  if(fullFrame.hasOwnProperty(selected)) {
    order_by=util.getOrderBy(fullFrame, selected)
  }

  let selectedFrame = args.documentFrame[CONST.ONEOFVALUES][selectedIndex][selected]

  // construct args
  let argsHolder = {...args}
  argsHolder.documentFrame = { [selected]: selectedFrame }

  function handleOneOfChange (data, name) {
    //console.log(data, name) 
    //setOneOfData(data);
    //if(props.onChange) props.onChange(data, name, selected)
    if(onChange) onChange(data, name, selectedIndex)
  }

  // construct props
  let oneOfProps = {}
  oneOfProps.documentFrame={ [selected]:  args.documentFrame[CONST.ONEOFVALUES][selectedIndex][selected] }
  oneOfProps.expand = true
  oneOfProps.name = selected
  oneOfProps.required = true
  //oneOfProps.formData = oneOfDocumentData
  oneOfProps.formData = oneOfData
  oneOfProps.onChange = handleOneOfChange
  oneOfProps[CONST.ONEOF_SELECTED] = selected

  return <Card.Body> 
    { getDisplay (oneOfProps, argsHolder, selected)  }
  </Card.Body> 
}

/** populate one of data when selected has changed  */
function setOneOfFormData (args, selected, selectedOneOfIndex) {
  // subdocuments
  if(args.documentFrame[CONST.ONEOFVALUES][selectedOneOfIndex][selected].hasOwnProperty(CONST.CLASS))
    return { [CONST.TYPE]: selected }
  else if(args.documentFrame[CONST.ONEOFVALUES][selectedOneOfIndex][selected] === SYS_UNIT_DATA_TYPE) 
    return []
  else return ""
}



const OneOfChoice = ({ oneOfKey, args, props, oneOf, oneOfIndex, setOneOfDocumentData, oneOfDocumentData, selectedChoice }) => {
  const [selected, setSelected]= useState(oneOfDocumentData ? selectedChoice : false)  
  const [currentOneOf, setCurrentOneOf]=useState(oneOfIndex)
  const [oneOfData, setOneOfData]=useState(oneOfDocumentData ? oneOfDocumentData[selectedChoice] : "")

  //console.log("oneOfData", oneOfData) 

  let { documentFrame, mode } = args

  let choices = util.getOneOfChoices(oneOf)

  useEffect(() => {
    if(selected) {
      if(mode === CONST.EDIT) {
        if(props.formData && props.formData.hasOwnProperty(CONST.TYPE) && 
          selected === selectedChoice) {
            setOneOfDocumentData(props.formData)
        }
        else {
          let newData = null
          if(util.isDataType(args.documentFrame[CONST.ONEOFVALUES][currentOneOf][selected]))
            newData = ""
          else newData = { [CONST.TYPE]: selected }// when props.formData not populated
          setOneOfDocumentData(newData)
          if(props.onChange) props.onChange(newData, CONST.ONEOFVALUES, selected)
        }
      }
      if(args.documentFrame[CONST.ONEOFVALUES][currentOneOf][selected] === SYS_UNIT_DATA_TYPE) {
        // SET DEFAULT VALUE [] if selected is sys:Unit type
        if(props.onChange) props.onChange([], CONST.ONEOFVALUES, selected)
      }
    }
  }, [selected]) 

  function handleChoiceSelect(chosen, selectedOneOfIndex) {
    if(chosen) {
      setSelected(chosen) 
      setCurrentOneOf(selectedOneOfIndex)
    }
  }

  function handleEachOneOfChange(data, name, selectedIndex) {
    let temp = data
    //temp[selectedIndex] = data 
    //let temp = oneOfDocumentData
    //temp[selected] = data
    setOneOfDocumentData(temp)
    setOneOfData(temp)
    if(props.onChange) props.onChange(temp, name, selected)
  }
 

  return <div className="mb-3" key={oneOfKey}>
    <SelectComponent options={choices} 
      mode = {mode}
      placeholder={`Select choices ...`}
      value={getDefaultValue(choices, selected)}  
      id={oneOfKey}
      required={true}
      onChange={(chosen) => handleChoiceSelect(chosen, currentOneOf)}/>
    <DisplaySelectedChoices props={props} 
      selected={selected} 
      selectedIndex={currentOneOf}
      onChange={handleEachOneOfChange}
      oneOfData={oneOfData} 
      setOneOfData={setOneOfData}
      //oneOfDocumentData={oneOfDocumentData} 
      //setOneOfData={setOneOfData}
      id={oneOfKey}
      args={args} />
  </div> 
} 



export const TDBOneOfDocuments = ({ args, props, property, id, setOneOfDocumentData, oneOfDocumentData }) => { 
 
  let { documentFrame, mode } = args

  let tempData = {}
  for(let keys in oneOfDocumentData) {
    if(keys === "@id") continue
    else if(keys === "@type") continue
    else { 
      tempData[keys] = oneOfDocumentData[keys]
    }
  }

  return <Stack direction="horizontal"  className="mb-3">
    <Card bg="secondary" className="w-100 p-3" key={id}>
      {
        documentFrame["@oneOf"].map((oneOf, index) => {
          let choices = util.getOneOfChoices(oneOf)
          let oneOfKey = `${id}__${index}`
          return <div className="mb-3" key={oneOfKey}>
            <OneOfChoice oneOfKey={oneOfKey} 
              args={args} 
              props={props} 
              selectedChoice={mode !== CONST.CREATE ? Object.keys(tempData)[index] : false}
              oneOf={oneOf} 
              setOneOfDocumentData={setOneOfDocumentData} 
              oneOfDocumentData={oneOfDocumentData}
              oneOfIndex={index}/>
          </div>
        })
      }
    </Card>
  </Stack>

}