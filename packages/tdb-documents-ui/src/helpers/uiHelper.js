import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import * as widget from "./widgetHelper"
import { getProperties, addToReference } from "../FrameHelpers"

function constructDocumentConfig(args, property, linked_to) {
  let { fullFrame, documentFrame } = args
  
  let linked_frames=fullFrame[linked_to]
  
  // change frames & type 
  let config = args
  config.type=linked_to
  config.extractedDocumentation=util.extractDocumentation(fullFrame, 
    linked_to, 
    fullFrame[CONST.SELECTED_LANGUAGE])
  config.documentFrame=linked_frames

  return config
}

function constructSubDocumentConfig(args, property) {
  let { fullFrame, documentFrame } = args
  let field = documentFrame[property]
  let linked_to=field[CONST.CLASS]
  let linked_frames=fullFrame[linked_to]
  
  // change frames & type 
  let config = args
  config.type=linked_to
  config.extractedDocumentation=util.extractDocumentation(fullFrame, 
    linked_to, 
    fullFrame[CONST.SELECTED_LANGUAGE])
  config.documentFrame=linked_frames

  return config
}

export const uiHelper = (args, property) => {

  let { fullFrame, reference, setReference } =  args

  let { documentFrame } = args  
  let field = documentFrame[property]

  if(util.isDataType(field)) {
    // DATA TYPE
    let dataType=documentFrame[property]
    return widget.getUIDisplay(args, property, dataType)
  } 
  else if(util.isSubDocumentType(field)){
    // SUBDOCUMENT TYPE
    // make a copy of args
    let argsHolder={...args}
    let linked_to=field[CONST.CLASS]
    let extracted={}
    // if linked_to definition is not available in references
    if(!util.availableInReference(reference, linked_to)){
      let config=constructSubDocumentConfig(argsHolder, property)
      extracted=getProperties(config)
    }
    else {
      // reference available 
      extracted=reference[linked_to]
    }
    // add extracted documentation 
    extracted.extractedDocumentation=argsHolder.extractedDocumentation

    // check for SubDocument MetaData
    let metaDataType=util.fetchMetaData(documentFrame, property), expanded = false
    if(metaDataType) {
      // expecting JSON at this point
      expanded=metaDataType
    }

    return widget.getSubDocumentUIDisplay(argsHolder, extracted, property, expanded)
  }
  else if(util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS
    let argsHolder={...args}
    let extracted={}
    let linked_to=field //let field = documentFrame[property]
    // if linked_to definition is not available in references
    if(!util.availableInReference(reference, linked_to)){
      //addToReference(args, {})
     
      let config=constructDocumentConfig(argsHolder, property, linked_to)
      addToReference(config, {}, linked_to)
      
      extracted=getProperties(config)
      // add extracted to references
      addToReference(args, extracted, linked_to)
     
      return widget.getDocumentUIDisplay(argsHolder, extracted, property, linked_to)
    }
    else if(reference.hasOwnProperty(linked_to) && !Object.keys(reference[linked_to]).length) {
      // here document link is available in reference but is empty
      // reference[type]
      return {}
    }
    else {
      // reference[type] will have extracted properties at this point
      return widget.getDocumentUIDisplay(argsHolder, reference[field], property, linked_to)
    }
    
  }
  else if(util.isEnumType(field)) {
    return widget.getEnumUIDisplay(args, property)
  }
}