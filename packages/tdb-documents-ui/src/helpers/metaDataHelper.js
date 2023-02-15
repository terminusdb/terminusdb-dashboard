import * as util from "../utils"
import * as CONST from "../constants"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property of frame
 * @returns label of property 
 */
 export function getMetaData(frame, item, documentation) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null
    
    return util.checkForMetaData(frame, item) ? frame[CONST.METADATA][CONST.RENDER_AS][item] : {}
}
