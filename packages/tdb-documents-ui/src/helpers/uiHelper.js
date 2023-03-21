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

function constructSubDocumentConfig(args, property, field) {
  let { fullFrame, documentFrame } = args
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

  let { fullFrame, reference, documentFrame } =  args

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
      let field = documentFrame[property]
      let config=constructSubDocumentConfig(argsHolder, property, field)
      extracted=getProperties(config)
      // add extracted to references
      addToReference(args, extracted, linked_to)
    }
    else {
      // reference available 
      extracted=reference[linked_to]
    }
    // add extracted documentation 
    extracted.extractedDocumentation=argsHolder.extractedDocumentation
    let expanded=util.checkIfSubDocumentShouldBeExapnded(documentFrame, property) 
    
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
      // add extracted documentation 
      extracted.extractedDocumentation=config.extractedDocumentation
      
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
  else if(util.isSysJSONDataType(field)) {
    return widget.getJSONUIDisplay(args, property)
  }
  else if(util.isChoiceSubDocumentType(field)) {
    
    
    field.map(subDocs => {
      let argsHolder={...args}
      let linked_to=subDocs[CONST.CLASS]
      let extracted={}
      // if linked_to definition is not available in references
      if(!util.availableInReference(reference, linked_to)){
        let config=constructSubDocumentConfig(argsHolder, property, subDocs)
        extracted=getProperties(config)
        // add extracted documentation 
        extracted.extractedDocumentation=argsHolder.extractedDocumentation

        // check for SubDocument MetaData
        let metaDataType=util.fetchMetaData(documentFrame, property), expanded = false
        if(metaDataType) {
          // expecting JSON at this point
          expanded=metaDataType
        } 
        // add extracted to references
        addToReference(args, extracted, linked_to)
      }
      else {
        // reference available 
        extracted=reference[linked_to]
      }
    })

    
    return widget.getChoiceSubDocumentUIDisplay(args, property)
  }
  else if(util.isChoiceDocumentType(field, fullFrame)){
    // CHOICE DOCUMENTS 
    

    field.map(choices => {
      let argsHolder={...args}
      let linked_to=choices
      let extracted={}
      // if linked_to definition is not available in references
      if(!util.availableInReference(reference, linked_to)){
        //let config=constructSubDocumentConfig(argsHolder, property, subDocs)
        let config=constructDocumentConfig(argsHolder, property, linked_to) 
        extracted=getProperties(config)
        // add extracted documentation 
        extracted.extractedDocumentation=argsHolder.extractedDocumentation

        // check for SubDocument MetaData
        let metaDataType=util.fetchMetaData(documentFrame, property), expanded = false
        if(metaDataType) {
          // expecting JSON at this point
          expanded=metaDataType
        } 
        // add extracted to references
        addToReference(args, extracted, linked_to)
      }
      else {
        // reference available 
        extracted=reference[linked_to]
      }
    })

    return widget.getChoiceDocumentUIDisplay(args, property)
  }
  else if(util.isBBoxType(field, property)){
    return widget.getBBoxUIDisplay(args, property)
  }
  else if (util.isPointType(field)) {
    return widget.getPointUIDisplay(args, property)
  } 
  else if (util.isLineStringType(field)) {
    return widget.getlineStringUIDisplay(args, property)
  } 
}