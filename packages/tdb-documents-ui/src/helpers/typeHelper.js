

import * as CONST from "../constants"
import * as util from "../utils"
import * as TYPE from "../dataType.constants"

export const typeHelper = (documentFrame, property, fullFrame) => {

  let field = documentFrame[property]

  if(util.isDataType(field)) {
    // DATA TYPE
    if(field === TYPE.XSD_BOOLEAN)
      return CONST.BOOLEAN_TYPE
    return CONST.STRING_TYPE
  } 
  else if(util.isSubDocumentType(field)){
    // SUBDOCUMENT TYPE
    return CONST.OBJECT_TYPE
  }
  else if(util.isDocumentType(field, fullFrame)){
    // DOCUMENT LINKS
    // document links on create mode can expect 2 parameters
    // to link to an existing document or to create a new document all together
    //return CONST.OBJECT_TYPE
    // pass NULL type object as well when you unlink an existing link
    return [CONST.STRING_TYPE, CONST.OBJECT_TYPE, "null"]
  }
  else if (util.isPointType(field) || util.isLineStringType(field)) {
    // POINT TYPE
    return CONST.ARRAY_TYPE
  } 
}