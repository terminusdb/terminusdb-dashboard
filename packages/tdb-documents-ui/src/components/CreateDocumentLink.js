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

// display based on action 
const DisplayLinkFrame = ({ documentData, cardKey, setDocumentData, action, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {


  if(action === CONST.LINK_NEW_DOCUMENT) {

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

      if(extracted.properties[field][CONST.PLACEHOLDER] === linked_to)  {
        // another document link 
        fields.push(<CreateDocument name={field} 
          linked_to={linked_to}
          mode={mode}
          depth={cardKey}
          extracted={extracted}
          onChange={handleChange}
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
  }
  else if(action === CONST.LINK_EXISTING_DOCUMENT)
    return <>{CONST.LINK_EXISTING_DOCUMENT}</>
  return <div/>
}


export const CreateDisplay = ({ name, required, comment, cardKey, linked_to, extracted, mode, onChange, action, setAction, documentData, setDocumentData }) => {
  
  return <>
    {getDocumentLinkChoiceDescription(name, linked_to)}
    <ToggleComponent action={action} setAction={setAction} toggleKey={cardKey}/> 
    <DisplayLinkFrame action={action} 
      extracted={extracted}
      required={required}
      mode={mode}
      cardKey={cardKey}
      onChange={onChange}
      linked_to={linked_to}
      documentLinkPropertyName={name}
      documentData={documentData} 
      setDocumentData={setDocumentData}/>
  </>
}


 
// CREATE MODE
export const CreateDocument = ({ name, required, comment, linked_to, extracted, mode, onChange, depth }) => {

  const [action, setAction] = useState(false)
  const [documentData, setDocumentData] = useState({ [CONST.TYPE]: linked_to })
  //const [cardKey, setCardKey]=useState(uuidv4())
  const [cardKey, setCardKey]=useState(depth+1)
  
  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"}/>
    <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
      <Card.Header>{getLinkedDescription (linked_to)}</Card.Header>
      <Card.Body>
        <CreateDisplay name={name} 
          required={required} 
          comment={comment}
          linked_to={linked_to} 
          extracted={extracted} 
          mode= {mode} 
          cardKey={cardKey}
          onChange={onChange}
          action={action} 
          setAction={setAction}
          documentData={documentData}
          setDocumentData={setDocumentData}
        />
      </Card.Body>
    </Card>
  </Stack>
}