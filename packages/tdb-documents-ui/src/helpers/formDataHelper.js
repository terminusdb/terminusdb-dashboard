import * as CONST from "../constants"
import * as util from "../utils"


export function getFormData(frame, item, mode, formData) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null
    
    if(util.isDataType(frame[item])) {
        return util.getDefaultValue(item, formData)
    }

}