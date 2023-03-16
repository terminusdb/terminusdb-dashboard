import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { TDBLabel } from "../components/LabelComponent"
import { display } from "../helpers/displayHelper"
import * as CONST from "../constants";
import Stack from "react-bootstrap/Stack"
import * as util from "../utils"
import { DisplayDocumentation } from "../templates"
import { AiOutlineUp, AiOutlineRight } from "react-icons/ai"

const CollapseMessage = ({ message, name, icon }) => {
  return <>
    {icon}
    <small className="fst-italic text-light">{`${message} ${name}`}</small>
  </>
}

// populate SubDocument data based on modes
export function populateSubDocumentData(mode, linked_to, formData) {
  if(mode === CONST.CREATE) return { [CONST.TYPE]: linked_to }
  else if(mode === CONST.EDIT) {
    if(formData && linked_to === formData[CONST.TYPE]) return formData 
    else return  { [CONST.TYPE]: linked_to } 
  }
  return formData
}

 
const SubDocumentProperties = ({ subDocumentPropertyName, id, subDocumentData, setSubDocumentData, properties, required, mode, onChange, linked_to, propertyDocumentation }) => {
  
  //const [fields, setFields] = useState([])
 
  function handleChange(data, fieldName) {
    let tempSubDocumentData = subDocumentData
    tempSubDocumentData[fieldName]=data
    setSubDocumentData(tempSubDocumentData)
    if(onChange) onChange(tempSubDocumentData)
  } 
                                  
  //console.log("subDocumentData SubDocumentProperties", subDocumentData)

  const getSubDocumentFields = (subDocumentData) => {
    let subDocumentFields = []
    for(let field in properties) { 
      let fieldName = properties[field].title
      let fieldID=`root_${subDocumentPropertyName}_${fieldName}`
      if(id) {
        // id will be filled if Sets/List
        fieldID=`${id}_${fieldName}`
      }
      let config = {
        dataType: properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
        name: fieldName,
        //formData: util.getFormDataPerProperty(subDocumentData, fieldName), 
        formData: subDocumentData[fieldName],
        required: required.includes(fieldName), 
        mode: mode, 
        id: fieldID, 
        placeholder: properties[field][CONST.PLACEHOLDER],
        className: "tdb__doc__input",
        onChange: handleChange,
        documentation: util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
      }
      subDocumentFields.push(display(config))
    }
    return subDocumentFields
  }
  
  return <Card.Body className="border-top border-dark">
    {/** DisplayDocumentation for @comment of linked document class */}
    <DisplayDocumentation documentation={propertyDocumentation}/>
    {getSubDocumentFields(subDocumentData)}
  </Card.Body>
}
  
export const TDBSubDocument = ({ extracted, expanded, comment, props, hideFieldLabel, mode, linked_to, propertyDocumentation, id, subDocumentData, setSubDocumentData }) => {
  const [open, setOpen] = useState(expanded);
   

  return <Stack direction="horizontal">
    <TDBLabel name={props.name} 
      required={props.required} 
      comment={comment} 
      className="tdb__label__width" 
      hideFieldLabel={hideFieldLabel}/>
    <Card bg="secondary" className="mb-3 border border-dark w-100" key={id}>
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
          {linked_to === subDocumentData[CONST.TYPE] && <SubDocumentProperties properties={extracted.properties} 
            required={extracted.required}
            //formData={props.formData}
            id={id}
            subDocumentPropertyName={props.name}
            propertyDocumentation={propertyDocumentation}
            onChange={props.onChange}
            subDocumentData={subDocumentData} 
            setSubDocumentData={setSubDocumentData}
            linked_to={linked_to}
            mode={mode}/>}
        </div>
      </Collapse>
    </Card>
  </Stack>
}