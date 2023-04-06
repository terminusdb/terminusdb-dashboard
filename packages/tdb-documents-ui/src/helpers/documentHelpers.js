import React, { useState, useEffect } from "react"
import * as CONST from "../constants";
import * as util from "../utils"
import { getDisplay } from "../helpers/fieldDisplay"
import { displayDocumentFieldArrayHelpers } from "./documentFieldArrayHelpers"
import { Container } from "react-bootstrap";

function addUiFrameForEachField(docConfig, property) {
  // This is mostly used to set the ui frame per fields in diff view
  if(docConfig.hasOwnProperty("fieldUIFrame") && docConfig["fieldUIFrame"].hasOwnProperty(property)) {
    return { [property] : docConfig["fieldUIFrame"][property] }
  } 
  return {}
}

// keeps tab of internal properties and store their types - if array/ mandatory/ optional
function extractDocumentFrame(currentDocumentClass, fullFrame, property) {
  let documentFrame = fullFrame[currentDocumentClass]
 
  if(util.isArrayTypeFromFrames(documentFrame, property)) {
    // ARRAY TYPE
    return { [CONST.TYPE]: documentFrame[property][CONST.TYPE] , propertyFrame: documentFrame[property][CONST.CLASS] }
  }
  else if(util.isOptional(documentFrame, property)) {
    // OPTIONAL
    return { [CONST.TYPE]: CONST.OPTIONAL, propertyFrame: documentFrame[property][CONST.CLASS] }
  }
  else {
    // MANDATORY
    return { propertyFrame: documentFrame ? 
      documentFrame.hasOwnProperty(property) ? documentFrame[property] : documentFrame 
      : currentDocumentClass }
  }
}

/** get data of property which have been selected for one ofs */
function getPropertyName(docConfig) {
  // only @type wil be defined if length 1
  if(Object.keys(docConfig.formData).length === 1) return { data: undefined, [CONST.ONEOF_SELECTED]: false }
  /*if(Object.keys(docConfig.formData).length > 2) {
    let newFormData = {}
    newFormData[CONST.TYPE] = docConfig.formData[CONST.TYPE]
  }*/
  for(let items in docConfig.formData) {
    if(items === CONST.TYPE) continue
    else return { data: docConfig.formData[items], [CONST.ONEOF_SELECTED]: items } // some choice in one of will be populated => return its data 
  }
  return { data: undefined, [CONST.ONEOF_SELECTED]: false }
}

// construct props for optional/ mandatory types
function constructProps(fieldID, field, expanded, docConfig) {
  // props to control documents props

  let data = null, selectedForOneOf = null
  if(field === CONST.ONEOFVALUES) {
    let extractedData = getPropertyName(docConfig)
    data = extractedData.data
    selectedForOneOf=extractedData[CONST.ONEOF_SELECTED]
  }
  else data = docConfig.formData[field]

  let props = {
    id: fieldID, 
    name: field,  
    expand: expanded,
    required: docConfig.required,
    //formData: docConfig.formData[field],
    //onChange: (data) => docConfig.onChange(data, field), 
    formData: data,
    //onChange: (data, name) => docConfig.onChange(data, field, name), 
    onChange: (data, name, selectedOneOf) => docConfig.onChange(data, field, selectedOneOf), 
    hideFieldLabel: false,
    mode: docConfig.mode
  }
  if(field === CONST.ONEOFVALUES) {
    props[CONST.ONEOF_SELECTED] = selectedForOneOf
  }
  return props
} 
 
