import * as util from "../utils"
import * as CONST from "../constants"
import {getDataType} from "../dataTypeFrames/helpers" 

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property of frame
 * @returns type of property 
 */
export function getType(fullFrame, frame, item) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null
     
    if(util.isDataType(frame[item])) {
        return getDataType(frame[item])
    } 
    else if(util.isOneOfSubDocumentType(fullFrame, frame[item])) {
        return CONST.OBJECT_TYPE
    }
    else if(util.isSubDocumentType(frame[item])) {
        return CONST.OBJECT_TYPE
    }
    else if(util.isChoiceSubDocumentType(frame[item])) {
        return CONST.OBJECT_TYPE
    }
    else if(util.isChoiceDocumentType(frame[item])) {
        //return CONST.OBJECT_TYPE
        return CONST.STRING_TYPE
    }
    /*else if(util.isOneOfDataType(frame, item)) {
        //return [CONST.STRING_TYPE, CONST.OBJECT_TYPE]
        return  CONST.OBJECT_TYPE
    }*/
    else if (util.isDocumentType(frame[item], fullFrame)) {
        //return CONST.STRING_TYPE
        return CONST.OBJECT_TYPE
    }
    else if(util.isEnumType(frame[item])) {
        return CONST.STRING_TYPE
    }
    else if(util.isSysJSONDataType(frame[item])) {
        return CONST.OBJECT_TYPE
    }
    else if(util.isSysUnitDataType(frame[item])) {
        return CONST.ARRAY_TYPE
    }
    else if(util.isRdfLangString(frame[item])) {
        return CONST.OBJECT_TYPE
    }
} 
