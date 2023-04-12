import React, {  useEffect, useState } from "react"
import * as util from "../utils"
import * as geoTemplate from "../arrayHelpers/geoJSONTemplates"
import { TDBEnum } from "../widgets/enumWidget"
import { TDBChoiceSubDocuments } from "../widgets/choiceSubDocumentsWidget"
import { TDBOneOfDocuments } from "../widgets/oneOfDocumentsWidget"
import { getPlaceholder } from "../helpers/placeholderHelper"
import { TDBSubDocument, populateSubDocumentData } from "../widgets/subDocumentWidget"
import { TDBDocument } from "../widgets/documentWidget"
import { TDBJSON } from "../widgets/JSONWidget"
import * as CONST from "../constants"
import { TDBPointDocuments } from "../widgets/pointGeoJSONWidget"
import { TDBLineStringDocuments } from "../widgets/lineStringGeoJSONWidget"
import { TDBPolygonDocuments } from "../widgets/polygonGeoJSONWidget"
import { TDBBBoxDocuments } from "../widgets/bboxGeoJSONWidget"
import { extractPropertyDocumentation } from "./widgetHelper"
import { TDBRDFLanguage } from "../widgets/rdfLanguageWidget"
import { TDBSysUnit } from "../widgets/sysUnitWidget"
import { TDBChoiceDocuments } from "../widgets/choiceDocumentsWidget"
import { display } from "./display"



/** display widget is called for normal dattypes like xsd:string/ xsd:float etc */
export function displayDataTypesWidget(props, args, property, dataType, id, onChange) {
 
  let { documentFrame, extractedDocumentation, mode, uiFrame } = args
  let field = documentFrame[property]
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let config = {}, defaultClassName="tdb__doc__input"
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
    compareFormData: args.compareFormData,
    //key: key,
    placeholder: getPlaceholder(field), 
    index: props.index,
    className: util.getUIClassNames(uiFrame, property, defaultClassName, props.index),
    onChange: onChange,
    documentation: documentation,
    hideFieldLabel: props.hideFieldLabel
  }
  return display(config)
}

// SUBDOCUMENTs 
export function displaySubDocument(props, args, extracted, property, expanded, id, hideFieldLabel, linked_to) { 
  const [subDocumentData, setSubDocumentData] = useState({})
  let { fullFrame, extractedDocumentation, mode, uiFrame, reference } = args

  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]
  // constants to control sub document data 
  util.checkForSysUnit (args, props, linked_to)
  //let populated = populateSubDocumentData(mode, linked_to, props.formData)
  //const [subDocumentData, setSubDocumentData] = useState(populated)
  

  // linked_to changes 
  useEffect(() => {
    // pass linked_to in use Effect since the same widget is used for choice subdocuemnts & one ofs
    if(linked_to) {
      let populated = populateSubDocumentData(mode, linked_to, props.formData, args.documentFrame)
      setSubDocumentData(populated)
    }
  }, [linked_to])

  // get order_by
  // at this point linked_to in fullframe
  let order_by = false
  if(fullFrame.hasOwnProperty(linked_to)) {
    order_by=util.getOrderBy(fullFrame, linked_to) 
  }

  // add logic for required properties  
  return  <TDBSubDocument extracted={extracted} 
    id={id}
    //uiFrame={uiFrame}
    args={args}
    hideFieldLabel={hideFieldLabel}
    order_by={order_by}
    expanded={expanded}
    subDocumentData={subDocumentData} 
    setSubDocumentData={setSubDocumentData}
    comment={documentation.comment ? documentation.comment : null} 
    //mode={mode}
    index={props.index}
    propertyDocumentation={extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage)}
    linked_to={linked_to}
    props={props}/>
}

// DOCUMENT LINKS 
export function displayDocumentLink(props, args, extracted, property, linked_to, hideFieldLabel) { 

  let { fullFrame, onTraverse, mode, onSelect, uiFrame, reference } = args
  let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  // at this point linked_to in fullframe
  let order_by = false
  if(fullFrame.hasOwnProperty(linked_to)) {
    order_by=util.getOrderBy(fullFrame, linked_to)
  }

  // add logic for required properties 
  return  <TDBDocument extracted={extracted}  
    linkId={props.hasOwnProperty("id") ? props["id"] : null}
    //comment={documentation.comment ? documentation.comment : null} 
    mode={mode}
    args={args}
    uiFrame={uiFrame}
    order_by={order_by}
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

// SYS:Unit
export function displaySysUnitWidget(args, props, property, id, hideFieldLabel) {
  let { uiFrame, mode, extractedDocumentation } = args 
    
  
  let documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property)
  let label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name
  let defaultClassName = "tdb__doc__input"

  // add logic for required properties 
  return  <TDBSysUnit name={label}
    value={props.formData}
    hideFieldLabel={hideFieldLabel}
    mode={mode}
    className={util.getUIClassNames(uiFrame, property, defaultClassName, props.index)}
    comment={documentation.comment ? documentation.comment : null} 
    id={id}
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

// ONE OF 
export function displayOneOfProperty(props, args, property, id) {
  const [oneOfDocumentData, setOneOfDocumentData] = useState(props.formData ? props.formData : {})

  useEffect(() => {
    // formdata on change
    if(props.formData) setOneOfDocumentData(props.formData)
  }, [props.formData])
 
  return  <TDBOneOfDocuments args={args}
    property={property}
    oneOfDocumentData={oneOfDocumentData} 
    setOneOfDocumentData={setOneOfDocumentData}
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
export function displayPointEditDocument (props, args, property) {

  let argsHolder = {...args}
  argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
  return geoTemplate.PointFieldTemplate(argsHolder, props, property) 
}

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
export function displayLineStringEditDocument (props, args, property) {
  
  let argsHolder = {...args}
  argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
  return geoTemplate.LineStringFieldTemplate(argsHolder, props, property) 
}

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
export function displayPolygonEditDocument (props, args, property) {
  return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property)
}

// MULTIPOLYGON
export function displayMultiPolygonEditDocument(props, args, property) {
  return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property)
}


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
export function displayBBoxEditDocument(args, props, property) {
  let argsHolder = {...args}
  argsHolder.documentFrame={ [property]: args.documentFrame[property][CONST.CLASS] }
  return geoTemplate.BBoxFieldTemplate(argsHolder, props, property)
}


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

