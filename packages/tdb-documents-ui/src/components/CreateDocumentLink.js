import React, { useState, useEffect } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { display } from "../helpers/displayHelper"
import { TDBLabel } from "./LabelComponent"
import { ToggleComponent } from "./ToggleDocumentLink"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "./DescriptionComponent"
import { v4 as uuidv4 } from 'uuid';
import { SearchExistingLink } from "./SearchExistingLink"
import { DisplayDocumentation } from "../templates"

// display based on action  
const DisplayLinkFrame = ({ reference, linkPropertyComment, onSelect, propertyDocumentation, documentData, cardKey, setDocumentData, action, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {

  let nextCreateLink =  false

  if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []

    function handleChange(data, fieldName) {
      //console.log("documentData", documentData)
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      // nextCreateLink stores the next link 
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : nextCreateLink]=data
      setDocumentData(tempDocumentData)
      if(onChange) onChange(tempDocumentData)
    }

    // definitions will have definitions of linked_to frames
    let deifinitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties


    for(let field in deifinitions.properties) { 
      linked_to = deifinitions.properties[field][CONST.PLACEHOLDER]
      // if field is a document link then @placeholder will point to linked document at this point
      if(util.availableInReference(reference, linked_to))  {
        // store the field name here to connect to correct changed data on create
        nextCreateLink =  field  
        // another document link 
        fields.push(<CreateDocument name={field} 
          linked_to={linked_to}
          propertyDocumentation={propertyDocumentation}
          mode={mode} 
          onSelect={onSelect}
          depth={cardKey}
          reference={reference}
          extracted={deifinitions}
          onChange={handleChange}
          linkPropertyComment={linkPropertyComment}
          required={required} />)
      }
      else {
        // internal properties
        let fieldName = deifinitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let config = {
          dataType: deifinitions.properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
          name: fieldName,
          key: `${linked_to}__${uuidv4()}`,
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: deifinitions.required.includes(fieldName), 
          mode: mode, 
          id: fieldID,  
          placeholder: deifinitions.properties[field][CONST.PLACEHOLDER],
          className: "tdb__doc__input",
          onChange: handleChange,
          documentation: util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
        }
        fields.push(display(config))
      }
    }

    return <div className="mt-4">
      {fields}
    </div>
  }
  else if(action === CONST.LINK_EXISTING_DOCUMENT) {

    return <SearchExistingLink onSelect={onSelect}
      mode={mode} 
      formData={null}
      onChange={onChange}
      id={cardKey}
      linked_to={linked_to}/>

  }
  return <div/>
}
 

export const CreateDisplay = ({ name, linkPropertyComment, reference, required, onSelect, propertyDocumentation, cardKey, linked_to, extracted, mode, onChange, action, setAction, documentData, setDocumentData }) => {
  
  return <>
    {getDocumentLinkChoiceDescription(name, linked_to)}
    <ToggleComponent action={action} setAction={setAction} toggleKey={cardKey}/> 
    <DisplayLinkFrame action={action} 
      extracted={extracted}
      required={required}
      linkPropertyComment={linkPropertyComment}
      mode={mode}
      propertyDocumentation={propertyDocumentation}
      cardKey={cardKey}
      reference={reference}
      onChange={onChange}
      onSelect={onSelect}
      linked_to={linked_to}
      documentLinkPropertyName={name}
      documentData={documentData} 
      setDocumentData={setDocumentData}/>
  </>
}

 
// CREATE MODE
export const CreateDocument = ({ name, required, onSelect, reference, linked_to, extracted, mode, onChange, depth, propertyDocumentation, linkPropertyComment }) => {

  const [action, setAction] = useState(false)
  const [documentData, setDocumentData] = useState({ [CONST.TYPE]: linked_to })
  //const [cardKey, setCardKey]=useState(uuidv4())
  const [cardKey, setCardKey]=useState(depth+1)

  let linkPropertyDocumentation = util.checkIfPropertyHasDocumentation(propertyDocumentation, name)
  let comment = linkPropertyDocumentation.hasOwnProperty("comment") ? linkPropertyDocumentation["comment"] : ""

    
  return <>
    <DisplayDocumentation documentation={propertyDocumentation}/>
    <Stack direction="horizontal">
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
            propertyDocumentation={propertyDocumentation}
            reference={reference}
            onSelect={onSelect}
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
  </>
}