import React, { useState } from "react"
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
function populateSubDocumentData(mode, linked_to, formData) {
  if(mode === CONST.CREATE) return { [CONST.TYPE]: linked_to }
  return formData
}

 
const SubDocumentProperties = ({ subDocumentPropertyName, properties, required, mode, onChange, formData, linked_to, propertyDocumentation }) => {
  
  const [subDocumentData, setSubDocumentData] = useState(populateSubDocumentData(mode, linked_to, formData))

  let fields = []
 
  function handleChange(data, fieldName) {
    let tempSubDocumentData = subDocumentData
    tempSubDocumentData[fieldName]=data
    setSubDocumentData(tempSubDocumentData)
    if(onChange) onChange(tempSubDocumentData)
  }

  for(let field in properties) { 
    let fieldName = properties[field].title
    let fieldID=`root_${subDocumentPropertyName}_${fieldName}`
    let config = {
      dataType: properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
      name: fieldName,
      formData: util.getFormDataPerProperty(subDocumentData, fieldName), 
      required: required.includes(fieldName), 
      mode: mode, 
      id: fieldID, 
      placeholder: properties[field][CONST.PLACEHOLDER],
      className: "tdb__doc__input",
      onChange: handleChange,
      documentation: util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
    }
    fields.push(display(config))
  }
  return <Card.Body className="border-top border-dark">
    {/** DisplayDocumentation for @comment of linked document class */}
    <DisplayDocumentation documentation={propertyDocumentation}/>
    {fields}
  </Card.Body>
}
  
export const TDBSubDocument = ({ extracted, expanded, comment, props, mode, linked_to, propertyDocumentation }) => {
  const [open, setOpen] = useState(expanded);

 
  return <Stack direction="horizontal">
    <TDBLabel name={props.name} required={props.required} comment={comment} className="tdb__label__width"/>
    <Card bg="secondary" className="mb-3 border border-secondary w-100">
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
          <SubDocumentProperties properties={extracted.properties} 
            required={extracted.required}
            formData={props.formData}
            subDocumentPropertyName={props.name}
            propertyDocumentation={propertyDocumentation}
            onChange={props.onChange}
            linked_to={linked_to}
            mode={mode}/>
        </div>
      </Collapse>
    </Card>
  </Stack>
}