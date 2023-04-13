import * as CONST from "../constants"
import * as util from "../utils"


/** formats supported */
const format = {
    [CONST.XSD_ANY_URI]: "uri",
    [CONST.XSD_DATE_TIME]: "date-time",
    [CONST.XSD_DATE]: "date",
    [CONST.XSD_DATE_TIMESTAMP]:"date-time"
}

export function getFormat(frame, item, mode, formData) {
    /** return null if frmae doesnt have property in it */
    if(!frame.hasOwnProperty(item)) return null
    
    if(util.isDataType(frame[item])) {
        let type=frame[item]
        return format[type]
    }

}