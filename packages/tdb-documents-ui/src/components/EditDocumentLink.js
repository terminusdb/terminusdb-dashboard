import React, { useState, useEffect } from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { display } from "../helpers/display"
import { TDBLabel } from "./LabelComponent"
import { ToggleComponent } from "./ToggleDocumentLink"
import { getLinkedDescription, getDocumentLinkChoiceDescription } from "./DescriptionComponent"
import { v4 as uuidv4 } from 'uuid';
import { BsTrashFill } from "react-icons/bs" 
import { CreateDocument, CreateDisplay, checkifArray } from "./CreateDocumentLink"
import { UnlinkButton } from "./UnlinkButton"
import { SearchExistingLink } from "./SearchExistingLink"
import { documentInternalProperties } from "../helpers/documentHelpers"
import { extractFormData } from "./CreateDocumentLink"

const DisplayFilledFrame = ({ args, documentData, propertyDocumentation, onTraverse, onSelect, reference, setDocumentData, unfoldable, cardKey, action, formData, onChange, documentLinkPropertyName, extracted, required, mode, linked_to, clickedUnlinked }) => {

  const [update, setUpdate] = useState(Date.now())

  if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []

    function handleChange(data, fieldName, field) {
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : field]=data
      setDocumentData(tempDocumentData)
      if(onChange) onChange(tempDocumentData) 
      setUpdate(Date.now())
    }

    // definitions will have definitions of linked_to frames
    let definitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties

    //for(let field in extracted.properties) { 
    for(let field in definitions.properties) { 

      linked_to = definitions.properties[field][CONST.PLACEHOLDER]
      if(util.availableInReference(reference, linked_to)&& !checkifArray(args, documentData, field)) {
        if(!formData.hasOwnProperty(field)) {
          fields.push(<CreateDocument name={field} 
          linked_to={linked_to}
          mode={mode}
          formData={formData &&  formData.hasOwnProperty(field) && formData[field] ? formData[field] : false}
          args={args}
          propertyDocumentation={propertyDocumentation}
          depth={cardKey}
          onSelect={onSelect}
          reference={reference}
          extracted={extracted}
          onChange={(data, fieldName) => handleChange(data, fieldName, field)}
          //comment={comment}  // review
          required={required} />) 
        }
        else {
          fields.push(<EditDocument name={field} 
            onChange={(data, fieldName) => handleChange(data, fieldName, field)}
            linked_to={linked_to}
            mode={mode}
            clickedUnlinked={clickedUnlinked}
            depth={cardKey}
            onSelect={onSelect}
            reference={reference}
            propertyDocumentation={propertyDocumentation}
            args={args}
            onTraverse={onTraverse}
            unfoldable={unfoldable}
            formData={formData &&  formData.hasOwnProperty(field) && formData[field] ? formData[field] : false}
            //formData={formData[field]}
            extracted={definitions}
            //comment={comment}  // review
            required={required} />)
          }
      }
      else {

        // internal properties
        let fieldName = definitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let defaultClassName="tdb__doc__input"
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)
        let type = util.checkIfGeometryCollectionType(documentData)

        let config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: `${linked_to}__${uuidv4()}`,
          formData: { [fieldName] : util.getFormDataPerProperty(documentData, fieldName, type) },
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          //fieldUIFrame: fieldUIFrame, // review diff ui 
          onChange: handleChange,
          currentDocumentClass: type ? type : documentData[CONST.TYPE],
          defaultClassName: defaultClassName,
          propertyDocumentation: propertyDocumentation
        }

        // review fix order_by
        fields.push(documentInternalProperties(config, field))

        // internal properties
        //let fieldName = extracted.properties[field].title
        /*let fieldName = deifinitions.properties[field].title
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
        fields.push(display(config)) */
      }
    }

    return <div className="mt-4">
      {update && fields}
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
  if(!formData) return false
  if(typeof formData === CONST.STRING_TYPE) return CONST.LINK_EXISTING_DOCUMENT
  return CONST.LINK_NEW_DOCUMENT
}

const EditHelper = ({ linked_to, cardKey, setDeleteLink, clickedUnlinked }) => {
  function handleDelete(e) {
    // clickedUnlinked is set in the case of choice documents 
    // where user has decided to unlink doc - after unlink is clicked all 
    // other choices will appear in the select component 
    if(clickedUnlinked) clickedUnlinked(Date.now())
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
export const EditDocument = ({ name, args, reference, onTraverse, clickedUnlinked, index, order_by, propertyDocumentation, hideFieldLabel, onSelect, required, comment, formData, linked_to, extracted, mode, onChange, unfoldable, depth }) => {

  const [action, setAction] = useState(getAction(formData, unfoldable))
  const [documentData, setDocumentData] = useState(formData ? extractFormData(formData, linked_to) : { [CONST.TYPE]: linked_to })
  const [deleteLink, setDeleteLink] = useState(false)
  const [cardKey, setCardKey]=useState(depth+1)
  //const [cardKey, setCardKey]=useState(uuidv4())
 
  // constants to link new document 
  const [linkNewAction, setLinkNewAction]=useState(false)
  const [linkNewDocumentData, setLinkNewDocumentData]=useState({ [CONST.TYPE]: linked_to}) 

  useEffect(() => { 
    if(linked_to) setLinkNewDocumentData({ [CONST.TYPE]: linked_to})
  }, [linked_to])

  //let depth=assignDepth(formData, 0, name)
 
  return <Stack direction="horizontal">
    <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"} hideFieldLabel={hideFieldLabel}/>
    {deleteLink!==cardKey && <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
      <Card.Header>
        <EditHelper linked_to={linked_to} cardKey={cardKey} setDeleteLink={setDeleteLink} clickedUnlinked={clickedUnlinked}/>
      </Card.Header>
      <Card.Body>
        {action && <DisplayFilledFrame action={action} 
          depth={depth}
          extracted={extracted}
          required={required}
          args={args}
          onTraverse={onTraverse}
          propertyDocumentation={propertyDocumentation}
          mode={mode}
          clickedUnlinked={clickedUnlinked}
          cardKey={cardKey}
          unfoldable={unfoldable}
          formData={formData}
          reference={reference}
          onChange={onChange}
          linked_to={linked_to}
          onSelect={onSelect}
          documentLinkPropertyName={name}
          documentData={documentData} 
          setDocumentData={setDocumentData}/>}

        {!action && <>
          <CreateDisplay 
            name={name} 
            required={required} 
            cardKey={cardKey}
            comment={comment}
            propertyDocumentation={propertyDocumentation}
            args={args}
            onSelect={onSelect}
            reference={reference}
            formData={formData &&  formData.hasOwnProperty(name) && formData[name] ? formData[name] : false}
            linked_to={linked_to} 
            extracted={extracted} 
            mode= {mode} 
            onChange={onChange}
            action={linkNewAction} 
            setAction={setLinkNewAction}
            documentData={linkNewDocumentData} // pass branch new info here
            setDocumentData={setLinkNewDocumentData }
          />
        </>}
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
          propertyDocumentation={propertyDocumentation}
          args={args}
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