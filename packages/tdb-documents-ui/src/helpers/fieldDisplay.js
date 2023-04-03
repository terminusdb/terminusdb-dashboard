import React from "react"
import * as display from "../helpers/displayHelper"
import * as util from "../utils"
import * as CONST from "../constants"
import { v4 as uuidv4 } from 'uuid';
 
export const getDisplay = (props, args, property) => {
  let { fullFrame, reference, documentFrame } =  args   

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
    return display.displayPointEditDocument(props, args, property, id)
  } 

}