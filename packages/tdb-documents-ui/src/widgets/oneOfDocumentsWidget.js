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

const DisplaySelectedChoices = ({ props, selected, args, id, oneOfDocumentData, setOneOfDocumentData }) => {
  let { reference, mode, fullFrame } = args
  
  if(!selected) return <div/>

  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  
 
  // get order_by
  // at this point selected is the linked_to documnet in fullframe
  let order_by = false
  if(fullFrame.hasOwnProperty(selected)) {
    order_by=util.getOrderBy(fullFrame, selected)
  }

  let selectedFrame = args.documentFrame[CONST.ONEOFVALUES][0][selected]

  // construct args
  let argsHolder = {...args}
  argsHolder.documentFrame = { [selected]: selectedFrame }

  function handleOneOfChange (data, name) {
    //console.log(data, name) 
    if(props.onChange) props.onChange(data, name, selected)
  }

  // construct props
  let oneOfProps = {}
  oneOfProps.documentFrame={ [selected]:  args.documentFrame[CONST.ONEOFVALUES][0][selected] }
  oneOfProps.expand = true
  oneOfProps.name = selected
  oneOfProps.required = true
  oneOfProps.formData = oneOfDocumentData
  oneOfProps.onChange = handleOneOfChange
  oneOfProps[CONST.ONEOF_SELECTED] = selected

  return <Card.Body> 
    { getDisplay (oneOfProps, argsHolder, selected)  }
  </Card.Body> 
}

/** populate one of data when selected has changed  */
function setOneOfFormData (args, selected, data) {
  // subdocuments
  if(args.documentFrame[CONST.ONEOFVALUES][0][selected].hasOwnProperty(CONST.CLASS))
    return { [CONST.TYPE]: selected }
  else if(args.documentFrame[CONST.ONEOFVALUES][0][selected] === SYS_UNIT_DATA_TYPE) 
    return []
  else return ""
}

 
export const TDBOneOfDocuments = ({ args, props, property, id, setOneOfDocumentData, oneOfDocumentData }) => { 
  
  const [selected, setSelected]=useState(props[CONST.ONEOF_SELECTED] ? props[CONST.ONEOF_SELECTED] : false)
  let { documentFrame, mode } = args

  useEffect(() => {
    if(selected) {
      if(mode === CONST.EDIT) {
        if(props.formData && props.formData.hasOwnProperty(CONST.TYPE) && 
          selected === props[CONST.ONEOF_SELECTED]) {
            setOneOfDocumentData(props.formData)
        }
        else {
          if(util.isDataType(args.documentFrame[CONST.ONEOFVALUES][0][selected]))
            setOneOfDocumentData("")
          else setOneOfDocumentData({ [CONST.TYPE]: selected }) // when props.formData not populated
        }
      }
      else if (mode === CONST.CREATE) {
        setOneOfDocumentData(setOneOfFormData(args, selected))
      }
      if(args.documentFrame[CONST.ONEOFVALUES][0][selected] === SYS_UNIT_DATA_TYPE) {
        // SET DEFAULT VALUE [] if selected is sys:Unit type
        if(props.onChange) props.onChange([], CONST.ONEOFVALUES, selected)
      }
    }
  }, [selected]) 

  function handleChoiceSelect(chosen) {
    if(chosen) setSelected(chosen) 
  }

  let choices = util.getOneOfChoices(documentFrame["@oneOf"][0])

  return <Stack direction="horizontal"  className="mb-3">
    <Card bg="secondary" className="w-100 " key={id}>
      <SelectComponent options={choices} 
        mode = {mode}
        placeholder={`Select choices ...`}
        value={getDefaultValue(choices, selected)} 
        id={id}
        required={true}
        onChange={handleChoiceSelect}/>
      <DisplaySelectedChoices props={props} 
        selected={selected} 
        oneOfDocumentData={oneOfDocumentData} 
        setOneOfDocumentData={setOneOfDocumentData}
        id={id}
        args={args} />
    </Card>
  </Stack>
}