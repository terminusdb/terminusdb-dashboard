import React, { useState } from "react"
import * as display from "../helpers/displayHelper"
import * as util from "../utils"
import * as CONST from "../constants"
import { v4 as uuidv4 } from 'uuid';
 
export const getDisplay = (props, args, property) => {
  let { fullFrame, mode, documentFrame } =  args   

  let field = documentFrame[property], 
    hideFieldLabel=props.hasOwnProperty(CONST.HIDE_FIELD_LABEL) ? props[CONST.HIDE_FIELD_LABEL] : true // always hide label for Set fields

  if(util.isDataType(field)) {  
    // DATA TYPES
    return display.displayDataTypesWidget(props, args, property, field, props.id, props.onChange) // review
  } 
  else if(util.isSubDocumentType(field)){ 
    // SUBDOCUMENT TYPE
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
  else if (util.isPointType(field)) {
    // POINT TYPE
    let id = props.id 
    let newProps = constructGeoJSONProps(props)
    if(mode === CONST.VIEW) return display.displayPointDocument(newProps, args, property, id)
    else return display.displayPointEditDocument(newProps, args, property, id)
  } 
} 


function constructGeoJSONProps(props) {
  // change in lat & lng
  function handleChange(data, name, props) {
    let tmpFormData = props.formData ? props.formData : []
    if(name === "latitude__0") tmpFormData[0] = data 
    if(name === "longitude__1") tmpFormData[1] = data 
    props.onChange(tmpFormData)
  }

  let geoJSONProps = {
    canAdd: false,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [undefined, undefined],
    idSchema: {"$id": 'root_coordinates' },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false
  }
  geoJSONProps["items"] = []
  for(let count = 0; count < 2; count++) {
    let item = {
      children: {
        props: {
          formData: props.formData ? count===0 ? props.formData[0] : props.formData[1] : undefined,
          idSchema: {"$id": `root_coordinates_${count}`},
          index: count,
          onChange: (data, name) =>  handleChange(data, name, props) ,
          required: true
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasRemove: false,
      hasMoveUp: false,
      index: count,
    }
    geoJSONProps["items"].push(item)
  }
  return geoJSONProps
}