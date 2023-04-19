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
import { SearchExistingLink } from "./SearchExistingLink"
import { DisplayDocumentation } from "../templates"
import { documentInternalProperties } from "../helpers/documentHelpers"

// display based on action  
const DisplayLinkFrame = ({ reference, args, linkPropertyComment, order_by, onSelect, propertyDocumentation, documentData, cardKey, setDocumentData, action, onChange, documentLinkPropertyName, extracted, required, mode, linked_to, linkId }) => {

  let nextCreateLink =  false

  if(action === CONST.LINK_NEW_DOCUMENT) {

    let fields = []

    function handleChange_OLD(data, fieldName) {
      //console.log("documentData", documentData)
      let tempDocumentData = documentData
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      // nextCreateLink stores the next link 
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : nextCreateLink]=data
      setDocumentData(tempDocumentData)
      if(onChange) {
        if(CONST.GEOMETRY_ARRAY.includes(fieldName)) onChange(tempDocumentData, fieldName)
        else onChange(tempDocumentData)
      }
    }

    function handleChange(data, fieldName, b_boxField) { 
      //console.log("documentData", documentData)
      let tempDocumentData = documentData

      if(fieldName === CONST.B_BOX) {
        // (data, name, currentField)
        //"west"/ "south"/ "east"/ "north"
        if(!tempDocumentData.hasOwnProperty(CONST.B_BOX)) {
          tempDocumentData[CONST.B_BOX] = []
        }
   
        if(b_boxField === "west__0")  tempDocumentData[CONST.B_BOX][0] = data[0]
        else if(b_boxField === "south__1") tempDocumentData[CONST.B_BOX][1] = data[1]
        else if(b_boxField === "east__2") tempDocumentData[CONST.B_BOX][2] = data[2]
        else tempDocumentData[CONST.B_BOX][3] = data[3]
        
        setDocumentData(tempDocumentData)
        if(onChange) {
          onChange(tempDocumentData)
        }
      }
      else if(fieldName === "type") {
        tempDocumentData[fieldName]=data
        setDocumentData(tempDocumentData)
      }
      else if((documentLinkPropertyName === CONST.GEOMETRIES) && documentData[CONST.TYPE]===CONST.POINT) {
        if(!tempDocumentData.hasOwnProperty(CONST.COORDINATES_FIELD)) {
          // first entry 
          tempDocumentData[CONST.COORDINATES_FIELD] = []
          if(fieldName === "latitude__0") 
            tempDocumentData[CONST.COORDINATES_FIELD][0]=data[0] // lat
          else if(fieldName === "longitude__1") tempDocumentData[CONST.COORDINATES_FIELD][1]=data[1] // lng
        } 
        else { 
          tempDocumentData[CONST.COORDINATES_FIELD] = documentData[CONST.COORDINATES_FIELD]
          if(fieldName === "latitude__0") 
            tempDocumentData[CONST.COORDINATES_FIELD][0]=data[0] // lat
          else if(fieldName === "longitude__1") tempDocumentData[CONST.COORDINATES_FIELD][1]=data[1] // lng
        }
        setDocumentData(tempDocumentData)
        if(onChange) {
          onChange(tempDocumentData)
        }
      }
      else if((documentLinkPropertyName === CONST.GEOMETRIES) && 
        (documentData[CONST.TYPE]===CONST.LINE_STRING_TYPE || documentData[CONST.TYPE]===CONST.POLYGON)) {
        let str = fieldName
        let tmp=str.split("__")
        let index = tmp[1] // will contain the array index for linestring or polygon
        if(!tempDocumentData.hasOwnProperty(CONST.COORDINATES_FIELD)) {
          // first entry 
          tempDocumentData[CONST.COORDINATES_FIELD] = []
          tempDocumentData[CONST.COORDINATES_FIELD][index] = []
          if(fieldName === `${CONST.LATITUDE}__${index}`){ //latitude__0

            tempDocumentData[CONST.COORDINATES_FIELD][index][0]=data[0] // lat
          }
          else if(fieldName === `${CONST.LONGITUDE}__${index}`) tempDocumentData[CONST.COORDINATES_FIELD][index][1]=data[1] // lng
        } 
        else { 
          if(!tempDocumentData[CONST.COORDINATES_FIELD][index]) tempDocumentData[CONST.COORDINATES_FIELD][index] = [  ]
          tempDocumentData[CONST.COORDINATES_FIELD][index]=data[index]
        }
        setDocumentData(tempDocumentData)
        if(onChange) {
          onChange(tempDocumentData)
        }
      }
      else {
        // if field name is undefined
        // at this point means that its the document link's data 
        // so we pass linked_to as param
        // nextCreateLink stores the next link 
        //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
        tempDocumentData[fieldName ? fieldName : nextCreateLink]=data
        setDocumentData(tempDocumentData)
        if(onChange) {
          if(CONST.GEOMETRY_ARRAY.includes(fieldName)) onChange(tempDocumentData, fieldName)
          else onChange(tempDocumentData)
        }
      }
    }

    // definitions will have definitions of linked_to frames
    let definitions = util.availableInReference(reference, linked_to) ?  reference[linked_to]: extracted.properties


    for(let field in definitions.properties) { 
      linked_to = definitions.properties[field][CONST.PLACEHOLDER]
      // if field is a document link then @placeholder will point to linked document at this point
      if(util.availableInReference(reference, linked_to))  {
        // store the field name here to connect to correct changed data on create
        nextCreateLink =  field  
        // another document link 
        fields.push(<CreateDocument name={field} 
          linked_to={linked_to}
          propertyDocumentation={propertyDocumentation}
          mode={mode} 
          //hideFieldLabel={hideFieldLabel}
          linkId={linkId}
          onSelect={onSelect}
          args={args}
          depth={cardKey}
          reference={reference}
          extracted={definitions}
          onChange={handleChange}
          linkPropertyComment={linkPropertyComment}
          required={required} />)
      }
      else { 
        // internal properties
        let fieldName = definitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let defaultClassName="tdb__doc__input"
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)


        let config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: `${linked_to}__${uuidv4()}`,
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          //fieldUIFrame: fieldUIFrame, // review diff ui
          onChange: handleChange,
          defaultClassName: defaultClassName,
          currentDocumentClass: documentData[CONST.TYPE],
          propertyDocumentation: propertyDocumentation
        }

        // review fix order_by
        fields.push(documentInternalProperties(config, field))
      }
    }

    return <div className="mt-4">
      {fields} 
      {/*util.sortDocumentProperties(order_by, fields)*/}
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
 

