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
import { BsTrashFill } from "react-icons/bs" 
import { CreateDocument, CreateDisplay } from "./CreateDocumentLink"
import { UnlinkButton } from "./UnlinkButton"
import { SearchExistingLink } from "./SearchExistingLink"

const DisplayFilledFrame = ({ documentData, onTraverse, onSelect, reference, setDocumentData, unfoldable, cardKey, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to }) => {


  if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []
    let nextCreateLink =  false

    function handleChange(data, fieldName) {
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : nextCreateLink]=data
      setDocumentData(tempDocumentData)
      if(onChange) onChange(tempDocumentData)
    }

    // definitions will have definitions of linked_to frames
    let deifinitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties

    //for(let field in extracted.properties) { 
    for(let field in deifinitions.properties) { 
      linked_to = deifinitions.properties[field][CONST.PLACEHOLDER]
      if(util.availableInReference(reference, linked_to)) {
        if(!formData.hasOwnProperty(field)) {
          nextCreateLink =  field  
          fields.push(<CreateDocument name={field} 
          linked_to={linked_to}
          mode={mode}
          depth={cardKey}
          onSelect={onSelect}
          reference={reference}
          extracted={extracted}
          onChange={handleChange}
          //comment={comment}  // review
          required={required} />) 
        }
        else {
          nextCreateLink =  field  
          fields.push(<EditDocument name={field} 
            onChange={handleChange}
            linked_to={linked_to}
            mode={mode}
            depth={cardKey}
            onSelect={onSelect}
            reference={reference}
            onTraverse={onTraverse}
            unfoldable={unfoldable}
            formData={formData[field]}
            extracted={deifinitions}
            //comment={comment}  // review
            required={required} />)
          }
      }
      else {
        // internal properties
        //let fieldName = extracted.properties[field].title
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
  else if(action === CONST.LINK_EXISTING_DOCUMENT) {
    return <SearchExistingLink onSelect={onSelect}
      mode={mode} 
      formData={formData}
      onChange={onChange}
      onTraverse={onTraverse}
      id={cardKey}
      linked_to={linked_to}/>
  }
  return <div/>
}

const assignDepth = (data, depth = 0 , propertyLink) => {
  if(!data) return depth
  if(data.hasOwnProperty(propertyLink)) {
    depth += 1
    return assignDepth(data[propertyLink], depth, propertyLink)
  }
  return depth
};

function getAction (formData, unfoldable) {
  if(unfoldable && 
    typeof formData === CONST.OBJECT_TYPE) return CONST.LINK_NEW_DOCUMENT
  return CONST.LINK_EXISTING_DOCUMENT
}

const EditHelper = ({ linked_to, cardKey, setDeleteLink }) => {
  function handleDelete(e) {
    setDeleteLink(Number(e.target.id)) 
  }
  // <BsTrashFill className="text-danger"/>
  return <Stack direction="horizontal" gap={4}>
    {getLinkedDescription (linked_to)}
    <UnlinkButton onDelete={handleDelete}
      title={"Delete document"}
      label={"Unlink"}
      id={cardKey} />
  </Stack>
}
 
// EDIT MODE
export const EditDocument = ({ name, reference, onTraverse, onSelect, required, comment, formData, linked_to, extracted, mode, onChange, unfoldable, depth }) => {

  const [action, setAction] = useState(getAction(formData, unfoldable))
  const [documentData, setDocumentData] = useState(formData)
  const [deleteLink, setDeleteLink] = useState(false)
  const [cardKey, setCardKey]=useState(depth+1)
  //const [cardKey, setCardKey]=useState(uuidv4())

  // constants to link new document 
  const [linkNewAction, setLinkNewAction]=useState(false)
  const [linkNewDocumentData, setLinkNewDocumentData]=useState({ [CONST.TYPE]: linked_to}) 

  //let depth=assignDepth(formData, 0, name)

  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"}/>
    {deleteLink!==cardKey && <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
      <Card.Header>
        <EditHelper linked_to={linked_to} cardKey={cardKey} setDeleteLink={setDeleteLink}/>
      </Card.Header>
      <Card.Body>
        <DisplayFilledFrame action={action} 
          depth={depth}
          extracted={extracted}
          required={required}
          onTraverse={onTraverse}
          mode={mode}
          cardKey={cardKey}
          unfoldable={unfoldable}
          reference={reference}
          onChange={onChange}
          linked_to={linked_to}
          onSelect={onSelect}
          formData={formData}
          documentLinkPropertyName={name}
          documentData={documentData} 
          setDocumentData={setDocumentData}/>
      </Card.Body>
    </Card>}
    {/** user has deleted a link and have decided to add new */}
    {deleteLink === cardKey && <Card bg="secondary" className="mb-3 border border-dark w-100">
      <Card.Body>
        <CreateDisplay 
          name={name} 
          required={required} 
          cardKey={cardKey}
          comment={comment}
          onSelect={onSelect}
          reference={reference}
          linked_to={linked_to} 
          extracted={extracted} 
          mode= {mode} 
          onChange={onChange}
          action={linkNewAction} 
          setAction={setLinkNewAction}
          documentData={linkNewDocumentData} // pass branch new info here
          setDocumentData={setLinkNewDocumentData }
        />
      </Card.Body>
    </Card>}
  </Stack>

  
  
}