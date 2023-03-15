import React from "react"
import * as display from "../helpers/displayHelper"
import * as util from "../utils"
import * as CONST from "../constants"
 
export const getDisplay = (props, args, property) => {
  let { fullFrame, reference, documentFrame } =  args

  let field = documentFrame[property]

  if(util.isDataType(field)) {
    //displayDataTypesWidget(props, args, property, dataType, id, onChange)
    return display.displayDataTypesWidget(props, args, property, "xsd:string", props.id, props.onChange) // review
  } 
  else if(util.isSubDocumentType(field)){
    // SUBDOCUMENT TYPE
    // make a copy of args
  }
  else if(util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS
    let linked_to = field 
    // at this point we will have reference available for linked_to
    let extracted=args.reference[field]
    return display.displayDocumentLink(props, args, extracted, property, linked_to)
  }
  else if(util.isEnumType(field)) {
  }
  else if(util.isSysJSONDataType(field)) {
  }
}