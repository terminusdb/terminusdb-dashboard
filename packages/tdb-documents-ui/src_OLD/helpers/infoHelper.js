import * as util from "../utils"
import * as CONST from "../constants"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property of frame
 * @returns info of property 
 */
 export function getInfo(fullFrame, frame, item) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null 
    
    if(util.isDataType(frame[item])) {
        return CONST.DATA_TYPE
    }
    else if(util.isOneOfSubDocumentType(fullFrame, frame[item])) {
        return CONST.ONEOFVALUES
    }
    else if(util.isSubDocumentType(frame[item])) {
        return CONST.SUBDOCUMENT_TYPE
    }
    else if(util.isChoiceSubDocumentType(frame[item])) {
        return CONST.CHOICESUBCLASSES
    }
    else if(util.isChoiceDocumentType(frame[item])){
        return CONST.CHOICECLASSES
    }
    /*else if(util.isOneOfDataType(frame, item)) {
        return CONST.ONEOFVALUES
    }*/
    else if (util.isDocumentType(frame[item], fullFrame)) {
        return CONST.DOCUMENT
    }
    else if(util.isEnumType(frame[item])) {
        return CONST.ENUM
    }
    else if(util.isSysJSONDataType(frame[item])) {
        return CONST.SYS_JSON_TYPE
    }
    else if(util.isSysUnitDataType(frame[item])) {
        return CONST.SYS_UNIT_DATA_TYPE
    }
    else if(util.isRdfLangString(frame[item])) {
        return CONST.RDF_LANGSTRING
    }
}




