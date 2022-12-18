import * as util from "../utils"
import * as CONST from "../constants"
import * as helper from "./helpers"

/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} - mode in which frame viewer is called
 * @param {*} formData - data to be displayed in fields
 * @param {*} documentation - documentation of document
 * @returns 
 */
export function getLayout(frame, item, mode, formData, documentation) {
    
    let layout={ 
        "type": "array", 
        "title": util.getLabelFromDocumentation(item, documentation)
    } 
    layout["additionalItems"]=helper.extractAdditionalLayout(frame, item)
    layout["items"]=helper.gatherItemsLayout(frame, item, mode, formData)
    return layout
} 
 
/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} uiFrame - Custom UI Frame to alter look and feel of fields
 * @param {*} mode - mode in which frame viewer is called
 * @param {*} formData - data to be displayed in fields
 * @returns 
 */
export function getUILayout(frame, item, uiFrame, mode, formData, documentation) {
    let uiLayout={}
    if(mode === CONST.VIEW) {
        // hide Add array button in View mode
        uiLayout=helper.getViewArrayUILayout(frame, item, formData, documentation)
        // hide the widget if no filled data available 
        if(!util.isFilled(formData, item)) {
            uiLayout["ui:widget"] = 'hidden'
        }
    }
    else {
        // Create and Edit 
        uiLayout=helper.getArrayUILayout(frame, item, documentation)
    }
    
    // custom ui:schema - add to default ui schema
    let addedCustomUI=util.addCustomUI(item, uiFrame, uiLayout)
    return addedCustomUI
}

