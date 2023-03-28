import React, { useState } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { display } from "../helpers/displayHelper"
import { TDBLabel } from "./LabelComponent"
import { ToggleComponent } from "./ToggleDocumentLink"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "./DescriptionComponent"
import { v4 as uuidv4 } from 'uuid';
import Button from "react-bootstrap/Button"
import { BsTrashFill } from "react-icons/bs"
import { SearchExistingLink } from "./SearchExistingLink"
import { CreateDocument, CreateDisplay } from "./CreateDocumentLink"

const DisplayFilledFrame = ({ documentData, uiFrame, hideFieldLabel, reference, cardKey, onTraverse, setDocumentData, unfoldable, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {


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

    // definitions will have definitions of linked_to frames
    let deifinitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties

    let defaultClassName="tdb__doc__input"

    //for(let field in extracted.properties) {
    for(let field in deifinitions.properties) {  
          
      linked_to = deifinitions.properties[field][CONST.PLACEHOLDER]
      if(util.availableInReference(reference, linked_to)) {
        // unfolderdLinkPropertyName stores the property name which is linked to unfolded Document
        // we need this value to understand diff uis 
        if(!formData.hasOwnProperty(field)) fields.push(<div className="empty"/>) 
        else fields.push(<ViewDocument name={field} 
          onChange={handleChange}
          linked_to={linked_to}
          mode={mode}
          hideFieldLabel={hideFieldLabel}
          depth={cardKey}
          reference={reference}
          unfoldable={unfoldable}
          formData={formData[field]}
          extracted={deifinitions}
          //comment={comment}  // review
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
          formData: documentData[field],
          placeholder: deifinitions.properties[field][CONST.PLACEHOLDER],
          className:  defaultClassName,
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
  else if(action === CONST.LINK_EXISTING_DOCUMENT) {
    return <SearchExistingLink mode={mode} 
      formData={formData}
      onChange={onChange}
      onTraverse={onTraverse}
      id={cardKey}
      linked_to={linked_to}/>
  }
  return <div/>
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
export const ViewDocument = ({ name, required, uiFrame, reference, hideFieldLabel, depth, comment, formData, linked_to, extracted, mode, onChange, unfoldable, onTraverse }) => {

  const [action, setAction] = useState(getAction(formData, unfoldable))
  const [documentData, setDocumentData] = useState(formData)
  const [cardKey, setCardKey]=useState(depth+1)

  if(mode === CONST.VIEW && !formData) return <div className={`tdb__${name}__hidden`}/>

  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"} hideFieldLabel={hideFieldLabel}/>
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
          onTraverse={onTraverse}
          uiFrame={uiFrame}
          onChange={onChange}
          linked_to={linked_to}
          cardKey={cardKey}
          reference={reference}
          hideFieldLabel={hideFieldLabel}
          formData={formData}
          documentLinkPropertyName={name}
          documentData={documentData} 
          setDocumentData={setDocumentData}/>
      </Card.Body>
    </Card>
  </Stack>

  
  
}