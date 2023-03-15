import React from "react"
import * as util from "../utils"
import { TDBInput } from "../widgets/inputWidgets"
import { TDBBoolean } from "../widgets/booleanWidget"
import { TDBDateTime, TDBDate } from "../widgets/dateWidgets"
import { TDBEnum } from "../widgets/enumWidget"
import { TDBChoiceDocuments } from "../widgets/choiceDocumentsWidget"
import * as TYPE from "../dataType.constants"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBSubDocument } from "../widgets/subDocumentWidget"
import { TDBDocument } from "../widgets/documentWidget"
import { TDBMarkdown } from "../widgets/markdownWidget"
import { TDBJSON } from "../widgets/JSONWidget"
import * as CONST from "../constants"
import { extractPropertyDocumentation } from "./widgetHelper"

/** displays widgets according to dataType */
export function display (config) {
  switch(config.dataType) { 
    case TYPE.XSD_BOOLEAN: 
      //XSD_BOOLEAN
      return <TDBBoolean name={config.name} 
        hideFieldLabel={config.hideFieldLabel}
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
      hideFieldLabel={config.hideFieldLabel}
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
        hideFieldLabel={config.hideFieldLabel}
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
        hideFieldLabel={config.hideFieldLabel}
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
        hideFieldLabel={config.hideFieldLabel}
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

/** display widget is called for normal dattypes like xsd:string/ xsd:float etc */
export function displayDataTypesWidget(props, args, property, dataType, id, onChange) {

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

  // condtruct a config object 
  config = {
    dataType: dataType,
    name: props.name,
    formData: props.formData,
    required: props.required,
    mode: mode,
    id: id, 
    placeholder: getPlaceholder(field),
    className: "tdb__doc__input",
    onChange: onChange,
    documentation: documentation,
    hideFieldLabel: props.hideFieldLabel
  }
  return display(config)
}

// SUBDOCUMENTs
export function displaySubDocument(props, args, extracted, property, expanded) { 

  let { fullFrame, extractedDocumentation, mode, type, documentFrame } = args
  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  // checks for metaData => render_as { expanded: true/ false }
  // will decide to expand subdocuments accordingly 

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

// DOCUMENT LINKS 
export function displayDocumentLink(props, args, extracted, property, linked_to) { 

  let { fullFrame, onTraverse, mode, onSelect, documentFrame, reference } = args
  let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  // add logic for required properties 
  return  <TDBDocument extracted={extracted}  
    linkId={props.hasOwnProperty("id") ? props["id"] : null}
    //comment={documentation.comment ? documentation.comment : null} 
    mode={mode}
    onSelect={onSelect}
    reference={reference}
    onTraverse={onTraverse}
    propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
    linked_to={linked_to}
    unfoldable={util.isUnfoldable(documentFrame)}
    props={props}/>
}

// ENUMs
export function displayEnum(args, props, property) {

  let { documentFrame, mode, fullFrame } = args 
    
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

// SYS:JSON
export function displayJSON(props, args, property) {
  
  let { mode, extractedDocumentation } = args 

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  return <TDBJSON name={props.name}
    value={props.formData}
    mode={mode}
    comment={documentation.comment ? documentation.comment : null} 
    id={props.idSchema["$id"]}
    onChange={props.onChange}
    required={props.required}/>
}

// CHOICE SUB DOCUMENTS 
export function displayChoiceSubDocument (props, args, property) {
  let { fullFrame, mode, documentFrame, reference } = args
  //let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  //let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  // add logic for required properties 
  return  <TDBChoiceDocuments args={args}
    property={property}
    props={props}/>
}