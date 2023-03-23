import React from "react"
import * as display from "../helpers/displayHelper"
import * as util from "../utils"
import * as CONST from "../constants"
 
export const getDisplay = (props, args, property) => {
  let { fullFrame, reference, documentFrame } =  args

  let field = documentFrame[property] 

  if(util.isDataType(field)) {
    // DATA TYPES
    return display.displayDataTypesWidget(props, args, property, "xsd:string", props.id, props.onChange) // review
  } 
  else if(util.isSubDocumentType(field)){ 
    // SUBDOCUMENT TYPE
    let id = props.id, linked_to=field[CONST.CLASS]
    let extracted=args.reference[linked_to], hideFieldLabel = true // hide label for set
    let expanded=util.checkIfSubDocumentShouldBeExapnded(documentFrame, property) 
    // set default expanded as true for now
    return display.displaySubDocument(props, args, extracted, property, true, id, hideFieldLabel, linked_to)
  }
  else if(util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS
    /*let linked_to = field 
    // at this point we will have reference available for linked_to
    let extracted=args.reference[field]
    return display.displayDocumentLink(props, args, extracted, property, linked_to) */
  }
  else if(util.isEnumType(field)) {
    // ENUM LINKS 
    let id = props.id, hideFieldLabel=true
    return display.displayEnum(args, props, property, id, hideFieldLabel)
  }
  else if(util.isSysJSONDataType(field)) {
  }
  else if(util.isChoiceSubDocumentType(field)) {
    let id = props.id
    //return display.displayChoiceSubDocument(props, args, property, id)
  }
}