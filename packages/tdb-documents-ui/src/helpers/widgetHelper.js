import React from "react"
import * as util from "../utils"
import { TDBInput } from "../widgets/inputWidgets"
import { TDBBoolean } from "../widgets/booleanWidget"
import { TDBDateTime, TDBDate } from "../widgets/dateWidgets"
import { TDBEnum } from "../widgets/enumWidget"
import * as TYPE from "../dataType.constants"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBSubDocument } from "../widgets/subDocumentWidget"
import { TDBDocument } from "../widgets/documentWidget"
import { TDBMarkdown } from "../widgets/markdownWidget"
import { TDBJSON } from "../widgets/JSONWidget"
import * as CONST from "../constants"

/** displays widgets according to dataType */
export function display (config) {
  switch(config.dataType) { 
    case TYPE.XSD_BOOLEAN: 
      //XSD_BOOLEAN
      return <TDBBoolean name={config.name} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        value={config.formData} 
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
    case TYPE.XSD_DATE_TIME:
      //XSD_DATE_TIME
      return <TDBDateTime name={config.name} 
      value={config.formData} 
      label={config.documentation.label}
      comment={config.documentation.comment}
      required={config.required}
      mode={config.mode} 
      id={config.id}
      placeholder={config.placeholder} 
      className={config.className} 
      onChange={config.onChange}/>

    case TYPE.XSD_DATE:
        //XSD_DATE
        return <TDBDate name={config.name} 
        value={config.formData} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>

    case TYPE.MARKDOWN: 
      return <TDBMarkdown name={config.name} 
        value={config.formData} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        className={config.className} 
        onChange={config.onChange}/>

    default: 
      // ALL OTHER DATA TYPES
      return <TDBInput name={config.name} 
        value={config.formData} 
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
  }
}

// NORMAL DATA TYPES
export function getUIDisplay (args, property, dataType) {

  let { documentFrame, extractedDocumentation, mode } = args
  let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let config = {}
  // checks for metaData => render_as markdown
  let metaDataType=util.fetchMetaData(documentFrame, property) 
  if(metaDataType) {
    // expecting a string metadata type
    dataType=metaDataType
  }

  function displayWidget(props) {
    // normal data type inputa are being called here 
    // function expects input data and id of field into which user event occurs
    function handleChange(data, id) {
      if(props.onChange) props.onChange(data)
    }
  
    // condtruct a config object 
    config = {
      dataType: dataType,
      name: props.name,
      formData: props.formData,
      required: props.required,
      mode: mode,
      id: props.idSchema["$id"], 
      placeholder: getPlaceholder(field),
      className: "tdb__doc__input",
      onChange: handleChange,
      documentation: documentation
    }
    return display(config)
  }

  return { "ui:field": displayWidget }
}

// retrieves declaration for selected language
function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if(!Array.isArray(extractedDocumentation)) {
    throw new Error(`Expected extracted documentation to be an array, but instead got ${extractedDocumentation}`)
  }
  let filtered = extractedDocumentation.filter( arr => arr[CONST.SELECTED_LANGUAGE] === selectedLanguage)
  return filtered[0]
}

// SUBDOCUMENT UI
export function getSubDocumentUIDisplay (args, extracted, property, expanded) {
  // at this point extracted will have all of the extracted documents from linked_to

  let { fullFrame, extractedDocumentation, mode, type, documentFrame } = args
  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  // checks for metaData => render_as { expanded: true/ false }
  // will decide to expand subdocuments accordingly 
  

  function displaySubDocumentWidget(props) { 
    // add logic for required properties 
    return  <TDBSubDocument extracted={extracted} 
      id={props.idSchema["$id"]}
      expanded={expanded}
      comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={type}
      props={props}/>
  }
  return  { "ui:field": displaySubDocumentWidget }
}

// DOCUMENT LINKS UI  
export function getDocumentUIDisplay (args, extracted, property, linked_to) {

  let { fullFrame, extractedDocumentation, onTraverse, mode, onSelect, documentFrame, reference } = args

  function displayDocumentLinkWidget(props) {

    // add logic for required properties 
    return  <TDBDocument extracted={extracted} 
      //id={props.idSchema["$id"]}
      //comment={documentation.comment ? documentation.comment : null} 
      mode={mode}
      onSelect={onSelect}
      reference={reference}
      onTraverse={onTraverse}
      //propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
      linked_to={linked_to}
      unfoldable={util.isUnfoldable(documentFrame)}
      props={props}/>
  }
  return  { "ui:field": displayDocumentLinkWidget }
}
 
// ENUM UI 
export function getEnumUIDisplay(args, property) {
  let { documentFrame, mode, fullFrame } = args 

  function displayEnumWidget(props) {
    
    let enumDocumentClass=documentFrame[props.name]["@id"]
    let options = documentFrame[property]["@values"]
    let documentation = util.extractEnumComment(fullFrame, enumDocumentClass, options, props.name)
    let label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name
    if(documentation && documentation.hasOwnProperty(CONST.VALUES)) {
      options=documentation[CONST.VALUES]
    }
    // add logic for required properties 
    return  <TDBEnum name={props.name}
      options={options}
      enumDocumentClass={enumDocumentClass}
      value={props.formData}
      mode={mode}
      label={label}
      id={props.idSchema["$id"]}
      onChange={props.onChange}
      required={props.required}/>
  }
  return { "ui:field": displayEnumWidget }
}

// SYS:JSON 
export function getJSONUIDisplay(args, property) {
  
  let { mode, extractedDocumentation } = args 

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  function displayEnumWidget(props) {
    
    return <TDBJSON name={props.name}
      value={props.formData}
      mode={mode}
      comment={documentation.comment ? documentation.comment : null} 
      id={props.idSchema["$id"]}
      onChange={props.onChange}
      required={props.required}/>
  }
  return { "ui:field": displayEnumWidget }
}
 