import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { TDBLabel } from "../components/LabelComponent"
import * as CONST from "../constants";
import Stack from "react-bootstrap/Stack"
import * as util from "../utils"
import { DisplayDocumentation } from "../templates"
import { AiOutlineUp, AiOutlineRight } from "react-icons/ai"
import { displayInternalProperties } from "../helpers/documentHelpers"

const CollapseMessage = ({ message, name, icon }) => {
  return <>
    {icon}
    <small className="fst-italic text-light">{`${message} ${name}`}</small>
  </>
}

// populate SubDocument data based on modes
export function populateSubDocumentData(mode, linked_to, formData, frame) {
  if(mode === CONST.CREATE) return { [CONST.TYPE]: linked_to }
  else if(mode === CONST.EDIT) {
    if(formData && linked_to === formData[CONST.TYPE]) return formData 
    else return  { [CONST.TYPE]: linked_to } 
  }
  return formData
} 

 
export const SubDocumentProperties = ({ subDocumentPropertyName, props, order_by, index, id, reference, subDocumentData, setSubDocumentData, properties, required, onChange, args, propertyDocumentation }) => {
  
  //const [fields, setFields] = useState([])

  let { uiFrame, mode } = args
 
  function handleChange(data, fieldName, selectedOneOf) { 
    let tempSubDocumentData = subDocumentData
    if(fieldName === CONST.ONEOFVALUES) {
      if(selectedOneOf) {
        let tmp={}
        // change data to add on selected choice from one of 
        tmp[CONST.TYPE] = tempSubDocumentData[CONST.TYPE]
        tmp[selectedOneOf] = data
        tempSubDocumentData=tmp
      }
    }
    else tempSubDocumentData[fieldName]=data
    setSubDocumentData(tempSubDocumentData)
    if(onChange) onChange(tempSubDocumentData)
  } 
                                  
  //console.log("subDocumentData SubDocumentProperties", subDocumentData)
  let defaultClassName="tdb__doc__input"
  let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)
 
  const getSubDocumentFields = (subDocumentData) => {
    //let subDocumentFields = []

    let subDocConfig = {
      properties: properties,
      propertyName: subDocumentPropertyName,
      id: id,
      key: id,
      formData: subDocumentData,
      required: required,
      mode: mode,
      args: args,
      fieldUIFrame: fieldUIFrame,
      onChange: handleChange,
      defaultClassName: defaultClassName,
      propertyDocumentation: propertyDocumentation
    }

    if(props.hasOwnProperty(CONST.ONEOF_SELECTED)) {
      // some choice might have been selected in @oneOfs
      subDocConfig[CONST.ONEOF_SELECTED] = props[CONST.ONEOF_SELECTED]
    }
    //return displayInternalProperties(subDocConfig)

    // review fix order_by
    let subDocumentFields = displayInternalProperties(subDocConfig)
    
    return <>
      {subDocumentFields}
    </>
    // sort based on order_by
    //return util.sortDocumentProperties(order_by, subDocumentFields)
  } 
  
  return <Card.Body className="border-top border-dark">
    {/** DisplayDocumentation for @comment of linked document class */}
    <DisplayDocumentation documentation={propertyDocumentation}/>
    {getSubDocumentFields(subDocumentData)}
  </Card.Body>
} 
  
export const TDBSubDocument = ({ extracted, expanded, order_by, comment, props, index, hideFieldLabel, linked_to, propertyDocumentation, id, reference, subDocumentData, setSubDocumentData, args }) => {
  const [open, setOpen] = useState(expanded);
  let uiFrame = args.uiFrame, mode = args.mode 


  if(mode === CONST.VIEW && !props.formData) return <div className={`tdb__${props.name}__hidden`}/>
  if(mode === CONST.VIEW && props.formData && !Object.keys(props.formData).length) return <div className={`tdb__${props.name}__hidden`}/>
    
  return <Stack direction="horizontal">
    <TDBLabel name={props.name} 
      required={props.required} 
      comment={comment} 
      className="tdb__label__width" 
      hideFieldLabel={hideFieldLabel}/> 
    <Card bg="secondary" className={`tdb__subdocument__input ${util.getBorder(uiFrame, props.name, index)} w-100`} key={id}>
      <Button variant={"secondary"}
        className={`text-start p-4`}
        data-testid={`root_subdocument_${props.name}_button`}
        name={`root_subdocument_${props.name}_button`}
        onClick={() => setOpen(!open)}
        aria-controls={`root_subdocument_${props.name}`}
        aria-expanded={open} 
      >
        {/*<TDBLabel name={props.name} required={props.required} comment={comment}/>*/}
        {!open && <CollapseMessage message={`Click here to expand SubDocument`} name={props.name} icon={<AiOutlineRight className="text-light"/>}/>}
        {open && <CollapseMessage message={`Click here to collapse SubDocument`} name={props.name} icon={<AiOutlineUp className="text-light"/>}/>}
      </Button>
      <Collapse in={open}>
        <div id={`root_subdocument_${props.name}`}>
          {subDocumentData && linked_to === subDocumentData[CONST.TYPE] && <SubDocumentProperties properties={extracted.properties} 
            required={extracted.required}
            //formData={props.formData}
            id={id}
            index={index}
            reference={reference}
            order_by={order_by}
            props={props}
            subDocumentPropertyName={props.name}
            propertyDocumentation={propertyDocumentation}
            onChange={props.onChange}
            subDocumentData={subDocumentData} 
            setSubDocumentData={setSubDocumentData}
            linked_to={linked_to}
            args={args}/>}
        </div>
      </Collapse>
    </Card>
  </Stack>
}