import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { TDBLabel } from "../components/LabelComponent"
import { display } from "../helpers/widgetHelper"
import * as CONST from "../constants";
import * as util from "../utils"
import { DisplayDocumentation } from "../templates"

// populate SubDocument data based on modes
function populateSubDocumentData(mode, linked_to, formData) {
  if(mode === CONST.CREATE) return { [CONST.TYPE]: linked_to }
  return formData
}

function getFormDataPerProperty (subDocumentData, fieldName) {
  if(subDocumentData.hasOwnProperty(fieldName)) return subDocumentData[fieldName]
  return ""
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
      formData: getFormDataPerProperty(subDocumentData, fieldName), 
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
 
export const TDBSubDocument = ({ extracted, comment, props, mode, linked_to, propertyDocumentation }) => {
  const [open, setOpen] = useState(false);


  return <Card bg="secondary" className="mb-3 border border-secondary">
    <Button variant={"secondary"}
      className={`text-start p-4`}
      data-testid={`root_subdocument_${props.name}_button`}
      name={`root_subdocument_${props.name}_button`}
      onClick={() => setOpen(!open)}
      aria-controls={`root_subdocument_${props.name}`}
      aria-expanded={open}
    >
      <TDBLabel name={props.name} required={props.required} comment={comment}/>
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
}