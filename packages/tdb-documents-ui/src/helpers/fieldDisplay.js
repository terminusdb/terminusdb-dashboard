import React, { useState } from "react"
import * as display from "../helpers/displayHelper"
import * as util from "../utils"
import * as CONST from "../constants"
import { v4 as uuidv4 } from 'uuid';
import * as geo from "../arrayHelpers/geoJsonProps" 
 
export const getDisplay = (props, args, property) => {
  let { fullFrame, mode, documentFrame } =  args   

  if(property === "bbox") {
    console.log("bb")
  }

  let field = documentFrame[property], 
    hideFieldLabel=props.hasOwnProperty(CONST.HIDE_FIELD_LABEL) ? props[CONST.HIDE_FIELD_LABEL] : true // always hide label for Set fields

  if(util.isDataType(field)) {  
    // DATA TYPES
    //(props, args, property, dataType, id, onChange) 
    return display.displayDataTypesWidget(props, args, property, field, props.id, props.onChange) // review
  } 
  else if(util.isSubDocumentType(field)){ 
    // SUBDOCUMENT TYPE
    if(props.mode === CONST.VIEW && props.formData === "") return <div/>
    let id = props.id, linked_to=field[CONST.CLASS]
    let extracted=args.reference[linked_to]
    let expand=props.isArray ? true : props.expand
    // set default expanded as true for now 
    return display.displaySubDocument(props, args, extracted, property, expand, id, hideFieldLabel, linked_to)
  }
  else if(util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS 
    let linked_to = field
    // at this point we will have reference available for linked_to
    let extracted=args.reference[field]
    return display.displayDocumentLink(props, args, extracted, property, linked_to, hideFieldLabel)
  }
  else if(util.isEnumType(field)) {
    // ENUM LINKS 
    let id = props.id
    return display.displayEnum(args, props, property, id, hideFieldLabel)
  }
  else if(util.isSysJSONDataType(field)) {
    // SYS JSON 
    let id=props.id
    return display.displayJSON(props, args, property, id, hideFieldLabel)
  }
  else if(util.isChoiceDocumentType(field, fullFrame)){
    // CHOICE DOCUMENTS 
    let id = props.id
    return display.displayChoiceDocument(props, args, property, id)
  }
  else if(util.isChoiceSubDocumentType(field)) {
    // CHOICE SUB DOCUMENTS 
    let id = props.id
    return display.displayChoiceSubDocument (props, args, property, id) 
  }
  else if(util.isOneOfDataType(documentFrame, property)) {
    // ONE OF 
    let id = props.id
    return display.displayOneOfProperty (props, args, property, id)
  }
  else if(util.isRdfLangString(field)) {
    // RDF LANGUAGE
    let id = props.id
    return display.displayRDFLanguageWidget (args, props, property, id, hideFieldLabel)
  }
  else if (util.isSysUnitDataType(field)) {
    // SYS unit
    let id = props.id
    return display.displaySysUnitWidget (args, props, property, id, hideFieldLabel)
  }
  else if(util.isBBoxType(field, property)){
    let id = props.id 
    let newProps = geo.constructBBoxProps(props)
    if(mode === CONST.VIEW) return display.displayBBoxDocument(newProps, args, property, id)
    else return display.displayBBoxEditDocument(args, newProps, property, id) //(newProps, args, property, id)
  }
  else if (util.isPointType(field)) {
    // POINT TYPE
    let id = props.id 
    let newProps = geo.constructGeoJSONProps(props)
    if(mode === CONST.VIEW) return display.displayPointDocument(newProps, args, property, id)
    else return display.displayPointEditDocument(newProps, args, property, id)
  } 
  else if (util.isLineStringType(field)) {
    // LINE STRING 
    let id = props.id 
    let newProps = geo.constructLineStringProps(props)
    if(mode === CONST.VIEW) return display.displayLineStringDocument(newProps, args, property, id)
    else return display.displayLineStringEditDocument(newProps, args, property, id)
  }
  else if (util.isPolygonType(field)) {
    // POLYGON TYPE
    let id = props.id 
    let newProps = geo.constructLineStringProps(props)
    if(mode === CONST.VIEW) return display.displayPolygonDocument(newProps, args, property, id)
    else return display.displayLineStringEditDocument(newProps, args, property, id)
  }
  else if(util.isPolygonType(field) && 
    props.hasOwnProperty("currentDocumentClass") &&
    props.currentDocumentClass===CONST.MULTIPOLYGON) {
    // MULTIPOLYGON 
    let id = props.id 
    let newProps = geo.constructLineStringProps (props)
    if(mode === CONST.VIEW) return display.displayPolygonDocument(newProps, args, property, id)
    else return display.displayLineStringEditDocument(newProps, args, property, id)
  }
} 
