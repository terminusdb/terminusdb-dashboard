import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import { getUIDisplay, getSubDocumentUIDisplay } from "./widgetHelper"
import { getProperties } from "../FrameHelpers"

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

  let { fullFrame, reference } =  args

  let { documentFrame } = args  
  let field = documentFrame[property]

  if(util.isDataType(field)) {
    // DATA TYPE
    let dataType=documentFrame[property]
    return getUIDisplay(args, property, dataType)
  } 
  else if(util.isSubDocumentType(field)){
    // SUBDOCUMENT TYPE
    // make a copy of args
    let argsHolder={...args}
    let linked_to=field[CONST.CLASS]
    let extracted={}
    if(!util.availableInReference(reference, linked_to)){
      let config=constructSubDocumentConfig(argsHolder, property)
      extracted=getProperties(config)
      extracted.extractedDocumentation=argsHolder.extractedDocumentation
    }

    return getSubDocumentUIDisplay(argsHolder, extracted, property)
  }
}