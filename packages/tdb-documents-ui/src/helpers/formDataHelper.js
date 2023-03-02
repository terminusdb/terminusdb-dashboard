import * as CONST from "../constants"
import * as util from "../utils"


export function getFormData(frame, item, mode, formData) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null
    
    if(util.isDataType(frame[item])) {
        if(frame[item] === CONST.XSD_BOOLEAN) return false
        return util.getDefaultValue(item, formData)
    }

}