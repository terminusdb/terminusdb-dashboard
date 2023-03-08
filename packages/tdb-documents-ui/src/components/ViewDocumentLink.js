import React, { useState } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { display } from "../helpers/widgetHelper"
import { TDBLabel } from "./LabelComponent"
import { ToggleComponent } from "./ToggleDocumentLink"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "./DescriptionComponent"
import { v4 as uuidv4 } from 'uuid';
import Button from "react-bootstrap/Button"
import { BsTrashFill } from "react-icons/bs"
import { CreateDocument, CreateDisplay } from "./CreateDocumentLink"

const DisplayFilledFrame = ({ documentData, cardKey, setDocumentData, unfoldable, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {


  //if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []

    function handleChange(data, fieldName) {
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      setDocumentData(tempDocumentData)
      if(onChange) onChange(tempDocumentData)
    }

    for(let field in extracted.properties) { 
      if(field === documentLinkPropertyName) {
        if(!formData.hasOwnProperty(field)) fields.push(<div className="empty"/>) 
        else fields.push(<ViewDocument name={field} 
          onChange={handleChange}
          linked_to={linked_to}
          mode={mode}
          depth={cardKey}
          unfoldable={unfoldable}
          formData={formData[field]}
          extracted={extracted}
          //comment={comment}  // review
          required={required} />)
      }
      else {
        // internal properties
        let fieldName = extracted.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let config = {
          dataType: extracted.properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
          name: fieldName,
          key: `${linked_to}__${uuidv4()}`,
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: extracted.required.includes(fieldName), 
          mode: mode, 
          id: fieldID, 
          formData: documentData[field],
          placeholder: extracted.properties[field][CONST.PLACEHOLDER],
          className: "tdb__doc__input",
          onChange: handleChange,
          documentation: "" // review util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
        }
        fields.push(display(config))
      }
    }

    return <div className="mt-4">
      {fields}
    </div>

  //}
  //else if(action === CONST.LINK_EXISTING_DOCUMENT)
    //return <>{CONST.LINK_EXISTING_DOCUMENT}</>
  //return <div/>
}



function getAction (formData, unfoldable) {
  if(unfoldable && 
    typeof formData === CONST.OBJECT_TYPE) return CONST.LINK_NEW_DOCUMENT
  return CONST.LINK_EXISTING_DOCUMENT
}

const ViewHelper = ({ linked_to }) => {
  return <Stack direction="horizontal" gap={4}>
    {getLinkedDescription (linked_to)}
  </Stack>
}
 
// VIEW MODE
export const ViewDocument = ({ name, required, depth, comment, formData, linked_to, extracted, mode, onChange, unfoldable }) => {

  const [action, setAction] = useState(getAction(formData, unfoldable))
  const [documentData, setDocumentData] = useState(formData)
  const [cardKey, setCardKey]=useState(depth+1)

  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"}/>
    <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
      <Card.Header>
        <ViewHelper linked_to={linked_to}/>
      </Card.Header>
      <Card.Body>
        <DisplayFilledFrame action={action} 
          extracted={extracted}
          required={required}
          mode={mode}
          unfoldable={unfoldable}
          onChange={onChange}
          linked_to={linked_to}
          cardKey={cardKey}
          formData={formData}
          documentLinkPropertyName={name}
          documentData={documentData} 
          setDocumentData={setDocumentData}/>
      </Card.Body>
    </Card>
  </Stack>

  
  
}