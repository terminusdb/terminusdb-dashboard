

import * as CONST from "../constants"
import * as util from "../utils"
import * as TYPE from "../dataType.constants"

export const typeHelper = (documentFrame, property) => {

  let field = documentFrame[property]

  if(util.isDataType(field)) {
    // DATA TYPE
    if(field === TYPE.XSD_BOOLEAN)
    return CONST.BOOLEAN_TYPE
  } 
  else if(util.isSubDocumentType(field)){
    // SUBDOCUMENT TYPE
    return CONST.OBJECT_TYPE
  }
}