import React, {  useState } from "react"
import * as util from "../utils"
import { TDBInput } from "../widgets/inputWidgets"
import { TDBBoolean } from "../widgets/booleanWidget"
import { TDBDateTime, TDBDate } from "../widgets/dateWidgets"
import { TDBEnum } from "../widgets/enumWidget"
import { TDBChoiceSubDocuments } from "../widgets/choiceSubDocumentsWidget"
import * as TYPE from "../dataType.constants"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBSubDocument, populateSubDocumentData } from "../widgets/subDocumentWidget"
import { TDBDocument } from "../widgets/documentWidget"
import { TDBMarkdown } from "../widgets/markdownWidget"
import { TDBJSON } from "../widgets/JSONWidget"
import * as CONST from "../constants"
import { TDBPointDocuments } from "../widgets/pointGeoJSONWidget"
import { TDBLineStringDocuments } from "../widgets/lineStringGeoJSONWidget"
import { TDBPolygonDocuments } from "../widgets/polygonGeoJSONWidget"
import { TDBBBoxDocuments } from "../widgets/bboxGeoJSONWidget"
import { extractPropertyDocumentation } from "./widgetHelper"
import { TDBRDFLanguage } from "../widgets/rdfLanguageWidget"
import { TDBChoiceDocuments } from "../widgets/choiceDocumentsWidget"

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
        isKey={config.isKey}
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
      isKey={config.isKey}
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
        isKey={config.isKey}
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
        isKey={config.isKey}
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
    isKey: util.checkIfKey(property, documentFrame["@key"]),
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
export function displaySubDocument(props, args, extracted, property, expanded, id, hideFieldLabel, linked_to) { 

  let { fullFrame, extractedDocumentation, mode, type,  } = args
 
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  // constants to control sub document data 
  let populated = populateSubDocumentData(mode, linked_to, props.formData)
  const [subDocumentData, setSubDocumentData] = useState(populated)
  

  // add logic for required properties  
  return  <TDBSubDocument extracted={extracted} 
    id={id}
    hideFieldLabel={hideFieldLabel}
    expanded={expanded}
    subDocumentData={subDocumentData} 
    setSubDocumentData={setSubDocumentData}
    comment={documentation.comment ? documentation.comment : null} 
    mode={mode}
    propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
    linked_to={linked_to}
    props={props}/>
}

// DOCUMENT LINKS 
export function displayDocumentLink(props, args, extracted, property, linked_to, hideFieldLabel) { 

  let { fullFrame, onTraverse, mode, onSelect, documentFrame, reference } = args
  let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  // add logic for required properties 
  return  <TDBDocument extracted={extracted}  
    linkId={props.hasOwnProperty("id") ? props["id"] : null}
    //comment={documentation.comment ? documentation.comment : null} 
    mode={mode}
    hideFieldLabel={hideFieldLabel}
    onSelect={onSelect}
    reference={reference}
    onTraverse={onTraverse}
    propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
    linked_to={linked_to}
    unfoldable={util.isUnfoldable(fullFrame[linked_to])}
    props={props}/>
}

// ENUMs
export function displayEnum (args, props, property, id, hideFieldLabel) {

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
    hideFieldLabel={hideFieldLabel}
    enumDocumentClass={enumDocumentClass}
    value={props.formData}
    mode={mode}
    label={label}
    id={id}
    onChange={props.onChange}
    required={props.required}/>
}

// rdf:language
export function displayRDFLanguageWidget (args, props, property, id, hideFieldLabel){

  let { documentFrame, mode, extractedDocumentation } = args 
    
  
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name

  // add logic for required properties 
  return  <TDBRDFLanguage name={label}
    formData={props.formData}
    hideFieldLabel={hideFieldLabel}
    mode={mode}
    className={"tdb__doc__input"}
    comment={documentation.comment ? documentation.comment : null} 
    id={id}
    onChange={props.onChange}
    required={props.required}/>
}

// SYS:JSON
export function displayJSON(props, args, property, id, hideFieldLabel) {
  
  let { mode, extractedDocumentation } = args 

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  return <TDBJSON name={props.name}
    value={props.formData}
    mode={mode}
    hideFieldLabel={hideFieldLabel}
    comment={documentation.comment ? documentation.comment : null} 
    id={id}
    onChange={props.onChange}
    required={props.required}/>
}

// CHOICE SUB DOCUMENTS 
export function displayChoiceSubDocument (props, args, property, id) {
  //let { fullFrame, mode, documentFrame, reference } = args
  //let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  //let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  //const [extractedData, setExtractedData] = useState(props.formData ? props.formData : {})
  const [choiceSubDocumentData, setChoiceSubDocumentData] = useState(props.formData ? props.formData : {})

  // add logic for required properties  
  return  <TDBChoiceSubDocuments args={args}
    property={property}
    choiceSubDocumentData={choiceSubDocumentData} 
    setChoiceSubDocumentData={setChoiceSubDocumentData}
    id={id}
    props={props}/>
}

// CHOICE DOCUMENTS 
export function displayChoiceDocument(props, args, property, id) {
  const [choiceDocumentData, setChoiceDocumentData] = useState(props.formData ? props.formData : {})

  // add logic for required properties  
  return  <TDBChoiceDocuments args={args}
    property={property}
    choiceDocumentData={choiceDocumentData} 
    setChoiceDocumentData={setChoiceDocumentData}
    id={id}
    props={props}/>
}

// POINT DOCUMENTS 
export function displayPointDocument (props, args, property, id) {


  let { mode, extractedDocumentation, documentFrame, formData } = args 

  
  let bounds= util.checkIfBoundsAvailable( documentFrame, formData)

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  let config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  }

  return <TDBPointDocuments config={config}/>
}

// LINE STRING 
export function displayLineStringDocument(props, args, property, id) {


  let { mode, extractedDocumentation, documentFrame, formData } = args 

  
  let bounds= util.checkIfBoundsAvailable( documentFrame, formData)

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  let config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  }

  return <TDBLineStringDocuments config={config}/>
}

// POLYGON
export function displayPolygonDocument (props, args, property, id) {


  let { mode, extractedDocumentation, documentFrame, formData } = args 

  
  let bounds= util.checkIfBoundsAvailable( documentFrame, formData)

  //let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  let config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  }

  return <TDBPolygonDocuments config={config}/>
}


// B_BOX 
export function displayBBoxDocument (props, args, property, id) {


  let { mode, extractedDocumentation, documentFrame, formData } = args 

  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)

  let config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required
  }

  return <TDBBBoxDocuments config={config}/>
}