export const CreateDisplay = ({ args, name, linkPropertyComment, order_by, reference, required, onSelect, propertyDocumentation, cardKey, linked_to, extracted, mode, onChange, action, setAction, documentData, setDocumentData, linkId }) => {
  
  return <>
    {getDocumentLinkChoiceDescription(name, linked_to)}
    <ToggleComponent action={action} setAction={setAction} toggleKey={cardKey}/> 
    <DisplayLinkFrame action={action} 
      extracted={extracted}
      required={required}
      linkId={linkId}
      args={args}
      linkPropertyComment={linkPropertyComment}
      mode={mode}
      propertyDocumentation={propertyDocumentation}
      cardKey={cardKey}
      reference={reference}
      onChange={onChange}
      onSelect={onSelect}
      order_by={order_by}
      linked_to={linked_to}
      documentLinkPropertyName={name}
      documentData={documentData} 
      setDocumentData={setDocumentData}/>
  </>
}


function getID (linkId, depth) {
  if(linkId) {
    return `${linkId}__${depth+1}`
  }
  return depth+1
}
 
// CREATE MODE
export const CreateDocument = ({ args, name, required, onSelect, reference, order_by, hideFieldLabel, linked_to, extracted, mode, onChange, depth, propertyDocumentation, linkId }) => {

  const [action, setAction] = useState(false)
  const [documentData, setDocumentData] = useState({ [CONST.TYPE]: linked_to })
  //const [cardKey, setCardKey]=useState(uuidv4())
  const [cardKey, setCardKey]=useState(getID(linkId, depth)) 

  let linkPropertyDocumentation = util.checkIfPropertyHasDocumentation(propertyDocumentation, name,args.fullFrame[CONST.SELECTED_LANGUAGE])
  let comment = linkPropertyDocumentation.hasOwnProperty("comment") ? linkPropertyDocumentation["comment"] : ""

  useEffect(() => {
    if(linked_to) setDocumentData({ [CONST.TYPE]: linked_to } )
  }, [linked_to])

  return <>
    <DisplayDocumentation documentation={propertyDocumentation}/>
    <Stack direction="horizontal">
      <TDBLabel name={name} required={required} comment={comment} className={"tdb__label__width"} hideFieldLabel={hideFieldLabel}/>
      <Card bg="secondary" className="mb-3 border border-dark w-100" key={cardKey}>
        <Card.Header>{getLinkedDescription (linked_to)}</Card.Header>
        <Card.Body>
          <CreateDisplay name={name} 
            required={required} 
            comment={comment}
            linked_to={linked_to} 
            extracted={extracted} 
            mode= {mode} 
            linkId={linkId}
            args={args}
            order_by={order_by}
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