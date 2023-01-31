
import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "./helpers"

/** 
 * function returns general UI layout of data type frames
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} uiFrame - custom uiFrame to change look and feel
 * @param {*} documentation - documentation passed for property
 */
export function getUILayout(frame, item, uiFrame, mode, formData, documentation) { 
    //let title = util.getTitle(item, util.checkIfKey(item, frame["@key"]), documentation)
    let data = formData && formData.hasOwnProperty(item) ?  formData[item] : null
    let uiLayout=helper.getUIBasedOnType(frame, item, uiFrame, mode, data, documentation)
    // if property is lexical key then make read only
    if(mode !== CONST.CREATE && frame && frame.hasOwnProperty("@key") && util.checkIfKey(item, frame["@key"])) {
        //uiLayout["ui:readonly"] = true
        uiLayout["classNames"] = uiLayout["classNames"] + " tdb__key__field "
    } 
    //let addedCustomUI=util.addCustomUI(item, uiFrame, uiLayout)
    return uiLayout
} 





