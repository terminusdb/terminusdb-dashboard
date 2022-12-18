
import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "./helpers"

/**
 * function returns general layout of data type frames
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} documentation - documentation passed for property 
 */
/*export function getLayout(frame, item, mode, formData, documentation) {
    let label=util.getLabelFromDocumentation (item, documentation)
    let type=helper.getDataType(frame[item]) 
    let layout = {
        type: type, 
        info: CONST.DATA_TYPE,  
        title: label,
        [CONST.METADATA]: util.checkForMetaData(frame, item) ? frame[CONST.METADATA][CONST.RENDER_AS][item] : {},
        format: helper.getFormat(frame, item),
    }
    // set default as filled value in edit & view mode
    if(mode !== CONST.CREATE && util.getDefaultValue(item, formData)) {
        layout["default"]=util.getDefaultValue(item, formData)
    }
    return layout 
}*/

/** 
 * function returns general UI layout of data type frames
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} uiFrame - custom uiFrame to change look and feel
 * @param {*} documentation - documentation passed for property
 */
export function getUILayout(frame, item, uiFrame, mode, formData, documentation) { 
    //let title = util.getTitle(item, util.checkIfKey(item, frame["@key"]), documentation)
    let data = formData.hasOwnProperty(item) ?  formData[item] : null
    let uiLayout=helper.getUIBasedOnType(frame, item, uiFrame, mode, data, documentation)
    // if property is lexical key then make read only
    if(mode !== CONST.CREATE && frame && frame.hasOwnProperty("@key") && util.checkIfKey(item, frame["@key"])) {
        uiLayout["ui:readonly"] = true
    }
    //let addedCustomUI=util.addCustomUI(item, uiFrame, uiLayout)
    return uiLayout
} 