export function documentInternalProperties(docConfig, field) {
  let fields = []

  // gather field info 
  let fieldName =  docConfig.properties[field].title 
  let fieldID=docConfig.id //: `root_${docConfig.propertyName}_${fieldName}`
  /*if(docConfig.id) {
    // id will be filled if Sets/List
    fieldID=`${docConfig.id}_${fieldName}`
  }*/

  // subdocument formdata will have type assosciated with it other wise its some other data types
  //let currentDocumentClass= docConfig.formData && docConfig.formData[CONST.TYPE] ? 
    //docConfig.formData[CONST.TYPE] : docConfig.properties[field][CONST.PLACEHOLDER]

    //currentDocumentClass = "Person"
  let currentDocumentClass= docConfig.currentDocumentClass

  /**
   * let currentDocumentClass= docConfig.formData && docConfig.formData[CONST.TYPE] ? 
    docConfig.formData[CONST.TYPE] : 
    docConfig.properties[field][CONST.PLACEHOLDER].hasOwnProperty(CONST.CLASS) ?
    docConfig.properties[field][CONST.PLACEHOLDER][CONST.CLASS] : 
    docConfig.properties[field][CONST.PLACEHOLDER]
   */

  // construct document frame to get UI 
  let documentFrame = extractDocumentFrame(currentDocumentClass, docConfig.args.fullFrame, field)
  if(documentFrame.propertyFrame.hasOwnProperty(CONST.TYPE) && 
    documentFrame.propertyFrame[CONST.TYPE] === CONST.ENUM) {
    if(!documentFrame.propertyFrame.hasOwnProperty("@id")) {
      // enum definition
      documentFrame.propertyFrame["@id"] = currentDocumentClass
    }
  }

  // pass on newly formed document frame
  let args = docConfig.args
  let argsHolder = {...args}
  //argsHolder.documentFrame = documentFrame
  argsHolder.documentFrame = { [field]: documentFrame.propertyFrame }
  argsHolder.extractedType = documentFrame[CONST.TYPE]
  

  if(util.isArrayType(argsHolder.extractedType)) {
    // if array, we expect formData to be an object type
    fields.push(displayDocumentFieldArrayHelpers(fieldID, field, null, argsHolder, docConfig))
  }
  else {
    //normal data types we expect formData to be an string/ number type
    let props = constructProps(fieldID, field, null, docConfig)
    argsHolder.uiFrame = addUiFrameForEachField(docConfig, field) 
    let propertyUIDisplay = getDisplay (props, argsHolder, field)
    fields.push(propertyUIDisplay)  
  }

  return fields

}

/**
 * 
 * @param {*} docConfig 
 * @returns display internal properties of subdocuments/ document links - any documents which has nested
 * properties inside it
 */
export function displayInternalProperties (docConfig) { 

  let subDocumentFields=[]  

  // loop through subdocument properties
  for(let field in docConfig.properties) { 

    // gather field info 
    let fieldName =  docConfig.properties[field].title 
    let fieldID=`root_${docConfig.propertyName}_${fieldName}`
    if(docConfig.id) {
      // id will be filled if Sets/List
      fieldID=`${docConfig.id}_${fieldName}`
    }

    // subdocument formdata will have type assosciated with it other wise its some other data types
    let currentDocumentClass= docConfig.formData && docConfig.formData[CONST.TYPE] ? 
      docConfig.formData[CONST.TYPE] : docConfig.properties[field][CONST.PLACEHOLDER]
    // get original args.documentFrame to get @metadata info
    let expanded=util.checkIfSubDocumentShouldBeExpanded(docConfig.args.documentFrame, field) 

    // construct document frame to get UI 
    let documentFrame = extractDocumentFrame(currentDocumentClass, docConfig.args.fullFrame, field)

    // pass on newly formed document frame
    let args = docConfig.args
    let argsHolder = {...args}
    //argsHolder.documentFrame = documentFrame
    argsHolder.documentFrame = { [field]: documentFrame.propertyFrame }
    argsHolder.extractedType = documentFrame[CONST.TYPE]
    

    if(util.isArrayType(argsHolder.extractedType)) {
      // if array, we expect formData to be an object type
      subDocumentFields.push(displayDocumentFieldArrayHelpers(fieldID, field, expanded, argsHolder, docConfig))
    }
    else {
      //normal data types we expect formData to be an string/ number type
      let props = constructProps(fieldID, field, expanded, docConfig)
      argsHolder.uiFrame = addUiFrameForEachField(docConfig, field)
      let propertyUIDisplay = getDisplay (props, argsHolder, field)
      subDocumentFields.push(propertyUIDisplay)  
    }
    
     
  } 

  return subDocumentFields
}